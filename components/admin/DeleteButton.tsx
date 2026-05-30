"use client";

type DeleteButtonProps = {
  action: () => Promise<void>;
  label?: string;
};

export default function DeleteButton({ action, label = "Delete" }: DeleteButtonProps) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm("Delete this item? This cannot be undone.")) {
          e.preventDefault();
        }
      }}
    >
      <button type="submit" className="admin-btn admin-btn-danger">
        {label}
      </button>
    </form>
  );
}
