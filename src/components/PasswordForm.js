"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  requestPasswordReset,
  updatePassword,
} from "@/app/auth/actions";

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

export default function PasswordForm({ mode }) {
  const isRequest = mode === "request";
  const [state, formAction, pending] = useActionState(
    isRequest ? requestPasswordReset : updatePassword,
    initialState,
  );
  const emailError = state?.errors?.email;
  const passwordError = state?.errors?.password;
  const confirmPasswordError = state?.errors?.confirmPassword;

  return (
    <>
      <form className="auth-form" action={formAction} noValidate>
        {isRequest ? (
          <div className="form-field">
            <label className="form-label" htmlFor="email">
              Work email
            </label>
            <input
              className="form-input"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength={254}
              aria-invalid={Boolean(emailError)}
              aria-describedby={emailError ? "reset-email-error" : undefined}
              required
            />
            <FieldError id="reset-email-error" errors={emailError} />
          </div>
        ) : (
          <>
            <div className="form-field">
              <label className="form-label" htmlFor="password">
                New password
              </label>
              <input
                className="form-input"
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                aria-invalid={Boolean(passwordError)}
                aria-describedby={
                  passwordError
                    ? "new-password-help new-password-error"
                    : "new-password-help"
                }
                required
              />
              <p className="field-help" id="new-password-help">
                Use at least 8 characters, including a letter and a number.
              </p>
              <FieldError id="new-password-error" errors={passwordError} />
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="confirmPassword">
                Confirm new password
              </label>
              <input
                className="form-input"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                aria-invalid={Boolean(confirmPasswordError)}
                aria-describedby={
                  confirmPasswordError ? "confirm-password-error" : undefined
                }
                required
              />
              <FieldError
                id="confirm-password-error"
                errors={confirmPasswordError}
              />
            </div>
          </>
        )}

        {state?.message ? (
          <p
            className={`form-message form-message-${state.status}`}
            role={state.status === "error" ? "alert" : "status"}
          >
            {state.message}
          </p>
        ) : null}

        <button className="auth-submit" type="submit" disabled={pending}>
          {pending
            ? isRequest
              ? "Sending link..."
              : "Updating password..."
            : isRequest
              ? "Send reset link"
              : "Update password"}
        </button>
      </form>

      <p className="auth-switch">
        <Link href="/sign-in">Return to sign in</Link>
      </p>
    </>
  );
}
