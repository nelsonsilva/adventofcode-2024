import { sum } from "./util.ts";

const reverse = (s: string) => [...s].reverse().join("");

const findAll = (q: string, str: string) => [...str.matchAll(new RegExp(q, "g"))].length;

export const diagonals = (grid: string) => {
  const rows = grid.split("\n");
  const cols = [...Array(rows[0].length)].map((_, i) => rows.map((r) => r[i]).join(""));
  const diagonals: string[] = [];

  for (let r = 0; r < rows.length; r++) {
    const d: { [k: string]: string[] } = { dr: [], ur: [], dl: [], ul: [] };
    let dr = r;
    let ur = r;
    for (let c = 0; c < cols.length; c++, dr++, ur--) {
      if (dr < rows.length) {
        d.dr.push(rows[dr][c]);
        if (r > 0) d.dl.push(rows[dr][cols.length - c - 1]);
      }
      if (ur >= 0) {
        d.ur.push(rows[ur][c]);
        if (r < cols.length - 1) d.ul.push(rows[ur][cols.length - c - 1]);
      }
    }
    diagonals.push(...Object.values(d).map((d) => d.join("")));
  }
  return diagonals;
};

export const search = (word: string, grid: string) => {
  const rows = grid.split("\n");
  const cols = [...Array(rows[0].length)].map((_, i) => rows.map((r) => r[i]).join(""));
  return sum([...rows, ...cols, ...diagonals(grid)].map((s) => findAll(word, s) + findAll(reverse(word), s)));
};

// Part 1

const INPUT = await Deno.readTextFile("day4.txt");
console.log(search("XMAS", INPUT));

// Part 2

export function findXMAS(input: string) {
  const grid = input.split("\n");
  let count = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid.length; x++) {
      if (
        grid[y][x] == "A" && (
          (grid[y - 1]?.[x - 1] == "M" && grid[y + 1]?.[x + 1] == "S") ||
          (grid[y - 1]?.[x - 1] == "S" && grid[y + 1]?.[x + 1] == "M")
        ) && (
          (grid[y + 1]?.[x - 1] == "M" && grid[y - 1]?.[x + 1] == "S") ||
          (grid[y + 1]?.[x - 1] == "S" && grid[y - 1]?.[x + 1] == "M")
        )
      ) {
        count++;
      }
    }
  }
  return count;
}

console.log(findXMAS(INPUT));
