type ButtonProps = {
  label: string;
  disabled?: boolean;
};

export function Button({ label, disabled }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
    >
      {label}
    </button>
  );
}