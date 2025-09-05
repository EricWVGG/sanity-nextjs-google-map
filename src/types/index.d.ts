declare global {
  declare type Member<A> = A extends readonly (infer T)[] ? T : never
}

export * from "./sanity"
