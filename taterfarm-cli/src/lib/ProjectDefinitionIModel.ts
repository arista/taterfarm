export class Location {
}

export class Type {
  constructor(public location:Location) {}
}

export class OrType extends Type {
  constructor(location:Location, public types: Array<Type>) {
    super(location)
  }
}

export class AndType extends Type {
  constructor(location:Location, public types: Array<Type>) {
    super(location)
  }
}

export class ArrayType extends Type {
  constructor(location:Location, public type: Type) {
    super(location)
  }
}

export class ObjectType extends Type {
  constructor(location:Location, public properties: Array<ObjectTypeElement>) {
    super(location)
  }
}

export class ObjectTypeElement {
  constructor(public location:Location) {}
}

export class ObjectTypeIndex extends ObjectTypeElement {
  constructor(public location:Location, name: string, indexType: Type, valueType: Type) {
    super(location)
  }
}

export class ObjectTypeProperty extends ObjectTypeElement {
  constructor(public location:Location, name: string, optional: boolean, valueType: Type) {
    super(location)
  }
}

export class TupleType extends Type {
  constructor(location:Location, public elementTypes: Array<TupleTypeElement>) {
    super(location)
  }
}

export class TupleTypeElement {
  constructor(public location:Location, public optional:boolean) {
  }
}

export class AnyType extends Type {
  constructor(public location:Location) {
    super(location)
  }
}

export class UnknownType extends Type {
  constructor(public location:Location) {
    super(location)
  }
}

export class VoidType extends Type {
  constructor(public location:Location) {
    super(location)
  }
}

export class NamedType extends Type {
  constructor(public location:Location, name: Name) {
    super(location)
  }
}

export class Name {
  constructor(public location:Location) {
  }
}

export class UnqualifiedName extends Name {
  constructor(public location:Location, name: string) {
    super(location)
  }
}

export class QualifiedName extends Name {
  constructor(public location:Location, name: Array<string>) {
    super(location)
  }
}

export class FunctionType extends Name {
  constructor(public location:Location, public parameters: Array<FunctionTypeParam>, public returnType: Type) {
    super(location)
  }
}

export class FunctionTypeParam {
  constructor(public location:Location, public name: string, public type:Type, public optional:boolean) {
  }
}

export class GenericInstantiation extends Type {
  constructor(public location:Location, public namedType: NamedType, public types:Array<Type>) {
    super(location)
  }
}

export class NumberType extends Type {
  constructor(public location:Location) {
    super(location)
  }
}

export class BooleanType extends Type {
  constructor(public location:Location) {
    super(location)
  }
}

export class StringType extends Type {
  constructor(public location:Location) {
    super(location)
  }
}

export class NumberLiteral extends Type {
  constructor(public location:Location, public value: number) {
    super(location)
  }
}

export class BooleanLiteral extends Type {
  constructor(public location:Location, public value: boolean) {
    super(location)
  }
}

export class StringLiteral extends Type {
  constructor(public location:Location, public value: string) {
    super(location)
  }
}

export class NullLiteral extends Type {
  constructor(public location:Location) {
    super(location)
  }
}
