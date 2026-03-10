import { createSupabaseServerClient } from "../../utils/supabase/server-client";
import GitHubLoginDemo from "./github-login";

export default async function GitHubLoginPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <GitHubLoginDemo user={user} />;
}
