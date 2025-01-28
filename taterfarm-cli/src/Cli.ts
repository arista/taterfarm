import {Command, Option} from "commander"
import process from "node:process"

export function cli() {
  const cmd = new Command()
  cmd
    .name("taterfarm")
    .description("CLI to generate project structure and files")
    .version("0.0.1")
  cmd
//    .requiredOption("-d, --drink <size>", "drink size")
//    .addOption(new Option("-o, --output [file]", "output file name").default("abc", "the default").preset("HOME"))

  cmd.addCommand(new Command().
                 name("generate-project")
                )

  cmd.parse(process.argv)
  const options = cmd.opts()
  console.log(JSON.stringify(options, null, 2))
}
