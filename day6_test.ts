import { assertEquals } from "@std/assert";
import { Lab, obstructions } from "./day6.ts";

const INPUT = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

const lab = new Lab(INPUT);

Deno.test("Day #6", () => {
  // Part 1

  assertEquals(lab.guard(), [[4, 6], "^"]);
  lab.move();
  assertEquals(lab.guard(), [[4, 5], "^"]);
  lab.patrol();
  assertEquals(lab.positions(), 41);

  // Part 2

  lab.reset();
  assertEquals(obstructions(lab), 6);
});
