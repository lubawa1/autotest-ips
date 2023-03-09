const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('resolve')
    }, 1000)
})

async function print(): Promise<void> {
    console.log(await promise)
}

print()