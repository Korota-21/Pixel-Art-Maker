function convertToImage() {
    let resultDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("result");
    if (myGrid.innerHTML == '') { 
        resultDiv.innerHTML = 'there are no drawing'; 
        return 
    }
    // @ts-ignore
    html2canvas(myGrid, {
        onrendered: function (canvas: any) {
            resultDiv.innerHTML = ''
            const img = canvas.toDataURL("image/png");
            const imgElm = document.createElement('img');
            imgElm.src = img
            resultDiv.appendChild(imgElm)
            resultDiv.innerHTML += '<br><a download="myImage.jpeg" href="' + img + '" class="button"><button>Click me !</button></a>';
        }
    }
    );
}