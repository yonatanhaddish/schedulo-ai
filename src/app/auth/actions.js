"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/current-user";
import {
  passwordResetRequestSchema,
  passwordUpdateSchema,
  profileSchema,
  signInSchema,
  signUpSchema,
} from "@/lib/auth/validation";
import { getSiteUrl } from "@/lib/site-url";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

function validationState(result) {
  return {
    status: "error",
    message: "Review the highlighted fields and try again.",
    errors: result.error.flatten().fieldErrors,
  };
}

function unavailableState() {
  return {
    status: "error",
    message:
      "Authentication is not configured yet. Add the Supabase environment values and try again.",
    errors: {},
  };
}

export async function signUp(_previousState, formData) {
  const result = signUpSchema.safeParse({
    displayName: formData.get("displayName"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return validationState(result);
  }

  if (!isSupabaseConfigured()) {
    return unavailableState();
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: result.data.email,
    password: result.data.password,
    options: {
      data: { display_name: result.data.displayName },
      emailRedirectTo: `${getSiteUrl()}/auth/confirm`,
    },
  });

  if (error) {
    console.error("Supabase signup failed", {
      code: error.code,
      status: error.status,
      message: error.message,
    });

    const rateLimited = error.code === "over_email_send_rate_limit";

    return {
      status: "error",
      message: rateLimited
        ? "Too many confirmation emails were requested. Wait a moment and try again."
        : "We could not create the account. Check the details and try again.",
      errors: {},
    };
  }

  revalidatePath("/", "layout");

  if (data.session) {
    redirect("/onboarding");
  }

  redirect("/check-email");
}

export async function signIn(_previousState, formData) {
  const result = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return validationState(result);
  }

  if (!isSupabaseConfigured()) {
    return unavailableState();
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(result.data);

  if (error) {
    return {
      status: "error",
      message: "The email or password is incorrect.",
      errors: {},
    };
  }

  revalidatePath("/", "layout");
  redirect("/onboarding");
}

export async function requestPasswordReset(_previousState, formData) {
  const result = passwordResetRequestSchema.safeParse({
    email: formData.get("email"),
  });

  if (!result.success) {
    return validationState(result);
  }

  if (!isSupabaseConfigured()) {
    return unavailableState();
  }

  const supabase = await createClient();

  await supabase.auth.resetPasswordForEmail(result.data.email, {
    redirectTo: `${getSiteUrl()}/auth/callback?next=/update-password`,
  });

  return {
    status: "success",
    message:
      "If an account exists for that email, a password-reset link is on its way.",
    errors: {},
  };
}

export async function updatePassword(_previousState, formData) {
  const result = passwordUpdateSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!result.success) {
    return validationState(result);
  }

  const user = await getCurrentUser();

  if (!user) {
    return {
      status: "error",
      message: "The recovery session expired. Request a new reset link.",
      errors: {},
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    password: result.data.password,
  });

  if (error) {
    return {
      status: "error",
      message: "We could not update the password. Request a new reset link.",
      errors: {},
    };
  }

  revalidatePath("/", "layout");
  redirect("/onboarding");
}

export async function signOut() {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      await supabase.auth.signOut({ scope: "local" });
    }
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function updateProfile(_previousState, formData) {
  const result = profileSchema.safeParse({
    displayName: formData.get("displayName"),
  });

  if (!result.success) {
    return validationState(result);
  }

  const user = await getCurrentUser();

  if (!user) {
    return {
      status: "error",
      message: "Your session expired. Sign in and try again.",
      errors: {},
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .update({ display_name: result.data.displayName })
    .eq("id", user.id)
    .select("display_name")
    .maybeSingle();

  if (error || !data) {
    return {
      status: "error",
      message: "We could not save your profile. Try again.",
      errors: {},
    };
  }

  revalidatePath("/onboarding");

  return {
    status: "success",
    message: "Profile saved.",
    errors: {},
  };
}
