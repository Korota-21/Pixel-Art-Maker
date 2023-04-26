const color: HTMLInputElement = <HTMLInputElement>document.getElementById("colorPicker");
// color.value = "#28867f"
const colorPx: HTMLImageElement = <HTMLImageElement>document.getElementById("colorPickerPx");
const myGrid: HTMLElement = document.getElementById("pixelCanvas")!;
const BODY: HTMLElement = document.querySelector('body')!;
const UNDO: HTMLButtonElement = <HTMLButtonElement>document.getElementById("undo");
const REDO: HTMLButtonElement = <HTMLButtonElement>document.getElementById("redo");
const HEIGHT: HTMLInputElement = <HTMLInputElement>document.getElementById("inputHeight");
const WIDTH: HTMLInputElement = <HTMLInputElement>document.getElementById("inputWidth")!;
const LastColorsGridTable: HTMLTableElement = <HTMLTableElement>document.getElementById("lastColors")!;
const form: HTMLFormElement = <HTMLFormElement>document.getElementById("sizePicker")


let lastColorsArr: string[] = []
let GridColorsArray: string[] = []
let GridChangeTrackerArr: GridChangeTrackerInterface[] = []
let pickerActive = false
let Height = +HEIGHT.value
let Width = +WIDTH.value
let GridState: number
const DefultColor = '#00000000' //tramsparent black
let getGridData = localStorage.getItem("Grid");
if (getGridData) {
    remember()
}
interface gridDataI {
    Grid: string[]
    Height: number,
    Width: number,
    GridChangeTrackerArr: GridChangeTrackerInterface[],
    GridState: number,
    lastColorsArr: string[],
    color: string
}
function storeGrid() {
    const gridData: gridDataI = {
        Grid: GridColorsArray,
        Height: Height,
        Width: Width,
        GridChangeTrackerArr,
        GridState,
        lastColorsArr,
        color: color.value
    }
    try {
        localStorage.setItem("Grid", JSON.stringify(gridData));
        console.log('save');
    } catch (error) {
        console.log(error);
    }
}

function remember() {
    const gridData: gridDataI = JSON.parse(getGridData!)
    console.log(gridData);
    GridColorsArray = gridData.Grid
    GridState = 0;
    color.value = gridData.color
    GridState = gridData.GridState
    Height = gridData.Height
    Width = gridData.Width
    GridChangeTrackerArr = gridData.GridChangeTrackerArr;
    lastColorsArr = gridData.lastColorsArr
    updateGrid();
    LastColorsGridTableUpdate()
    ButtonsState();

}
function LastColorsGridTableUpdate() {
    let grid = "";
    grid += "<tr>";
    for (let i = 0; i < lastColorsArr.length; i++) {
        grid += `<td style="background-color:${lastColorsArr[i]}" id="${lastColorsArr[i]}" ></td>`;
    }
    grid += "</tr>";
    LastColorsGridTable.innerHTML = grid;
}
BODY.addEventListener('mousedown', () => {
    BODY.addEventListener('mousemove', draw)
})
BODY.addEventListener('mouseup', () => {
    BODY.removeEventListener('mousemove', draw)
})

BODY.addEventListener('touchstart', () => {
    BODY.addEventListener('touchmove', draw)
})
BODY.addEventListener('touchend', () => {
    BODY.removeEventListener('touchmove', draw)
})
function changeColor(evt: any) {
    color.value = evt.target.id;
}
myGrid.addEventListener('click', draw);
LastColorsGridTable.addEventListener('click', changeColor);

form.addEventListener("submit", handleForm);

function handleForm(event: SubmitEvent) {
    event.preventDefault();
    GridState = 0
    Height = +HEIGHT.value
    Width = +WIDTH.value
    GridChangeTrackerArr = []
    resultDiv.innerHTML = ''
    GridColorsArray = Array(Height * Width).fill(DefultColor)

    updateGrid();
    ButtonsState()

}

function updateGrid() {
    let i: number = 0
    myGrid.innerHTML = ''
    for (let row = 1; row <= Height; row++) {
        const ROW = document.createElement('tr');
        for (let col = 1; col <= Width; col++) {
            const CEL = document.createElement('td');
            CEL.setAttribute('color', GridColorsArray[i])
            CEL.setAttribute('i', `${i}`);
            CEL.style.backgroundColor = GridColorsArray[i]

            ROW.appendChild(CEL)
            i++;
        }
        myGrid.appendChild(ROW)
    }
}
const deActivePicker = () => {
    colorPx.style.transform = 'rotate(0deg)';
    pickerActive = false
}
color.addEventListener('change', () => {
    if (lastColorsArr.length >= 8)
        lastColorsArr.shift();
    lastColorsArr.push(color.value)
    LastColorsGridTableUpdate();
    storeGrid()

})
colorPx.addEventListener('click', () => {
    if (!pickerActive) {
        colorPx.style.transform = 'rotate(-45deg)';
        pickerActive = true
    }
    else {
        deActivePicker()
    }
})

function ButtonsState() {
    UNDO.disabled = (GridState > 0) ? false : true;
    REDO.disabled = (GridChangeTrackerArr.length > GridState) ? false : true;
}

function draw(evt: MouseEvent | TouchEvent) {

    evt.preventDefault();
    const TARGET: HTMLTableCellElement = <HTMLTableCellElement>evt.target
    if (TARGET.tagName !== 'TD')
        return
    if (pickerActive)
        // @ts-ignore
        return pickColor(TARGET.attributes.color.value);


    // @ts-ignore
    const CEL_ID = +TARGET.attributes.i.value
    if (GridColorsArray[CEL_ID] == color.value) return;
    AddRecord(CEL_ID, GridColorsArray[CEL_ID], color.value)
    // @ts-ignore
    TARGET.style.backgroundColor = color.value;
    TARGET.setAttribute('color', color.value);
    GridColorsArray[CEL_ID] = color.value

    storeGrid()
    if (GridChangeTrackerArr.length - 1 > GridState)
        GridChangeTrackerArr.splice(GridState + 1, GridChangeTrackerArr.length - GridState + 1)

    if (GridChangeTrackerArr.length >= 20)
        return GridChangeTrackerArr.shift();

    GridState++
    ButtonsState()
}
const AddRecord = (index: number, preColor: string, curColor: string): void => {
    GridChangeTrackerArr.push({
        preColor: preColor,
        curColor: curColor,
        index: index
    })
}
const RedoFun = () => {
    let changedCell = GridChangeTrackerArr[GridState];
    GridColorsArray[changedCell.index] = changedCell.curColor
    GridState++
    update();
}
const UndoFun = () => {
    let changedCell = GridChangeTrackerArr[GridState - 1];
    GridColorsArray[changedCell.index] = changedCell.preColor
    GridState--
    update();
}
UNDO.addEventListener('click', UndoFun)
UNDO.addEventListener('accesskey', UndoFun)
REDO.addEventListener('click', RedoFun)
REDO.addEventListener('accesskey', RedoFun)
const update = () => {
    ButtonsState()
    updateGrid()
    storeGrid()
}
function pickColor(pcolor: string) {
    color.value = pcolor;
    return deActivePicker();
}

interface GridChangeTrackerInterface {
    index: number,
    curColor: string
    preColor: string
}