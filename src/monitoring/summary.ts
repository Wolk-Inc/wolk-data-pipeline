import type { PipelineContext, RowRecord } from '../types.js'

export function summarizeRun<T extends RowRecord>(context: PipelineContext<T>) {
  const countries = Array.from(new Set(context.rows.map((row) => String(row.country ?? 'unknown'))))

  return {
    rowCount: context.rows.length,
    countries,
    executedSteps: context.telemetry.length,
    telemetry: context.telemetry,
    timestamp: new Date().toISOString(),
  }
}
