import { assert, assertEquals } from "@std/assert";
import { check, fix, middle, parse } from "./day5.ts";
import { sum } from "./util.ts";

const INPUT = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

const [RULES, UPDATES] = parse(INPUT);

Deno.test("Day #5", () => {
  // Part 1
  assert(check(UPDATES[0], RULES));
  assertEquals(UPDATES.map((u) => check(u, RULES)), [
    true,
    true,
    true,
    false,
    false,
    false,
  ]);
  assertEquals(143, sum(UPDATES.filter((u) => check(u, RULES)).map(middle)));

  // Part 2
  const incorrect = UPDATES.filter((u) => !check(u, RULES));
  assertEquals(incorrect.map((u) => fix(u, RULES)), [
    [97, 75, 47, 61, 53],
    [61, 29, 13],
    [97, 75, 47, 29, 13],
  ]);
  assertEquals(123, sum(incorrect.map((u) => fix(u, RULES)).map(middle)));
});
