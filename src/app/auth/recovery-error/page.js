import Link from "next/link";
import AuthShell from "@/components/AuthShell";

export const metadata = {
  title: "Recovery link unavailable | Schedulo AI",
};

export default function RecoveryErrorPage() {
  return (
    <AuthShell
      eyebrow="Recovery unavailable"
      title="That reset link cannot be used."
      description="The link may have expired or already been used. Request another password-reset message to continue."
    >
      <div className="auth-note">
        <Link className="auth-secondary-link" href="/forgot-password">
          Request a new reset link
        </Link>
      </div>
    </AuthShell>
  );
}
