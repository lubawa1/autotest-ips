const temp: number = -1000
const veryCold: string = 'Очень холодно'
const cold: string = 'Холодно'
const prohladno: string = 'Прохладно'
const warm: string = 'Тепло'
const hot: string = 'Жарко'
if (temp <= -10) {
    console.log(veryCold)
} else if (temp > -10 && temp <= 10) {
    console.log(cold)
} else if (temp > 10 && temp <= 18) {
    console.log(prohladno)
} else if (temp > 18 && temp <= 25) {
    console.log(warm)
} else {
    console.log(hot)
}
