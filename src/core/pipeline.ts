export type PipelineContext<T> = {
  rows: T[]
}

export type PipelineStep<T> = (context: PipelineContext<T>) => PipelineContext<T>

export function runPipeline<T>(rows: T[], steps: PipelineStep<T>[]) {
  return steps.reduce((context, step) => step(context), { rows })
}
