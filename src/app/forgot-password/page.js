import AuthShell from "@/components/AuthShell";
import PasswordForm from "@/components/PasswordForm";

export const metadata = {
  title: "Reset password | Schedulo AI",
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      eyebrow="Account recovery"
      title="Reset your password."
      description="Enter your account email. If it matches an account, Supabase will send a secure recovery link."
    >
      <PasswordForm mode="request" />
    </AuthShell>
  );
}
