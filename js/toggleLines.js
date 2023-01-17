const toggleLinesBtn = document.getElementById("toggleLinesBtn")
const style = document.querySelector(":root").style

toggleLinesBtn.addEventListener('click', (evt) => {
    if (showLines) {
        showLines = false
        style.setProperty("--border", "#000000");
        toggleLinesBtn.innerHTML = "Show Pixels lines"
    } else {
        showLines = true
        style.setProperty("--border", " 1px solid black");
        toggleLinesBtn.innerHTML = "Hide Pixels lines"
    }
})