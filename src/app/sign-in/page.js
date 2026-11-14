import AuthForm from "@/components/AuthForm";
import AuthShell from "@/components/AuthShell";

export const metadata = {
  title: "Sign in | Schedulo AI",
};

export default function SignInPage() {
  return (
    <AuthShell
      eyebrow="Welcome back"
      description="Sign in to manage availability, coordinate faster, and keep work moving."
    >
      <AuthForm mode="sign-in" />
    </AuthShell>
  );
}
