const toggleLinesBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("toggleLinesBtn")
let showLines = true;
// @ts-ignore
const style: any = document.querySelector(":root")!.style

toggleLinesBtn.addEventListener('click', (evt) => {
    if (showLines) {        
        showLines = false
        style.setProperty("--border", "#00000000");
        toggleLinesBtn.innerHTML = "Show Pixels lines"
    } else {
        showLines = true
        style.setProperty("--border", " 1px solid black");
        toggleLinesBtn.innerHTML = "Hide Pixels lines"
    }
})
