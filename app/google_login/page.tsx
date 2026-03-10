import { createSupabaseServerClient } from "../../utils/supabase/server-client";
import GoogleLoginDemo from "./google-login";


export default async function GoogleLoginPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log( { user });
  return <GoogleLoginDemo user={user} />;
}