"use strict";
function convertToImage() {
    let resultDiv = document.getElementById("result");
    // @ts-ignore
    html2canvas(myGrid, {
        onrendered: function (canvas) {
            var img = canvas.toDataURL("image/png");
            resultDiv.innerHTML = '<a download="myImage.jpeg" href="' + img + '">تحميل</a>';
            resultDiv.innerHTML += '<img src="' + img + '"/>';
        }
    });
}
