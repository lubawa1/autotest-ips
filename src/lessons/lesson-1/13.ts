function calc(x: number, y: number, fn: (x:number, y:number) => number): number {
    return fn (x, y)
}
const x:number = 1
const y:number = 8
console.log(x+y)