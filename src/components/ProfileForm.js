"use client";

import { useActionState } from "react";
import { updateProfile } from "@/app/auth/actions";

const initialState = {
  status: "idle",
  message: "",
  errors: {},
};

export default function ProfileForm({ initialDisplayName }) {
  const [state, formAction, pending] = useActionState(
    updateProfile,
    initialState,
  );
  const nameError = state?.errors?.displayName;

  return (
    <form className="profile-form" action={formAction} noValidate>
      <div className="form-field">
        <label className="form-label" htmlFor="displayName">
          Display name
        </label>
        <input
          className="form-input"
          id="displayName"
          name="displayName"
          type="text"
          autoComplete="nickname"
          defaultValue={initialDisplayName}
          maxLength={80}
          aria-invalid={Boolean(nameError)}
          aria-describedby={nameError ? "profile-name-error" : undefined}
          required
        />
        {nameError?.length ? (
          <p className="field-error" id="profile-name-error">
            {nameError[0]}
          </p>
        ) : null}
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
        {pending ? "Saving..." : "Save profile"}
      </button>
    </form>
  );
}
