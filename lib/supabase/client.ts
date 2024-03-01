import { Database } from "@/database.types";
import { createBrowserClient } from "@supabase/ssr";

export const spClient = () =>
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
