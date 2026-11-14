import AuthForm from "@/components/AuthForm";
import AuthShell from "@/components/AuthShell";

export const metadata = {
  title: "Create account | Schedulo AI",
};

export default function SignUpPage() {
  return (
    <AuthShell
      eyebrow="Start with Schedulo"
      description="Set up secure access to your team's private scheduling workspace."
    >
      <AuthForm mode="sign-up" />
    </AuthShell>
  );
}
