"use client";

import Link from "next/link";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useActionState, useState } from "react";
import { signIn, signUp } from "@/app/auth/actions";

const initialState = {
  status: "idle",
  message: "",
  errors: {},
};

function FieldError({ id, errors }) {
  if (!errors?.length) {
    return null;
  }

  return (
    <p className="field-error" id={id}>
      {errors[0]}
    </p>
  );
}

export default function AuthForm({ mode }) {
  const isSignUp = mode === "sign-up";
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, pending] = useActionState(
    isSignUp ? signUp : signIn,
    initialState,
  );
  const nameError = state?.errors?.displayName;
  const emailError = state?.errors?.email;
  const passwordError = state?.errors?.password;

  return (
    <>
      <form className="auth-form" action={formAction} noValidate>
        {isSignUp ? (
          <div className="form-field">
            <label className="form-label" htmlFor="displayName">
              Full name
            </label>
            <div className={`form-control${nameError ? " has-error" : ""}`}>
              <UserRound aria-hidden="true" size={18} strokeWidth={1.9} />
              <input
                className="form-input"
                id="displayName"
                name="displayName"
                type="text"
                autoComplete="name"
                placeholder="Your full name"
                maxLength={80}
                aria-invalid={Boolean(nameError)}
                aria-describedby={nameError ? "display-name-error" : undefined}
                required
              />
            </div>
            <FieldError id="display-name-error" errors={nameError} />
          </div>
        ) : null}

        <div className="form-field">
          <label className="form-label" htmlFor="email">
            Work email
          </label>
          <div className={`form-control${emailError ? " has-error" : ""}`}>
            <Mail aria-hidden="true" size={18} strokeWidth={1.9} />
            <input
              className="form-input"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              maxLength={254}
              spellCheck={false}
              aria-invalid={Boolean(emailError)}
              aria-describedby={emailError ? "email-error" : undefined}
              required
            />
          </div>
          <FieldError id="email-error" errors={emailError} />
        </div>

        <div className="form-field">
          <div className="form-label-row">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            {!isSignUp ? (
              <Link className="form-inline-link" href="/forgot-password">
                Forgot password?
              </Link>
            ) : null}
          </div>
          <div
            className={`form-control form-control-password${
              passwordError ? " has-error" : ""
            }`}
          >
            <LockKeyhole aria-hidden="true" size={18} strokeWidth={1.9} />
            <input
              className="form-input"
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete={isSignUp ? "new-password" : "current-password"}
              placeholder="Enter your password"
              aria-invalid={Boolean(passwordError)}
              aria-describedby={
                isSignUp
                  ? passwordError
                    ? "password-help password-error"
                    : "password-help"
                  : passwordError
                    ? "password-error"
                    : undefined
              }
              required
            />
            <button
              className="password-visibility"
              type="button"
              aria-controls="password"
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              onClick={() => setShowPassword((visible) => !visible)}
            >
              {showPassword ? (
                <EyeOff aria-hidden="true" size={18} />
              ) : (
                <Eye aria-hidden="true" size={18} />
              )}
            </button>
          </div>
          {isSignUp ? (
            <p className="field-help" id="password-help">
              Use at least 8 characters, including a letter and a number.
            </p>
          ) : null}
          <FieldError id="password-error" errors={passwordError} />
        </div>

        {state?.message ? (
          <p
            className={`form-message form-message-${state.status}`}
            role={state.status === "error" ? "alert" : "status"}
          >
            {state.message}
          </p>
        ) : null}

        <button className="auth-submit" type="submit" disabled={pending}>
          <span>
            {pending
              ? isSignUp
                ? "Creating account..."
                : "Signing in..."
              : isSignUp
                ? "Create account"
                : "Sign in"}
          </span>
          {pending ? (
            <LoaderCircle className="auth-spinner" aria-hidden="true" size={18} />
          ) : (
            <ArrowRight aria-hidden="true" size={18} />
          )}
        </button>
      </form>

      <p className="auth-security-note">
        <ShieldCheck aria-hidden="true" size={15} />
        Protected by secure, cookie-based sessions
      </p>

      <p className="auth-switch">
        {isSignUp ? "Already have an account?" : "New to Schedulo AI?"}{" "}
        <Link href={isSignUp ? "/sign-in" : "/sign-up"}>
          {isSignUp ? "Sign in" : "Create an account"}
        </Link>
      </p>
    </>
  );
}
