import * as parser from "./Project.js"
import fs from "node:fs"

export function parseProject({filename}:{filename:string}):any {
  const input = fs.readFileSync(filename).toString()
  const ret = parser.parse(input, {})
  return ret
}
