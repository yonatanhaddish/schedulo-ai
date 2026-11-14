import AuthShell from "@/components/AuthShell";
import PasswordForm from "@/components/PasswordForm";
import { requireUser } from "@/lib/auth/current-user";

export const metadata = {
  title: "Choose a new password | Schedulo AI",
};

export const instant = false;

export default async function UpdatePasswordPage() {
  await requireUser();

  return (
    <AuthShell
      eyebrow="Recovery verified"
      title="Choose a new password."
      description="Your recovery link is valid. Create a new password for your Schedulo AI account."
    >
      <PasswordForm mode="update" />
    </AuthShell>
  );
}
