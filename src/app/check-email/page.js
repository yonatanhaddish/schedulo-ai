import Link from "next/link";
import AuthShell from "@/components/AuthShell";

export const metadata = {
  title: "Check your email | Schedulo AI",
};

export default function CheckEmailPage() {
  return (
    <AuthShell
      eyebrow="One more step"
      title="Check your email."
      description="Open the confirmation message from Schedulo AI to verify your address and finish creating your account."
    >
      <div className="auth-note">
        <p>The confirmation link is single-use and may take a moment to arrive.</p>
        <Link className="auth-secondary-link" href="/sign-in">
          Return to sign in
        </Link>
      </div>
    </AuthShell>
  );
}
