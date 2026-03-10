import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "../../../../lib/db";
import { users } from "../../../../lib/db/schema";

export async function GET() {
  return new Response("USTA BURADAYIM, YOL AÇIK! ✅", { status: 200 });
}
export async function POST(req: Request) {
  // 1. Secret Key'i al
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    return new Response("Hata: Secret Key eksik!", { status: 500 });
  }

  // 2. Header'ları yakala
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Hata: Svix headerları eksik", { status: 400 });
  }

  // 3. Body'yi al ve doğrula
  const payload = await req.json();
  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("❌ İmza Doğrulanamadı");
    return new Response("Hata: İmza geçersiz", { status: 400 });
  }

  // 4. Veriyi Neon'a Yaz (Upsert Mekanizması)
  const eventType = evt.type;

  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;
    const primaryEmail = email_addresses[0]?.email_address;
    const fullName = `${first_name || ""} ${last_name || ""}`.trim();

    console.log(`🚀 İşleniyor: ${eventType} - ID: ${id}`);

    try {
      await db
        .insert(users)
        .values({
          id: id,
          email: primaryEmail,
          name: fullName || "Anonim",
          imageUrl: image_url,
        })
        .onConflictDoUpdate({
          target: users.id,
          set: {
            email: primaryEmail,
            name: fullName || "Anonim",
            imageUrl: image_url,
          },
        });

      console.log(`✅ ${id} başarıyla Neon'a mühürlendi!`);
    } catch (dbError) {
      console.error("🔥 DB Hatası:", dbError);
      return new Response("Veritabanı hatası", { status: 500 });
    }
  }

  return new Response("Başarılı", { status: 200 });
}
