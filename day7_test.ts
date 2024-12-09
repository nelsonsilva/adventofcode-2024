import { assertEquals } from "@std/assert/equals";
import { concat, parse, plus, solve, times } from "./day7.ts";
import { assert } from "@std/assert/assert";

const INPUT = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

Deno.test("Day #7", () => {
  // Part 1
  let OPS = [plus, times];
  const eq = parse(INPUT);
  assertEquals([190, [10, 19]], eq[0]);
  assert(solve(eq[0], OPS));
  assert(solve(eq[1], OPS));
  assertEquals(eq.map((e) => solve(e, OPS)), [
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
  ]);

  // Part 2
  OPS = [concat, plus, times];
  assertEquals(eq.map((e) => solve(e, OPS)), [
    true,
    true,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
  ]);
});
