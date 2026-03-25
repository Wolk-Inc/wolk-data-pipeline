import type { PipelineContext, PipelineStep } from '../types.js'

export function runPipeline<T>(rows: T[], steps: PipelineStep<T>[]): PipelineContext<T> {
  return steps.reduce<PipelineContext<T>>((context, step) => {
    const startedAt = Date.now()
    const result = step.run(context)
    const finishedAt = Date.now()

    return {
      rows: result.rows,
      telemetry: [
        ...context.telemetry,
        {
          name: step.name,
          inputRows: context.rows.length,
          outputRows: result.rows.length,
          durationMs: finishedAt - startedAt,
        },
      ],
    }
  }, {
    rows,
    telemetry: [],
  })
}
