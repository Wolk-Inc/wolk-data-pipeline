import { readFile } from 'node:fs/promises'

function splitCsvLine(line: string) {
  return line.split(',').map((value) => value.trim())
}

export async function readCsvFile(path: string) {
  const raw = await readFile(path, 'utf8')
  const lines = raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  const [headerLine, ...rows] = lines
  const headers = splitCsvLine(headerLine)

  return rows.map((row) => {
    const values = splitCsvLine(row)
    return headers.reduce<Record<string, string>>((record, header, index) => {
      record[header] = values[index] ?? ''
      return record
    }, {})
  })
}
