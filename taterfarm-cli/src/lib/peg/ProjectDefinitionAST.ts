export type Type =
  | OrType
  | AndType
  | ArrayType
  | ObjectType
  | TupleType
  | NumberType
  | BooleanType
  | StringType
  | StringLiteral
  | NumberLiteral
  | BooleanLiteral
  | NullLiteral
  | UnqualifiedName
  | QualifiedName

export type Location = {
  start: {
    offset: number
    line: number
    column: number
  }
  end: {
    offset: number
    line: number
    column: number
  }
}

export type OrType = {
  type: "OrType"
  location: Location
  types: Array<Type>
}

export type AndType = {
  type: "AndType"
  location: Location
  types: Array<Type>
}

export type ArrayType = {
  type: "ArrayType"
  location: Location
  elementType: Type
}

export type ObjectType = {
  type: "ObjectType"
  location: Location
  properties: Array<ObjectTypeProperty>
}

export type ObjectTypeProperty = {
  name: string
  location: Location
  optional: boolean
  type: Type
}

export type TupleType = {
  type: "TupleType"
  location: Location
  elementTypes: Array<TupleTypeElement>
}

export type TupleTypeElement = {
  type: Type
  location: Location
  optional: boolean
}

export type NumberType = {
  type: "NumberType"
  location: Location
}

export type BooleanType = {
  type: "BooleanType"
  location: Location
}

export type StringType = {
  type: "StringType"
  location: Location
}

export type StringLiteral = {
  type: "StringLiteral"
  location: Location
  value: string
}

export type NumberLiteral = {
  type: "NumberLiteral"
  location: Location
  value: number
}

export type BooleanLiteral = {
  type: "BooleanLiteral"
  location: Location
  value: boolean
}

export type NullLiteral = {
  type: "NullLiteral"
  location: Location
}

export type UnqualifiedName = {
  type: "UnqualifiedName"
  location: Location
  name: string
}

export type QualifiedName = {
  type: "QualifiedName"
  location: Location
  name: Array<string>
}
