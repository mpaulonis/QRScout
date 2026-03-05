import React from 'react'

export default interface BaseInputProps extends InputProps {
  onChange: (value: any) => void
}
export interface Config {
  title: string
  page_title: string
  sections: SectionProps[]
}

export interface SectionProps {
  name: string
  preserveDataOnReset?: boolean
  visibleWhen?: VisibleWhen
  fields: InputProps[]
}

export interface InputProps {
  title: string
  type: InputTypes
  required: boolean
  // A shorthand code for this input
  code: string
  disabled?: boolean
  value?: any
  choices?: Record<string, string>
  defaultValue?: any
  min?: number
  max?: number
  placeholder?: string
  rows?: number

  visibleWhen?: VisibleWhen
}

export interface VisibleCondition {
  code: string
  equals?: any
  notEquals?: any
  in?: any[]
  notIn?: any[]
  truthy?: boolean
}

export type VisibleWhen = VisibleCondition | VisibleCondition[]

export type InputTypes =
  | 'text'
  | 'number'
  | 'boolean'
  | 'range'
  | 'select'
  | 'counter'
  | 'image'
