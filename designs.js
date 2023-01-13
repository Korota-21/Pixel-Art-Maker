// Select color input
const color = document.getElementById("colorPicker");
const colorPx = document.getElementById("colorPickerPx");
// Select size input
const Height = document.getElementById("inputHeight");
const Width = document.getElementById("inputWidth");
const lastColorsArr = []
const lastColorsGrid = document.getElementById("lastColors");
// When size is submitted by the user, call makeGrid()
const myGrid = document.getElementById("pixelCanvas");
const style = document.querySelector(":root").style
const toggleLinesBtn = document.getElementById("toggleLinesBtn")
const form = document.getElementById("sizePicker")
form.addEventListener("submit", handleForm);
function handleForm(event) {
    makeGrid();
    event.preventDefault();
}

color.addEventListener('change', () => {
    if (lastColorsArr.length >= 6)
        lastColorsArr.shift();
    lastColorsArr.push(color.value)
    console.log(lastColorsArr)
    let grid = "";
    grid += "<tr>";
    for (let i = 0; i < lastColorsArr.length; i++) {
        grid += `<td style="background-color:${lastColorsArr[i]}" id="${lastColorsArr[i]}" ></td>`;
    }
    grid += "</tr>";
    lastColorsGrid.innerHTML = grid;
    lastColorsGrid.removeEventListener('click', changeColor); // عشان مايتكرر
    lastColorsGrid.addEventListener('click', changeColor);
})
let pickerActive = false
colorPx.addEventListener('click', () => {
    if (!pickerActive) {
        colorPx.style.transform = 'rotate(-45deg)';
        pickerActive = true
    }
    else {
        deActivePicker()
    }

})
deActivePicker = () => {
    colorPx.style.transform = 'rotate(0deg)';
    pickerActive = false
}
function changeColor(evt) {
    color.value = evt.target.id;
    console.log(color.value);
}
let showLines = true;
toggleLinesBtn.addEventListener('click', (evt) => {
    if (showLines) {
        showLines = false
        style.setProperty("--border", "#0000");
        toggleLinesBtn.innerHTML = "Show Pixels lines"
    } else {
        showLines = true
        style.setProperty("--border", " 1px solid black");
        toggleLinesBtn.innerHTML = "Hide Pixels lines"
    }
})
function makeGrid() {
    let grid = "";
    for (let row = 1; row <= Height.value; row++) {
        grid += "<tr>";
        for (let col = 1; col <= Width.value; col++) {
            grid += "<td></td>";
        }
        grid += "</tr>";
    }
    myGrid.innerHTML = grid;
    myGrid.addEventListener('click', respondToTheClick);

    function respondToTheClick(evt) {
        if (pickerActive) {
            color.value = (evt.target.color) ? evt.target.color : '#FFFFFF'
            deActivePicker()
        }
        else {
            evt.target.style.backgroundColor = color.value;
            evt.target.color = color.value;
        }
    }
}