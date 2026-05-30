import type { IntakeOption } from "@/lib/project-intake/form-config";

type IntakeOptionGridProps = {
  name: string;
  legend: string;
  options: readonly IntakeOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
};

export default function IntakeOptionGrid({
  name,
  legend,
  options,
  value,
  onChange,
  error,
  disabled = false,
}: IntakeOptionGridProps) {
  return (
    <fieldset className="intake-option-fieldset">
      <legend className="intake-question">{legend}</legend>
      <div
        className="intake-option-grid"
        role="radiogroup"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
      >
        {options.map((option) => {
          const id = `${name}-${option.value}`;
          const isSelected = value === option.value;

          return (
            <label
              key={option.value}
              htmlFor={id}
              className={[
                "intake-option",
                isSelected ? "intake-option--selected" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span className="intake-option__control">
                <input
                  type="radio"
                  id={id}
                  name={name}
                  value={option.value}
                  checked={isSelected}
                  onChange={() => onChange(option.value)}
                  disabled={disabled}
                  className="intake-option__input"
                />
                <span className="intake-option__radio" aria-hidden="true" />
              </span>
              <span className="intake-option__label">{option.label}</span>
            </label>
          );
        })}
      </div>
      {error ? (
        <p className="intake-field-error" id={`${name}-error`}>
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
