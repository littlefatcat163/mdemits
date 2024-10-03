import PhotoSwipeLightbox from 'photoswipe/lightbox'

let lightbox: PhotoSwipeLightbox

function uiRegister(lightbox: PhotoSwipeLightbox) {
    lightbox.on('uiRegister', () => {
        lightbox.pswp!.ui!.registerElement({
            name: 'mde-photoswipe-caption',
            className: 'mde-lightbox-caption',
            order: 9,
            isButton: false,
            appendTo: 'root',
            html: undefined,
            onInit(el, pswp) {
                pswp.on('change', () => {
                    if (pswp.currSlide!.data.alt == null) {
                        return
                    }
                    el.innerHTML = `<div>${pswp.currSlide!.data.alt}</div>`
                })
            },
        })
    })
}

export default function PhotoswipeInstance() {
    if (!lightbox) {
        lightbox = new PhotoSwipeLightbox({
            pswpModule: () => import('photoswipe'),
            wheelToZoom: true,
        })
        uiRegister(lightbox)
        lightbox.init()
    }
    return lightbox
}
