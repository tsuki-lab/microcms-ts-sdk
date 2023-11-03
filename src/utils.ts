type Cdr<XS extends any[]> = XS extends [any, ...infer R] ? R : never;
type Length<XS extends any[]> = XS extends { length: infer L } ? L : never;
type NumberToTuple<N extends number, XS extends any[] = []> = Length<XS> extends N
  ? XS
  : NumberToTuple<N, [0, ...XS]>;

export type DecrementNum<N extends number> = Length<Cdr<NumberToTuple<N>>>;
