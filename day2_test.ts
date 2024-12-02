import { assertEquals } from "@std/assert";
import { dampened, deltas, isSafe } from "./day2.ts";

const INPUT = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

const reports = INPUT.split("\n").map((l) => l.split(/\s+/).map((n) => parseInt(n)));

Deno.test("Day #2", () => {
  assertEquals([-1, -2, -2, -1], deltas(reports[0]));

  assertEquals([
    true,
    false,
    false,
    false,
    false,
    true,
  ], reports.map((r) => isSafe(r)));

  assertEquals([
    [6, 4, 2, 1],
    [7, 4, 2, 1],
    [7, 6, 2, 1],
    [7, 6, 4, 1],
    [7, 6, 4, 2],
  ], dampened(reports[0]));

  assertEquals([
    true,
    false,
    false,
    true,
    true,
    true,
  ], reports.map((r) => isSafe(r) || dampened(r).some((r) => isSafe(r))));
});
