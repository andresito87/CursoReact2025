

const myPromise = new Promise<number>((resolve, reject) => {
    setTimeout(() => {
        // resolve(100)
        reject('Mi amigo se perdió')
    }, 2000) // 2 seconds
})

myPromise
    .then((myMoney) => {
        console.log(`Tengo mi dinero ${myMoney}`)
    })
    .catch((reason) => {
        console.warn(reason)
    })
    .finally(() => {
        console.log('Pues a seguir con mi vida')
    })