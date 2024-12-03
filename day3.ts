import { sum } from "./util.ts";

const instructions = (s: string) => s.match(/(mul|don\'t|do)\((\d+,\d+)?\)/g);

type Op = [string, number[]];

function parseInstruction(i: string): Op {
  const [_, op, args] = i.match(/([^\()]+)\(([^\)]*)\)/)!;
  return [op, args ? args.split(",").map((s) => parseInt(s)) : []];
}

const parse = (s: string): Op[] => instructions(s)!.map(parseInstruction);

const mul = (l: number[]) => l.reduce((a, b) => a * b, 1);

function evaluate(op: Op): number {
  const [i, a] = op;
  switch (i) {
    case "mul":
      return mul(a);
    default:
      return 0;
  }
}

const INPUT = await Deno.readTextFile("day3.txt");

// Part 1

console.log(sum(parse(INPUT).map(evaluate)));

// Part 2

function conditional(p: Op[]) {
  let enabled = true;
  return p.filter((i) => {
    if (i[0] == "mul") return enabled;
    enabled = i[0] == "do";
    return false;
  });
}

console.log(sum(conditional(parse(INPUT)).map(evaluate)));

export { conditional, evaluate, instructions, parse };
