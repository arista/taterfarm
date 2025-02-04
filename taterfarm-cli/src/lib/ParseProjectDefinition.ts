import * as parser from "./peg/ProjectDefinition.js"
import fs from "node:fs"

export function parseProjectDefinition({filename}: {filename: string}): any {
  const input = fs.readFileSync(filename).toString()
  const ret = parser.parse(input, {})
  return ret
}
