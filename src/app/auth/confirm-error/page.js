import Link from "next/link";
import AuthShell from "@/components/AuthShell";

export const metadata = {
  title: "Confirmation failed | Schedulo AI",
};

export default function ConfirmErrorPage() {
  return (
    <AuthShell
      eyebrow="Link unavailable"
      title="We could not confirm that email."
      description="The link may have expired or already been used. Try signing in, or create the account again to request a new message."
    >
      <div className="auth-note auth-note-error">
        <Link className="auth-secondary-link" href="/sign-in">
          Go to sign in
        </Link>
        <Link className="auth-secondary-link" href="/sign-up">
          Create an account
        </Link>
      </div>
    </AuthShell>
  );
}
