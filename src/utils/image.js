/**
 * Converts the specified image to base 64.
 * @param {File|Blop} file The image to convert
 * @returns {Promise<String>}
 */
export function convertToBase64 (file) {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => resolve(null)
    reader.readAsDataURL(file)
  })
}

/**
 * Create an HTMLImageElement object from a file.
 * @param {File|Blop} file
 * @returns {HTMLImageElement}
 */
export function render (file) {
  return new Promise(async resolve => {
    const base64 = await convertToBase64(file)
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => resolve(null)
    image.src = base64
  })
}

/**
 * Resizes the specified image to respect the specified maximum width and heights.
 * @param {File|Blop} file The image to resize
 * @param {Number} limit The maximum size that the image can take on both sides
 */
export async function limitResolution (file, limit) {
  const image = await render(file)
  if (!image) {
    return null
  }
  const canvas = document.createElement('canvas')

  const size = limitSizeKeepRatio({
    limit,
    width: image.width,
    height: image.height
  })
  Object.assign(canvas, size)

  const ctx = canvas.getContext('2d')
  ctx.drawImage(image, 0, 0, size.width, size.height)
  return canvas.toDataURL()
}

// TODO: Commenter cette function.
export function limitSizeKeepRatio ({ width, height, limit }) {
  const greatest = Math.max(width, height)
  const smallest = Math.min(width, height)

  const greatestLimited = greatest > limit ? limit : greatest
  const smallestLimited = greatestLimited * smallest / greatest

  return {
    width: width === greatest ? greatestLimited : smallestLimited,
    height: height === smallest ? smallestLimited : greatestLimited
  }
}
