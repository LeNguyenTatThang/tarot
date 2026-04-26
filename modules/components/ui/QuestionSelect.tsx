"use client"

import React, { useState } from "react"

type Props = {
  label: string
  options: string[]
  value: string
  onChange: (value: string) => void
}

const QuestionSelect = ({ label, options, value, onChange }: Props) => {
  const [focus, setFocus] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(value.toLowerCase())
  )

  return (
    <div className="relative w-full max-w-xs my-4">
      {/* Input */}
      <input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => {
          setFocus(true)
          setShowDropdown(true)
        }}
        onBlur={() => {
          setFocus(false)
          setTimeout(() => setShowDropdown(false), 150)
        }}
        className="w-full px-3 pt-5 pb-2 border border-gray-400 rounded-md outline-none focus:border-purple-500 text-white bg-gray-800 placeholder-gray-400"
      />

      {/* Label */}
      <label
        className={`
          absolute left-3 transition-all duration-200 pointer-events-none
          ${focus || value
            ? "top-1 text-xs text-purple-500"
            : "top-3 text-sm text-gray-400"
          }
        `}
      >
        {label}
      </label>

      {showDropdown && filteredOptions.length > 0 && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-auto shadow">
          {filteredOptions.map((opt, i) => (
            <div
              key={i}
              onMouseDown={() => {
                onChange(opt)
                setShowDropdown(false)
              }}
              className="px-3 py-2 hover:bg-purple-100 cursor-pointer text-gray-800"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default QuestionSelect
