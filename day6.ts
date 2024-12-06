import { sum } from "./util.ts";

export type Pos = [number, number];
export type Guard = [Pos, string];

const DIR: { [key: string]: [number, number] } = {
  "<": [-1, 0],
  "^": [0, -1],
  ">": [1, 0],
  "v": [0, 1],
};

const OBSTACLES = ["#", "O"];

class Lab {
  private input: string;
  map: string[][] = [];

  constructor(input: string) {
    this.input = input;
    this.reset();
  }

  reset() {
    this.map = this.input.split("\n").map((l) => l.split(""));
  }

  move(): Guard | undefined {
    const [[x, y], d] = this.guard()!;
    const [dx, dy] = DIR[d]!;
    let [nx, ny] = [x + dx, y + dy];

    if (nx < 0 || nx >= this.map[0].length || ny < 0 || ny >= this.map.length) {
      this.map[y][x] = "X";
      return;
    }
    let nd = d;
    if (!OBSTACLES.includes(this.map[ny][nx])) {
      this.map[y][x] = "X";
    } else {
      nd = Object.keys(DIR)[(Object.keys(DIR).indexOf(d) + 1) % 4];
      [nx, ny] = [x, y];
    }

    this.map[ny][nx] = nd;
    return [[nx, ny], nd];
  }

  patrol() {
    while (this.move());
  }

  positions(): number {
    return sum(this.map.flatMap((r) => r.map((p) => p == "X" ? 1 : 0)));
  }

  guard(): Guard | undefined {
    for (let y = 0; y < this.map.length; y++) {
      for (let x = 0; x < this.map[y].length; x++) {
        const d = this.map[y][x];
        if (Object.keys(DIR).includes(d)) {
          return [[x, y], d];
        }
      }
    }
  }
}

const LAB = new Lab(await Deno.readTextFile("day6.txt"));

// Part 1
LAB.patrol();
console.log(LAB.positions());

// Part 2
function obstructions(lab: Lab) {
  lab.patrol();
  const route: Pos[] = lab.map.flatMap((r, y) =>
    r.map((p, x) => p == "X" ? [x, y] : undefined).filter((p) => p)
  ) as Pos[];
  lab.reset();
  let count = 0;
  for (const [x, y] of route) {
    if (OBSTACLES.includes(lab.map[y][x]) || Object.keys(DIR).includes(lab.map[y][x])) {
      continue;
    }
    lab.map[y][x] = "O";
    const route = new Set<string>([]);
    let p = lab.guard();
    while (p) {
      const entry = JSON.stringify(p);
      if (route.has(entry)) {
        count++;
        break;
      }
      route.add(JSON.stringify(p));
      p = lab.move();
    }
    lab.reset();
  }
  return count;
}

LAB.reset();
console.log(obstructions(LAB));

export { Lab, obstructions };
