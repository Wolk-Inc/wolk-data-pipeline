import { readJsonFile } from '../connectors/jsonConnector.js'
import { runPipeline } from '../core/pipeline.js'
import { summarizeRun } from '../monitoring/summary.js'

type LeadRow = {
  id: string
  company: string
  country: string
}

async function main() {
  const rows = await readJsonFile<LeadRow>(new URL('../../examples/leads.json', import.meta.url).pathname)
  const output = runPipeline(rows, [
    (context) => ({
      rows: context.rows.filter((row) => row.country === 'US' || row.country === 'CA'),
    }),
  ])

  console.log({
    summary: summarizeRun(output.rows),
    preview: output.rows,
  })
}

main()
