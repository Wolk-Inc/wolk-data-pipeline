import type { PipelineStep, RowRecord } from '../types.js'

export function filterByCountries<T extends RowRecord>(countries: string[]): PipelineStep<T> {
  return {
    name: 'filter-countries',
    run: (context) => ({
      rows: context.rows.filter((row) => countries.includes(String(row.country ?? ''))),
    }),
  }
}

export function tagEnterpriseAccounts<T extends RowRecord>(): PipelineStep<T & { segment?: string }> {
  return {
    name: 'tag-enterprise-accounts',
    run: (context) => ({
      rows: context.rows.map((row) => ({
        ...row,
        segment: String(row.company ?? '').match(/health|bank|retail|global/i) ? 'enterprise' : 'mid-market',
      })),
    }),
  }
}

export function normalizePriority<T extends RowRecord & { segment?: string }>(): PipelineStep<T & { priority?: string }> {
  return {
    name: 'normalize-priority',
    run: (context) => ({
      rows: context.rows.map((row) => ({
        ...row,
        priority: row.segment === 'enterprise' ? 'high' : 'standard',
      })),
    }),
  }
}
