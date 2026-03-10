// app/dashboard/page.tsx (veya hangi sayfaysa)

import { createSupabaseServerClient } from "../../utils/supabase/server-client";


export default async function Page() {
  const supabase = await createSupabaseServerClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  console.log("Server >", { user });

  if (!user) {
    // Kullanıcı yoksa login'e postala
    // redirect("/login"); 
  }

  return (
    <div className="text-white">
      {user ? `Hoş geldin ${user.email}` : "Giriş yapılmadı"}
    </div>
  );
}