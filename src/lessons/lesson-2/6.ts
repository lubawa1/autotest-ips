const promise: Promise<string> = new Promise(resolve => {
    setTimeout(() => {
        resolve('resolve')
    }, 1000)
})