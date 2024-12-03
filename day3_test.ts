import { assertEquals } from "@std/assert";
import { conditional, evaluate, parse } from "./day3.ts";
import { sum } from "./util.ts";

const INPUT = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;

const INPUT2 = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

Deno.test("Day #3", () => {
  assertEquals(161, sum(parse(INPUT).map(evaluate)));
  assertEquals(48, sum(conditional(parse(INPUT2)).map(evaluate)));
});
