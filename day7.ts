import { sum, toInt } from "./util.ts";

type Equation = [number, number[]];

type Op = (a: number, b: number) => number;

const plus = (a: number, b: number) => a + b;
const times = (a: number, b: number) => a * b;
const concat = (a: number, b: number) => toInt(a.toString() + b.toString());

const parse = (input: string): Equation[] =>
  input.split("\n").map((l) => {
    const [res, nb] = l.split(": ");
    return [toInt(res), nb.split(" ").map(toInt)];
  });

const solve = (eq: Equation, ops: Op[]): boolean => {
  const [res, nbs] = eq;
  if (nbs.length === 1) {
    return res === nbs[0];
  }
  const [a, b, ...rest] = nbs;
  return ops.some((op) => solve([res, [op(a, b), ...rest]], ops));
};

// Part 1
let OPS = [plus, times];
const EQ = parse(await Deno.readTextFile("day7.txt"));

console.log(sum(EQ.filter((eq) => solve(eq, OPS)).map((eq) => eq[0])));

// Part 2
OPS = [concat, plus, times];
console.log(sum(EQ.filter((eq) => solve(eq, OPS)).map((eq) => eq[0])));
export { concat, parse, plus, solve, times };
