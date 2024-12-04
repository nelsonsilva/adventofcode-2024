import { assertEquals } from "@std/assert";
import { findXMAS, search } from "./day4.ts";

const INPUT = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

Deno.test("Day #4", () => {
  assertEquals(18, search("XMAS", INPUT));
  assertEquals(9, findXMAS(INPUT));
});
