"use client";

import { useActionState } from "react";
import { submitContactForm } from "@/lib/contact/actions";
import {
  contactFormString,
  initialContactFormState,
} from "@/lib/contact/action-state";

function ContactFieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="contact-field-error">{message}</p>;
}

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialContactFormState,
  );

  const isSuccess = state.status === "success";
  const isError = state.status === "error";

  return (
    <div className="form w-form">
      {!isSuccess ? (
        <form id="email-form" name="email-form" action={formAction} noValidate>
          <div className="wrap">
            <input
              className="form-input w-input"
              maxLength={256}
              name="name"
              placeholder="Full Name"
              type="text"
              id="contact-name"
              defaultValue={contactFormString(state, "name")}
              required
              disabled={pending}
              aria-invalid={Boolean(state.fieldErrors?.name)}
            />
            <ContactFieldError message={state.fieldErrors?.name} />
          </div>
          <div className="wrap">
            <input
              className="form-input w-input"
              maxLength={256}
              name="email"
              placeholder="Email"
              type="email"
              id="contact-email"
              defaultValue={contactFormString(state, "email")}
              required
              disabled={pending}
              aria-invalid={Boolean(state.fieldErrors?.email)}
            />
            <ContactFieldError message={state.fieldErrors?.email} />
          </div>
          <div className="wrap">
            <textarea
              className="form-input w-input"
              maxLength={5000}
              name="message"
              placeholder="Message"
              id="contact-message"
              defaultValue={contactFormString(state, "message")}
              required
              disabled={pending}
              aria-invalid={Boolean(state.fieldErrors?.message)}
            />
            <ContactFieldError message={state.fieldErrors?.message} />
          </div>
          <div className="contact-honeypot" aria-hidden="true">
            <label htmlFor="contact-company">Company</label>
            <input
              id="contact-company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              defaultValue=""
            />
          </div>
          <div className="wrap" />
          <div className="wrap margin-bottom" />
          <input
            type="submit"
            className="submit-button w-button"
            value={pending ? "Please wait..." : "Submit"}
            disabled={pending}
          />
        </form>
      ) : null}
      <div className="w-form-done" style={isSuccess ? { display: "block" } : undefined}>
        <div>Thank you! Your submission has been received!</div>
      </div>
      <div
        className="w-form-fail"
        style={isError ? { display: "block" } : undefined}
      >
        <div>
          {state.formError ??
            (state.fieldErrors
              ? "Please fix the errors above and try again."
              : "Oops! Something went wrong while submitting the form.")}
        </div>
      </div>
    </div>
  );
}
