import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export async function GET(request) {
  const errorUrl = new URL("/auth/recovery-error", request.url);

  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(errorUrl);
  }

  const tokenHash = request.nextUrl.searchParams.get("token_hash");
  const type = request.nextUrl.searchParams.get("type");
  const code = request.nextUrl.searchParams.get("code");
  const supabase = await createClient();
  let error;

  if (tokenHash && type === "recovery") {
    ({ error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type,
    }));
  } else if (code) {
    ({ error } = await supabase.auth.exchangeCodeForSession(code));
  } else {
    return NextResponse.redirect(errorUrl);
  }

  if (error) {
    return NextResponse.redirect(errorUrl);
  }

  return NextResponse.redirect(new URL("/update-password", request.url));
}
