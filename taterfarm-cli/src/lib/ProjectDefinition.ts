export type ProjectDefinition = {
  cli?: Opt<ProjectCliDefinition>
  package?: Opt<ProjectPackageDefinition>
}

export type ProjectCliDefinition = {
  commands?: Opt<Array<CliCommand>>
}

export type CliCommand = {
  name: string
  version?: Opt<string>
  description?: Opt<string>
  options?: Opt<Array<CliCommandOption>>
  subcommands?: Opt<Array<CliCommand>>
}

export type CliCommandOption = {
  name: string
  descripiton?: Opt<string>
  char: string
  value?: Opt<CliCommandOptionValue>
}

export type CliCommandOptionValue =
  | BooleanCliCommandOptionValue
  | StringCliCommandOptionValue

export type BooleanCliCommandOptionValue = {
  type: "boolean"
  name?: Opt<string>
  // Allows "no-" to be specified, value is true by default (unless
  // default is specified)
  negatable?: Opt<boolean>
  default?: Opt<StringCliCommandOptionDefault>
}

export type BooleanCliCommandOptionDefault = {
  value: boolean
  name?: Opt<string>
}

export type StringCliCommandOptionValue = {
  type: "string"
  name?: Opt<string>
  multiple?: Opt<boolean>
  choices?: Opt<Array<string>>
  // Used if the option is not specified
  default?: Opt<StringCliCommandOptionDefault>
  // Used if the option is specified without a value
  preset?: Opt<StringCliCommandOptionDefault>
}

export type StringCliCommandOptionDefault = {
  value: string
  name?: Opt<string>
}

export type ProjectPackageDefinition = {
  dependencies?: ProjectDependencies
  devDependencies?: ProjectDependencies
  peerDependencies?: ProjectDependencies
}

export type ProjectDependencies = {[name:string]:string}

export type Opt<T> = T | null | undefined
