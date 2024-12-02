import { assertEquals } from "@std/assert";
import { distance, similarity } from "./day1.ts";

Deno.test("Day #1", () => {
  const lists = [[3, 4, 2, 1, 3, 3], [4, 3, 5, 3, 9, 3]];

  assertEquals(distance(lists[0], lists[1]), 11);

  assertEquals(similarity(lists[0], lists[1]), 31);
});
