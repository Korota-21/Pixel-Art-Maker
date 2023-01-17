const toggleLinesBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("toggleLinesBtn")
let showLines = true;
const style: any = document.querySelector(":root")!.style

toggleLinesBtn.addEventListener('click', (evt) => {
    if (showLines) {
        console.log(55);
        
        showLines = false
        style.setProperty("--border", "#000000");
        toggleLinesBtn.innerHTML = "Show Pixels lines"
    } else {
        showLines = true
        style.setProperty("--border", " 1px solid black");
        toggleLinesBtn.innerHTML = "Hide Pixels lines"
    }
})
