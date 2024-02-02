type Cdr<XS extends any[]> = XS extends [any, ...infer R] ? R : never;
type Length<XS extends any[]> = XS extends { length: infer L } ? L : never;
type NumberToTuple<N extends number, XS extends any[] = []> = Length<XS> extends N
  ? XS
  : NumberToTuple<N, [0, ...XS]>;

export type DecrementNum<N extends number> = Length<Cdr<NumberToTuple<N>>>;

type Split<S, Delimiter extends string> = S extends `${infer T}${Delimiter}${infer U}`
  ? [T, ...Split<U, Delimiter>]
  : [S];

type DeepPick<T, Keys extends string[]> = Keys extends [infer First, ...infer Rest]
  ? First extends keyof T
    ? {
        [K in First]: T[First] extends any[]
          ? DeepPick<T[First][number], Extract<Rest, string[]>>[]
          : DeepPick<T[First], Extract<Rest, string[]>>;
      }
    : First extends string
      ? {
          [K in First]: DeepPick<unknown, Extract<Rest, string[]>>
        }
      : never
  : T;

type Intersection<T> = (T extends T ? (x: T) => 0 : never) extends (x: infer R) => 0 ? R : never;

export type PickByFields<T, Field> = Intersection<
  Field extends string ? DeepPick<T, Split<Field, '.'>> : never
>;
