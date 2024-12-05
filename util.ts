const sum = (l: number[]) => l.reduce((a, b) => a + b, 0);

const toInt = (s: string) => parseInt(s);

export { sum, toInt };
