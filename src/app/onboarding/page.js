import { signOut } from "@/app/auth/actions";
import ProfileForm from "@/components/ProfileForm";
import { requireUser } from "@/lib/auth/current-user";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Account setup | Schedulo AI",
};

export const instant = false;

export default async function OnboardingPage() {
  const user = await requireUser();
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <main className="account-page">
      <section className="account-card" aria-labelledby="account-title">
        <div className="account-topline">
          <p className="auth-eyebrow">Account verified</p>
          <form action={signOut}>
            <button className="sign-out-button" type="submit">
              Sign out
            </button>
          </form>
        </div>

        <div className="account-heading">
          <h1 id="account-title">Your Schedulo AI profile</h1>
          <p>
            You are signed in as <strong>{user.email ?? "a verified user"}</strong>.
            Complete your profile while organization setup is prepared for the
            next phase.
          </p>
        </div>

        <ProfileForm
          key={user.id}
          initialDisplayName={profile?.display_name ?? ""}
        />

        <div className="phase-note">
          <span>Next</span>
          <p>
            Organization creation and secure employee invitations arrive in
            Phase 2. Independent signup never grants access to organization
            data.
          </p>
        </div>
      </section>
    </main>
  );
}
