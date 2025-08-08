import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type Props = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

/**
 * Button básico con clases Tailwind (no requiere config adicional).
 * Deja los estilos mínimos para que no rompa si no hay Tailwind aún.
 */
export function Button({ className = "", ...props }: Props) {
  return (
    <button
      className={`inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm border border-gray-300 hover:bg-gray-50 active:bg-gray-100 ${className}`}
      {...props}
    />
  );
}

export default Button;
