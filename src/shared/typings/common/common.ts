import { ReactNode } from 'react'

export type HOCProps = {
  children?: ReactNode | string
}

export type PaginatedQueryType = {
    page: number
    size: number
}

export type ErrorResponse = {
    message: string
  }