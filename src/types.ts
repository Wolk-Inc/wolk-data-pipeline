export type RowRecord = Record<string, string | number | boolean | null>

export type PipelineContext<T> = {
  rows: T[]
  telemetry: StepTelemetry[]
}

export type StepTelemetry = {
  name: string
  inputRows: number
  outputRows: number
  durationMs: number
}

export type PipelineStep<T> = {
  name: string
  run: (context: PipelineContext<T>) => { rows: T[] }
}
