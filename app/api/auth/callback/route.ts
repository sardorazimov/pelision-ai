
import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "../../../../utils/supabase/server-client";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createSupabaseServerClient();
    // Kodu oturuma çeviriyoruz (Cookie'leri yazar)
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Hata durumunda login'e geri fırlat
  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}