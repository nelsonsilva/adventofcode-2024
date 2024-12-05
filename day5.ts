import { sum, toInt } from "./util.ts";

const parse = (input: string) => {
  const [rules, updates] = input.split("\n\n");
  return [
    rules.split("\n").map((l) => l.split("|").map(toInt)),
    updates.split("\n").map((l) => l.split(",").map(toInt)),
  ];
};

const check = (update: number[], rules: number[][]): boolean =>
  update.every((p, i) =>
    update.slice(0, i).every((o) => rules.some(([a, b]) => a == o && b == p)) &&
    update.slice(i + 1).every((o) => rules.some(([a, b]) => a == p && b == o))
  );

const middle = (arr: any[]) => arr[Math.floor(arr.length / 2)];

const [RULES, UPDATES] = parse(await Deno.readTextFile("day5.txt"));

// Part 1

console.log(sum(UPDATES.filter((u) => check(u, RULES)).map(middle)));

// Part 2

const fix = (update: number[], rules: number[][]): number[] => {
  const res = [...update];
  for (let i = 0; i < res.length; i++) {
    for (let h = 0; h < i; h++) {
      if (rules.some(([a, b]) => a == res[i] && b == res[h])) {
        const [a, b] = [res[i], res[h]];
        res[h] = a;
        res[i] = b;
      }
    }
  }
  return res;
};

console.log(sum(UPDATES.filter((u) => !check(u, RULES)).map((u) => fix(u, RULES)).map(middle)));

export { check, fix, middle, parse };
