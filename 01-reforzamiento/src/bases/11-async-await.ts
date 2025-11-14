import type { GiphyRandomResponse } from "./data/giphy.response"

const API_KEY = 'VS7zawVTPrImZD65uKj3bAFya14pGdjY'

const createTimageInsideDOM = (url: string) => {
    const imageElement = document.createElement('img')
    imageElement.src = url
    document.body.append(imageElement)
}

const getRandomGifUrl = async (): Promise<string> => { // asyncronous function

    const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`)
    const { data }: GiphyRandomResponse = await response.json()

    return data.images.original.url
}

getRandomGifUrl().then(createTimageInsideDOM)

// const myRequest = fetch(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`)
// myRequest
//     .then((response) => response.json()) // implicity return
//     .then(({ data }: GiphyRandomResponse) => {
//         const imageUrl = data.images.original.url
//         createTimageInsideDOM(imageUrl)
//     }) // promise chaining
//     .catch((error) => {
//         console.log(error)
//     })