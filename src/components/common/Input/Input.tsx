import { ChangeEvent } from "react";
import styles from "./Input.module.scss";

interface IInputProps {
  id: string;
  type: string;
  label: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error: string;
  isRequired: boolean;
  isTouched: boolean;
  isReadonly?: boolean;
}

export function Input({
  id,
  type,
  label,
  value,
  onChange,
  error,
  isRequired,
  isTouched,
  isReadonly = false,
}: IInputProps) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        className={styles.input}
        type={type}
        value={value}
        onChange={onChange}
        aria-invalid={error ? "true" : "false"}
        aria-required={isRequired}
        readOnly={isReadonly}
      />
      {isTouched && error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
