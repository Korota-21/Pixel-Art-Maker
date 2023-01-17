function convertToImage() {
    let resultDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("result");
    // @ts-ignore
    html2canvas(myGrid, {
        onrendered: function (canvas: any) {
            var img = canvas.toDataURL("image/png");
            resultDiv.innerHTML = '<a download="myImage.jpeg" href="' + img + '">تحميل</a>';
            resultDiv.innerHTML += '<img src="' + img + '"/>';
        }
    }
    );
}