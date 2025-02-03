import fs from "node:fs"

export function pathExists(path:string): boolean {
  const stats = fs.statSync(path, {throwIfNoEntry: false})
  return stats != null
}

export function isDirectory(path:string): boolean {
  const stats = fs.statSync(path, {throwIfNoEntry: false})
  return stats != null && stats.isDirectory()
}

export function isFile(path:string): boolean {
  const stats = fs.statSync(path, {throwIfNoEntry: false})
  return stats != null && stats.isFile()
}

export function mkdir(path: string):void {
  fs.mkdirSync(path, {recursive: true})
}
