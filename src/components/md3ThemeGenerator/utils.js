export function fileToBuffer(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => {
            let data = e.target.result
            resolve(data)
        }
        try {
            reader.readAsArrayBuffer(file)
        } catch(e) {
            reject(e)
        }
    })
}

export function imageToDataUrl(image) {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, image.width, image.height);
    return canvas.toDataURL('image/png')
}

export function getImageDataUrl(url) {
    return new Promise((resolve, reject) => {
        const image = new Image()
        image.setAttribute("crossOrigin",'Anonymous')
        image.onload = () => {
            try {
                resolve(imageToDataUrl(image))
            } catch(e) {
                reject(e)
            }
        }
        image.onerror = reject
        image.src = url;
    })
}