import type { AdminFormState } from "@/lib/admin/action-state";

export function AdminFormAlerts({ state }: { state: AdminFormState }) {
  if (state.ok) return null;

  const fieldMessages = state.fieldErrors ? Object.values(state.fieldErrors) : [];

  return (
    <>
      {state.formError ? <p className="admin-error">{state.formError}</p> : null}
      {!state.formError && fieldMessages.length > 0 ? (
        <div className="admin-error-summary" role="alert">
          <p className="admin-error">Please fix the following:</p>
          <ul className="admin-error-list">
            {fieldMessages.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}

export function AdminFieldError({ state, name }: { state: AdminFormState; name: string }) {
  const message = state.fieldErrors?.[name];
  if (!message) return null;
  return <p className="admin-field-error">{message}</p>;
}
