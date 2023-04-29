const referenceImg: HTMLImageElement = <HTMLImageElement>document.getElementById("referenceImg")
const file: HTMLInputElement = <HTMLInputElement>document.getElementById("file")

const windowHeight = $(window).height()!
const windowWidth = $(window).width()!

function handleFile(evt: any) {
    if (evt.files && evt.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e: any) {
            $('#referenceImg').attr('src', e.target.result)
            referenceImg.height = 110
        };
        reader.readAsDataURL(evt.files[0]);
    }
}
function resize() {
    if (referenceImg.style.position == 'relative') {

        referenceImg.style.position = 'absolute'
        referenceImg.height = 500
        const imgWidth = referenceImg.width
        let centerPoint = (windowWidth / 2) - (imgWidth / 2)

        if (windowWidth < imgWidth) {
            const dif = imgWidth - windowWidth
            centerPoint = -dif
        }
        referenceImg.style.right = centerPoint + 'px'
        console.log(centerPoint);
    } else {
        referenceImg.style.position = "relative"
        referenceImg.height = 110
        referenceImg.style.right = '0'
    }
}