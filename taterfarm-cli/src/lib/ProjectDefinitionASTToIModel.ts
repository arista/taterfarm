import {A,M} from "./index.js"
import {ProjectDefinitionAST as AST} from "./indexAll.js"
import {ProjectDefinitionIModel as IM} from "./indexAll.js"

export function typeToIModel(src: AST.Type):IM.Type {
  const location = locationToModel(src.location)
  switch(src.type) {
  case "OrType":
    return new IM.OrType(location, typesToIModel(src.types))
  case "AndType":
    return new IM.AndType(location, typesToIModel(src.types))
  case "ArrayType":
    return new IM.ArrayType(location, typeToIModel(src.elementType))
  case "ObjectType":
    return new IM.ObjectType(location, objectTypeElementsToIModel(src.elements))
  case "TupleType":
    return new IM.TupleType(location, tupleTypeElementsToIModel(src.elements))
  case "AnyType":
    return new IM.AnyType(location)
  case "UnknownType":
    return new IM.UnknownType(location)
  case "VoidType":
    return new IM.VoidType(location)
  case "NamedType":
    return namedTypeToIModel(src)
  case "NumberType":
    return new IM.NumberType(location)
  case "BooleanType":
    return new IM.BooleanType(location)
  case "StringType":
    return new IM.StringType(location)
  case "StringLiteral":
    return new IM.StringLiteral(location, src.value)
  case "NumberLiteral":
    return new IM.NumberLiteral(location, src.value)
  case "BooleanLiteral":
    return new IM.BooleanLiteral(location, src.value)
  case "NullLiteral":
    return new IM.NullLiteral(location)
  case "GenericInstantiation":
    return new IM.GenericInstantiation(location, namedTypeToIModel(src.namedType), typesToIModel(src.types))
  case "FunctionType":
    return new IM.FunctionType(location, functionTypeParamsToIModel(src.parameters), typeToIModel(src.returnType))
  }
}

export function typesToIModel(src: Array<AST.Type>):Array<IM.Type> {
  return src.map(t=>typeToIModel(t))
}

export function namedTypeToIModel(src: AST.NamedType): IM.NamedType {
  const location = locationToModel(src.location)
  return new IM.NamedType(location, nameToIModel(src.name))
}

export function locationToModel(src: AST.Location):IM.Location {
  return new IM.Location()
}

export function tupleTypeElementsToIModel(src: Array<AST.TupleTypeElement>): Array<IM.TupleTypeElement> {
  return src.map(t=>tupleTypeElementToIModel(t))
}

export function tupleTypeElementToIModel(src: AST.TupleTypeElement): IM.TupleTypeElement {
  return new IM.TupleTypeElement(location, src.optional)
}

export function nameToIModel(src: AST.Name): IM.Name {
  const location = locationToModel(src.location)
  switch(src.type) {
  case "UnqualifiedName":
    return new IM.UnqualifiedName(location, src.name)
  case "QualifiedName":
    return new IM.QualifiedName(location, src.name)
  }
}

export function objectTypeElementsToIModel(src: Array<AST.ObjectTypeElement>): Array<IM.ObjectTypeElement> {
  return src.map(p=>objectTypeElementToIModel(p))
}

export function objectTypeElementToIModel(src: AST.ObjectTypeElement): IM.ObjectTypeElement {
  const location = locationToModel(src.location)
  switch(src.type) {
  case "Index":
    return new IM.ObjectTypeIndex(location, src.name, typeToIModel(src.indexType), typeToIModel(src.valueType))
  case "Property":
    return new IM.ObjectTypeProperty(location, src.name, src.optional, typeToIModel(src.valueType))
  }
}

export function functionTypeParamsToIModel(src: Array<AST.FunctionTypeParam>): Array<IM.FunctionTypeParam> {
  return src.map(p=>functionTypeParamToIModel(p))
}

export function functionTypeParamToIModel(src: AST.FunctionTypeParam): IM.FunctionTypeParam {
  const location = locationToModel(src.location)
  return new IM.FunctionTypeParam(location, src.name, typeToIModel(src.type), src.optional)
}
