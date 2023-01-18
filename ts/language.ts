var userLang = navigator.language;
console.log("The language is: " + userLang);

let labels: Ilabels = <Ilabels>document.getElementsByClassName("lang");
console.log(labels);

const langWords = {
    en: {
        secondaryTitle: 'Grid Size:',
        inputHeightLabel: 'Grid Height:',
        inputWidthLabel: 'Grid Width:',
        submitBtn: 'submit',
        toggleLinesBtn: 'Hide Pixels lines',
        CanvasTitle: "Design Canvas",
        GenerateBtn: "Generate Picture",
        downloadBtn: "Download Picture",
    },
    ar: {
        secondaryTitle: 'حجم اللوحة',
        inputHeightLabel: 'طول اللوحة:',
        inputWidthLabel: 'عرض اللوحة:',
        submitBtn: 'تم',
        toggleLinesBtn: 'اخفاء الخطوط',
        CanvasTitle: "تصميم اللوحة",
        GenerateBtn: "انتاج صورة",
        downloadBtn: "تحميل الصورة",
    },
}

let worder = langWords.en
if (userLang.includes('en')) {
    worder = langWords.en
    BODY.setAttribute('dir', 'ltr')
    BODY.setAttribute('lang', 'en')
} else if (userLang.includes('ar')) {
    worder = langWords.ar
    BODY.setAttribute('dir', 'rtl')
    BODY.setAttribute('lang', 'ar')
}
labels.secondaryTitleLabel.innerText = worder.secondaryTitle
labels.inputHeightLabel.innerText = worder.inputHeightLabel
labels.inputWidthLabel.innerText = worder.secondaryTitle
labels.submitBtn.value = worder.submitBtn
labels.toggleLinesBtn.innerText = worder.toggleLinesBtn
labels.CanvasTitle.innerText = worder.CanvasTitle
labels.GenerateBtn.innerText = worder.GenerateBtn

interface Ilabels extends HTMLCollection {
    secondaryTitleLabel: HTMLLabelElement,
    inputHeightLabel: HTMLLabelElement,
    inputWidthLabel: HTMLLabelElement
    submitBtn: HTMLInputElement,
    toggleLinesBtn: HTMLButtonElement,
    CanvasTitle: HTMLHeadingElement,
    GenerateBtn: HTMLButtonElement,
}