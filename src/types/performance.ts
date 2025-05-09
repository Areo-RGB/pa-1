/**
 * Performance data interface
 */
export interface PerformanceData {
  kategorie: string
  uebung: string
  name: string
  ergebnis: number | string
}

/**
 * Props for performance ranking components
 */
export interface PerformanceRankingProps {
  title: string // Key used for data lookups (e.g., "10m Sprint")
  displayTitle?: string // Optional title for display purposes in the header
  data: PerformanceData[]
  className?: string
  unit?: string
  sortAscending?: boolean
} 