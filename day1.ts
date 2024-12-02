const ascending = (l: number[]) => l.toSorted((a, b) => a - b);

const zip = (l1: number[], l2: number[]): number[][] => l1.map((a, i) => [a, l2[i]]);

const distances = (l1: number[], l2: number[]) => zip(l1, l2).map(([a, b]) => Math.abs(a - b));

const sum = (l: number[]) => l.reduce((a, b) => a + b, 0);

const distance = (l1: number[], l2: number[]) => sum(distances(ascending(l1), ascending(l2)));

const occurrences = (n: number, l: number[]) => l.reduce((c, v) => c + (v == n ? 1 : 0), 0);

const similarity = (l1: number[], l2: number[]) => sum(l1.map((v) => v * occurrences(v, l2)));

const input = await Deno.readTextFile("day1.txt");

const pairs = input.split("\n").map((l) => l.split(/\s+/).map((n) => parseInt(n)));

const l = pairs.map((p) => p[0]);
const r = pairs.map((p) => p[1]);

// Part 1
console.log(distance(l, r));

// Part 2
console.log(similarity(l, r));

export { distance, similarity };
