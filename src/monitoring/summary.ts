export function summarizeRun<T>(rows: T[]) {
  return {
    rowCount: rows.length,
    timestamp: new Date().toISOString(),
  }
}
