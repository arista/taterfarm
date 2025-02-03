import {A, M} from "./index.js"
import fs from "node:fs"
import * as Path from "node:path"

export async function generateProject({
  projectDirectory,
}: {
  projectDirectory: string
}): Promise<{}> {
  const log: ILog = new Log()
  const files: IProjectFiles = new ProjectFiles()
  const projectSpec: M.ProjectDefinition = readProjectDefinition()

  await run()

  async function run() {
    prepareDirectory()
    addGitignore()
    addDirLocals()
    addPrettierConfig()
    addTsconfig()
    addPackageJson()
    writeProjectFiles()
  }

  function prepareDirectory() {
    if (!A.FileUtils.pathExists(projectDirectory)) {
      log.info(`Creatimg directory "${projectDirectory}"`)
      A.FileUtils.mkdir(projectDirectory)
    } else if (A.FileUtils.isFile(projectDirectory)) {
      throw new Error(`"${projectDirectory}" is a file, not a directory`)
    }
  }

  function readProjectDefinition(): M.ProjectDefinition {
    const path = Path.join(projectDirectory, "src", "project.json")
    if (A.FileUtils.isFile(path)) {
      return JSON.parse(fs.readFileSync(path).toString())
    } else {
      return {}
    }
  }

  function writeProjectFiles() {
    files.writeProjectFiles({
      projectDirectory,
    })
  }

  function addGitignore() {
    files.buildFileFromLines(".gitignore", [
      "node_modules",
      "build/",
      "*~",
      "#*",
      ".eslintcache",
      "tmp",
      ".rpt2_cache",
      ".~lock*",
    ])
  }

  function addDirLocals() {
    files.buildFileFromLines(".dir-locals.el", [
      ";; Used by emacs to prevent it from creating the temporary lockfiles",
      ";; that break the React development server or other watch-based processes",
      "((nil . ((create-lockfiles . nil))))",
    ])
  }

  function addPrettierConfig() {
    files.buildFile("prettier.config.js", (cg) => {
      cg.block(`export default {`, `}`, () => {
        cg.println(`trailingComma: "es5",`)
        cg.println(`semi: false,`)
        cg.println(`bracketSpacing: false`)
      })
    })
  }

  function addTsconfig() {
    const json = {
      compilerOptions: {
        declaration: true,
        module: "Node16",
        outDir: "./build/dist",
        rootDir: ".",
        strict: true,
        target: "es2022",
        moduleResolution: "node16",

        forceConsistentCasingInFileNames: true,
        noFallthroughCasesInSwitch: true,
        isolatedModules: true,
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        esModuleInterop: true,

        jsx: "react-jsx",
      },
      include: ["./src/**/*"],
      "ts-node": {
        esm: true,
      },
    }
    files.buildFileFromJson("tsconfig.json", json)
  }

  function addPackageJson() {
    const json = {
      type: "module",
      scripts: {
        prettier:
          "npx prettier --write src/**/*.{ts,tsx,css,scss,html,json,js}",
        tsc: "npx tsc -b",
        "tsc-watch": "npx tsc -b -w",
        rollup: "npx rollup -c rollup.config.js",
        "rollup-watch": "npx rollup -w -c rollup.config.js",
      },
      devDependencies: {
        "@types/node": "^22.10.7",
        concurrently: "^9.1.2",
        prettier: "^3.4.2",
        typescript: "^5.7.3",
      },
      dependencies: {
        commander: "^13.0.0",
        minicodegen: "file:../../minicodegen",
        "taterfarm-runtime": "file:../taterfarm-runtime",
      },
    }
    files.buildFileFromJson("package.json", json)
  }

  return {}
}

interface IProjectFiles {
  buildFile(path: string, f: (cg: A.Codegen) => void): void
  buildFileFromLines(
    path: string,
    lines: Array<string | null | undefined>
  ): void
  buildFileFromJson(path: string, json: any): void
  writeProjectFiles({projectDirectory}: {projectDirectory: string}): void
}

class ProjectFiles implements IProjectFiles {
  codeFiles = new A.CodeFiles()

  buildFile(path: string, f: (cg: A.Codegen) => void): void {
    const cg = A.Codegen()
    f(cg)
    cg.addToCodeFiles(this.codeFiles, path)
  }

  buildFileFromLines(
    path: string,
    lines: Array<string | null | undefined>
  ): void {
    this.buildFile(path, (cg) => {
      for (const line of lines) {
        if (line != null) {
          cg.println(line)
        } else {
          cg.println()
        }
      }
    })
  }

  buildFileFromJson(path: string, json: any): void {
    this.buildFile(path, (cg) => {
      const str = JSON.stringify(json, null, 2)
      cg.println(str)
    })
  }

  writeProjectFiles({
    projectDirectory,
    log,
  }: {
    projectDirectory: string
    log: ILog
  }): void {
    if (!A.FileUtils.pathExists(projectDirectory)) {
      log.info(`Creatimg directory "${projectDirectory}"`)
      A.FileUtils.mkdir(projectDirectory)
    } else if (A.FileUtils.isFile(projectDirectory)) {
      throw new Error(`"${projectDirectory}" is a file, not a directory`)
    }

    this.codeFiles.write({
      rootPath: projectDirectory,
      log: true,
      dryRun: false,
    })
  }
}

interface ILog {
  error(msg: string): void
  warn(msg: string): void
  info(msg: string): void
  debug(msg: string): void
}

class Log implements ILog {
  error(msg: string): void {
    this.log("error", msg)
  }

  warn(msg: string): void {
    this.log("warn", msg)
  }

  info(msg: string): void {
    this.log("info", msg)
  }

  debug(msg: string): void {
    this.log("debug", msg)
  }

  log(level: LogLevel, msg: string) {
    // FIXME - implement this
    console.log(msg)
  }
}

type LogLevel = "error" | "warn" | "info" | "debug"
