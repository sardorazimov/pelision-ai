/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleGenerativeAI } from "@google/generative-ai";
import { auth, currentUser } from "@clerk/nextjs/server"; // currentUser ekledik
import { db } from "../../../lib/db";
import { messages, users } from "../../../lib/db/schema";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
console.log(
  "🔑 API KEY KONTROL:",
  process.env.GEMINI_API_KEY ? "Anahtar yüklendi ✅" : "Anahtar YOK ❌",
);
// Bu kod sana hangi modellerin açık olduğunu terminalde listeleyecek

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const user = await currentUser(); // Kullanıcı bilgilerini Clerk'ten çek

    if (!userId || !user)
      return new NextResponse("Unauthorized", { status: 401 });

    const { prompt } = await req.json();

    // 1. KRİTİK HAMLE: Kullanıcıyı DB'de garanti altına al (Upsert)
    await db
      .insert(users)
      .values({
        id: userId,
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName || ""} ${user.lastName || ""}`,
        imageUrl: user.imageUrl,
      })
      .onConflictDoUpdate({
        target: users.id,
        set: { email: user.emailAddresses[0].emailAddress },
      });

    // 2. Kullanıcı mesajını kaydet
    await db.insert(messages).values({
      userId: userId,
      role: "user",
      content: prompt,
    });

    // 3. Gemini'yi çalıştır
    // Kodundaki bu satırı şöyle değiştir:
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
    const result = await model.generateContent(prompt);
    const aiText = result.response.text();

    // 4. Gemini'nin cevabını kaydet
    await db.insert(messages).values({
      userId: userId,
      role: "model",
      content: aiText,
    });

    return NextResponse.json({ text: aiText });
  } catch (error: any) {
    console.error("❌ HATA DETAYI:", error.message);
    return new NextResponse(`Hata: ${error.message}`, { status: 500 });
  }
}
