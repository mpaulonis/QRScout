import React from 'react'
import BaseInputProps from './BaseInputProps'

export interface BoolInputProps extends BaseInputProps {
  defaultValue?: boolean
}

export default function Checkbox(data: BoolInputProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    data.onChange(e.target.checked)
  }

  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input m-0 h-9 w-24 cursor-pointer appearance-none rounded-full bg-gray-300 bg-contain bg-no-repeat hover:bg-red-700 align-top shadow-sm focus:outline-none"
        type="checkbox"
        role="switch"
        id={data.title}
        onChange={handleChange}
        checked={data.value}
      />
    </div>
  )
}
