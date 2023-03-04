function calc(x: number, y: number, fn: (x: number, y: number) => number): number {
    return fn(x, y)
}
const sum = calc(3, 7, (x, y) => x + y)
const diff = calc(3, 7, (x, y) => x - y)
const mul = calc(3, 7, (x, y) => x * y)
const div = calc(3, 7, (x, y) => x / y)
const array = [sum, diff, mul, div]
for (const result of array)
    console.log(result)