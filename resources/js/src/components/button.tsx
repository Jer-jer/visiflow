import React from 'react'

interface ButtonProps {
    color: string,
    customStylings: string,
    label: string,
}

function Button({ color, customStylings, label }: ButtonProps) {
  return (
    <div>
        <button className={`btn ${color} ${customStylings}`}>{label}</button>
    </div>
  )
}

export default Button