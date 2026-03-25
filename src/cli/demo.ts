import { readJsonFile } from '../connectors/jsonConnector.js'
import { readCsvFile } from '../connectors/csvConnector.js'
import { runPipeline } from '../core/pipeline.js'
import { summarizeRun } from '../monitoring/summary.js'
import { filterByCountries, normalizePriority, tagEnterpriseAccounts } from '../transforms/common.js'

type LeadRow = {
  id: string
  company: string
  country: string
  segment?: string
  priority?: string
}

async function main() {
  const jsonRows = await readJsonFile<LeadRow>(new URL('../../examples/leads.json', import.meta.url).pathname)
  const csvRows = (await readCsvFile(new URL('../../examples/leads.csv', import.meta.url).pathname)).map((row) => ({
    id: String(row.id ?? ''),
    company: String(row.company ?? ''),
    country: String(row.country ?? ''),
  })) satisfies LeadRow[]
  const rows = [...jsonRows, ...csvRows]

  const output = runPipeline(rows, [
    filterByCountries<LeadRow>(['US', 'CA']),
    tagEnterpriseAccounts<LeadRow>(),
    normalizePriority<LeadRow>(),
  ])

  console.log({
    summary: summarizeRun(output),
    preview: output.rows,
  })
}

main()
