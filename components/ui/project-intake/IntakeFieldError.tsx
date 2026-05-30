export default function IntakeFieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="intake-field-error">{message}</p>;
}
