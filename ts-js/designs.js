"use strict";
// Select color input
const color = document.getElementById("colorPicker");
const colorPx = document.getElementById("colorPickerPx");
const myGrid = document.getElementById("pixelCanvas");
const BODY = document.querySelector('body');
const UNDO = document.getElementById("undo");
const REDO = document.getElementById("redo");
const HEIGHT = document.getElementById("inputHeight");
const WIDTH = document.getElementById("inputWidth");
BODY.addEventListener('mousedown', (ev) => {
    BODY.addEventListener('mousemove', respondToTheClick);
});
BODY.addEventListener('mouseup', (ev) => {
    BODY.removeEventListener('mousemove', respondToTheClick);
});
function changeColor(evt) {
    color.value = evt.target.id;
}
let pickerActive = false;
myGrid.addEventListener('click', respondToTheClick);
let Height = +HEIGHT.value;
let Width = +WIDTH.value;
const lastColorsArr = [];
const LastColorsGridTable = document.getElementById("lastColors");
LastColorsGridTable.addEventListener('click', changeColor);
let GridColorsArray = [];
let GridChangeTrackerArr = [];
let GridState = 0;
const form = document.getElementById("sizePicker");
form.addEventListener("submit", handleForm);
UNDO.addEventListener('click', () => {
    GridState--;
    ButtonsState();
    GridColorsArray = [...GridChangeTrackerArr[GridState]];
    makeGrid();
});
REDO.addEventListener('click', () => {
    GridState++;
    ButtonsState();
    GridColorsArray = [...GridChangeTrackerArr[GridState]];
    makeGrid();
});
function handleForm(event) {
    event.preventDefault();
    GridState = 0;
    Height = +HEIGHT.value;
    Width = +WIDTH.value;
    GridChangeTrackerArr = [];
    GridColorsArray = Array(Height * Width).fill('#FFFFFF');
    makeGrid();
    GridChangeTrackerArr[0] = [...GridColorsArray];
    ButtonsState();
}
function makeGrid() {
    let i = 0;
    myGrid.innerHTML = '';
    for (let row = 1; row <= Height; row++) {
        const ROW = document.createElement('tr');
        for (let col = 1; col <= Width; col++) {
            const CEL = document.createElement('td');
            CEL.setAttribute('color', GridColorsArray[i]);
            CEL.setAttribute('i', `${i}`);
            CEL.style.backgroundColor = GridColorsArray[i];
            ROW.appendChild(CEL);
            i++;
        }
        myGrid.appendChild(ROW);
    }
}
const deActivePicker = () => {
    colorPx.style.transform = 'rotate(0deg)';
    pickerActive = false;
};
color.addEventListener('change', () => {
    if (lastColorsArr.length >= 8)
        lastColorsArr.shift();
    lastColorsArr.push(color.value);
    let grid = "";
    grid += "<tr>";
    for (let i = 0; i < lastColorsArr.length; i++) {
        grid += `<td style="background-color:${lastColorsArr[i]}" id="${lastColorsArr[i]}" ></td>`;
    }
    grid += "</tr>";
    LastColorsGridTable.innerHTML = grid;
});
colorPx.addEventListener('click', () => {
    if (!pickerActive) {
        colorPx.style.transform = 'rotate(-45deg)';
        pickerActive = true;
    }
    else {
        deActivePicker();
    }
});
const ButtonsState = () => {
    UNDO.disabled = (GridState > 0) ? false : true;
    REDO.disabled = (GridChangeTrackerArr.length - 1 > GridState) ? false : true;
};
function respondToTheClick(evt) {
    const TARGET = evt.target;
    if (TARGET.tagName !== 'TD')
        return;
    console.log(TARGET.getAttributeNames());
    console.log(TARGET.attributes);
    console.log(TARGET);
    if (pickerActive) {
        color.value = TARGET.attributes.color.value;
        deActivePicker();
    }
    else {
        console.log(GridColorsArray);
        TARGET.style.backgroundColor = color.value;
        TARGET.setAttribute('color', color.value);
        if (GridColorsArray[+TARGET.attributes.i.value] == color.value)
            return;
        GridColorsArray[+TARGET.attributes.i.value] = color.value;
        if (GridChangeTrackerArr.length >= 20)
            GridChangeTrackerArr.shift();
        else
            GridState++;
        if (GridChangeTrackerArr.length - 1 > GridState) {
            GridChangeTrackerArr = GridChangeTrackerArr.slice(0, GridState);
        }
        if (GridState > 0 && !(GridChangeTrackerArr[GridState - 1] === GridColorsArray))
            GridChangeTrackerArr[GridState] = [...GridColorsArray];
        ButtonsState();
    }
}
