import type { GiphyRandomResponse } from "./data/giphy.response"

const API_KEY = 'VS7zawVTPrImZD65uKj3bAFya14pGdjY'

const myRequest = fetch(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`)

const createTimageInsideDOM = (url: string) => {
    const imageElement = document.createElement('img')
    imageElement.src = url
    document.body.append(imageElement)
}

myRequest
    .then((response) => response.json()) // implicity return
    .then(({ data }: GiphyRandomResponse) => {
        const imageUrl = data.images.original.url
        createTimageInsideDOM(imageUrl)
    }) // promise chaining
    .catch((error) => {
        console.log(error)
    })