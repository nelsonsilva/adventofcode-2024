const deltas = (report: number[]) => report.reduce((l: number[], v, i) => i == 0 ? l : [...l, v - report[i - 1]], []);

function isSafe(report: number[]): boolean {
  const ds = deltas(report);
  return ds.every((d: number) => d >= 1 && d <= 3) || ds.every((d: number) => d <= -1 && d >= -3);
}

const INPUT = await Deno.readTextFile("day2.txt");

const REPORTS = INPUT.split("\n").map((l) => l.split(/\s+/).map((n) => parseInt(n)));

// Part 1
console.log(REPORTS.filter((r) => isSafe(r)).length);

// Part 2
const dampened = (report: number[]) => report.map((_, i) => report.toSpliced(i, 1));

console.log(REPORTS.filter((r) => isSafe(r) || dampened(r).some((r) => isSafe(r))).length);

export { dampened, deltas, isSafe };
