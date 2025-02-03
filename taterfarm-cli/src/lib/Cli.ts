import {Command, Option} from "commander"
import process from "node:process"
import {A, M} from "./index.js"

export async function cli() {
  const program = new Command()
  program
    .name("taterfarm")
    .description("CLI to generate project structure and files")
    .version("0.0.1")
  //  cmd
  //    .requiredOption("-d, --drink <size>", "drink size")
  //    .addOption(new Option("-o, --output [file]", "output file name").default("abc", "the default").preset("HOME"))

  program
    .command("generate-project")
    .argument("<directory>")
    .action((projectDirectory) => {
      M.generateProject({
        projectDirectory,
      })
    })

  program
    .command("parser-test")
    .argument("<filename>")
    .action((filename) => {
      const parsed = A.ParseProject.parseProject({filename})
      console.log(JSON.stringify(parsed, null, 2))
    })

  await program.parseAsync()

  /*
  cmd.parse(process.argv)
  const options = cmd.opts()
  console.log(JSON.stringify(options, null, 2))
  console.log(cmd)
  */
}
