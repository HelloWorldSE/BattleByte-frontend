/**
 * Loads an image and turns it into a data URL
 *  !!! this is sensitive to CORS !!!
 */
const loadImageDataUrl = async (url) => {
    const blob = await fetch(url).then(res => res.blob())
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    const event = await new Promise(resolve => reader.onload = resolve)
    
    return event.currentTarget.result
}

/**
 * Builds a random data URL based on the original dataUrl by 
 * adding a random number into the data header.
 */
export async function getRandomizedGifDataUrl(imageUrl){
    const head = 'data:image/gif;base64'
    const randomize = (url) => !url ? '' : url.replace(head, `${head};${Math.random()}`)
    console.log('1')
    const dataUrl = await loadImageDataUrl(imageUrl)
    return randomize(dataUrl)
}