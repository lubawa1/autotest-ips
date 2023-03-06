type CalcFunctions = (x: number, y: number) => number
function calc(x: number, y: number, fn: CalcFunctions): number {
    return fn(x, y)
}
const sum2: CalcFunctions = (x: number, y: number): number => x + y
const diff2: CalcFunctions = (x: number, y: number): number => x - y
const mul2: CalcFunctions = (x: number, y: number): number => x * y
const div2: CalcFunctions = (x: number, y: number): number => {
    if (y === 0) {
        throw new Error('Делитель не может быть равен нулю')
    }
    return x / y
}

const array: CalcFunctions[] = [sum2, diff2, mul2, div2]
for (const result of array) {
    console.log(calc(4, 0, result))
}
