import React from "react"
import clsx from "clsx"

type ButtonProps = {
  children: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  className?: string
  type?: "button" | "submit" | "reset"
}

export default function Button({
  children,
  onClick,
  className,
  type = "button"
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        "px-3 py-2 rounded shadow text-sm text-white transition hover:scale-105",
        "bg-purple-600/40",
        className
      )}
    >
      {children}
    </button>
  )
}
