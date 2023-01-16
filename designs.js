// Select color input
const color = document.getElementById("colorPicker");
const colorPx = document.getElementById("colorPickerPx");
// Select size input
const UNDO = document.getElementById("undo");
const REDO = document.getElementById("redo");
const HEIGHT = document.getElementById("inputHeight");
const WIDTH = document.getElementById("inputWidth");
let Height = +HEIGHT.value
let Width = +WIDTH.value
const lastColorsArr = []
const LastColorsGrid = document.getElementById("lastColors");
LastColorsGrid.addEventListener('click', changeColor);
let GridColorsArray = []
let GridChangeTrackerArr = []
let GridState = 0
const myGrid = document.getElementById("pixelCanvas");
const style = document.querySelector(":root").style
const form = document.getElementById("sizePicker")
form.addEventListener("submit", handleForm);
myGrid.addEventListener('click', respondToTheClick);
UNDO.addEventListener('click', () => {
    GridState--
    ButtonsState()
    GridColorsArray = [...GridChangeTrackerArr[GridState]];
    makeGrid()

})
REDO.addEventListener('click', () => {
    GridState++
    ButtonsState()
    GridColorsArray = [...GridChangeTrackerArr[GridState]];
    makeGrid()
})
function handleForm(event) {
    event.preventDefault();
    GridState = 0
    Height = +HEIGHT.value
    Width = +WIDTH.value
    GridChangeTrackerArr = []
    GridColorsArray = Array(Height * Width).fill('#FFFFFF')

    makeGrid();
    GridChangeTrackerArr[0] = [...GridColorsArray]
    ButtonsState()

}

function makeGrid() {
    let i = 0
    myGrid.innerHTML = ''
    for (let row = 1; row <= Height; row++) {
        const ROW = document.createElement('tr');
        for (let col = 1; col <= Width; col++) {
            const CEL = document.createElement('td');
            CEL.setAttribute('color', GridColorsArray[i])
            CEL.setAttribute('i', i);
            CEL.style.backgroundColor = GridColorsArray[i]

            ROW.appendChild(CEL)
            i++;
        }
        myGrid.appendChild(ROW)
    }
}

color.addEventListener('change', () => {
    if (lastColorsArr.length >= 8)
        lastColorsArr.shift();
    lastColorsArr.push(color.value)
    let grid = "";
    grid += "<tr>";
    for (let i = 0; i < lastColorsArr.length; i++) {
        grid += `<td style="background-color:${lastColorsArr[i]}" id="${lastColorsArr[i]}" ></td>`;
    }
    grid += "</tr>";
    LastColorsGrid.innerHTML = grid;
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
}
let showLines = true;


function respondToTheClick(evt) {
    if (pickerActive) {
        color.value = evt.target.attributes.color.value
        deActivePicker()
    }
    else {
        evt.target.style.backgroundColor = color.value;
        evt.target.setAttribute('color', color.value);
        GridColorsArray[+evt.target.attributes.i.value] = color.value
        if (GridChangeTrackerArr.length >= 20)
            GridChangeTrackerArr.shift();
        else
            GridState++
        if (GridChangeTrackerArr.length - 1 > GridState) {
            GridChangeTrackerArr = GridChangeTrackerArr.slice(0, GridState);
        }
        GridChangeTrackerArr[GridState] = [...GridColorsArray]
        ButtonsState()
    }
}
const ButtonsState = () => {
    UNDO.disabled = (GridState > 0) ? false : true;
    REDO.disabled = (GridChangeTrackerArr.length - 1 > GridState) ? false : true;
}