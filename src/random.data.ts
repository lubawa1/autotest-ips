function getRandomString(lenght: number): string {
    let randomString: string = ''
    for (let i = 0; i < lenght; i++) {
        const randomUpper: number = Math.random() * 2 | 0
        const random: number = Math.random() * 25 | 0
        if (randomUpper == 0) {
            randomString += String.fromCharCode(97 + random)
        } else {
            randomString += String.fromCharCode(65 + random)
        }
    }
    return randomString
}

export {
    getRandomString
}