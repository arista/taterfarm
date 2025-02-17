export type Type =
  | OrType
  | AndType
  | ArrayType
  | ObjectType
  | TupleType
  | AnyType
  | UnknownType
  | VoidType
  | NamedType
  | NumberType
  | BooleanType
  | StringType
  | StringLiteral
  | NumberLiteral
  | BooleanLiteral
  | NullLiteral
  | GenericInstantiation
  | FunctionType

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
  elements: Array<ObjectTypeElement>
}

export type ObjectTypeElement = ObjectTypeIndex | ObjectTypeProperty

export type ObjectTypeIndex = {
  type: "Index"
  location: Location
  name: string
  indexType: Type
  valueType: Type
}

export type ObjectTypeProperty = {
  type: "Property"
  location: Location
  name: string
  optional: boolean
  valueType: Type
}

export type TupleType = {
  type: "TupleType"
  location: Location
  elements: Array<TupleTypeElement>
}

export type TupleTypeElement = {
  type: Type
  location: Location
  optional: boolean
}

export type AnyType = {
  type: "AnyType"
  location: Location
}

export type UnknownType = {
  type: "UnknownType"
  location: Location
}

export type VoidType = {
  type: "VoidType"
  location: Location
}

export type NamedType = {
  type: "NamedType"
  location: Location
  name: Name
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

export type Name = UnqualifiedName | QualifiedName

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

export type FunctionType = {
  type: "FunctionType"
  location: Location
  parameters: Array<FunctionTypeParam>
  returnType: Type
}

export type FunctionTypeParam = {
  location: Location
  name: string
  type: Type
  optional: boolean
}

export type GenericInstantiation = {
  type: "GenericInstantiation"
  location: Location
  namedType: NamedType
  types: Array<Type>
}
