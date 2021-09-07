// Select color input
var color = document.getElementById("colorPicker");
// Select size input
var Height = document.getElementById("inputHeight");
var Width = document.getElementById("inputWidth");

// When size is submitted by the user, call makeGrid()
var myGrid = document.getElementById("pixelCanvas");

var form = document.getElementById("sizePicker")
form.addEventListener("submit", handleForm);


function handleForm(event) {
    makeGrid();
    event.preventDefault();
}

function makeGrid() {
    // Your code goes here!
    var grid = "";
    for (var row = 1; row <= Height.value; row++) {
        grid += "<tr>";
        for (var col = 1; col <= Width.value; col++) {
            grid += "<td></td>";
        }
        grid += "</tr>";
    }
    myGrid.innerHTML = grid;
    myGrid.addEventListener('click', respondToTheClick);

    function respondToTheClick(evt) {
        evt.target.style.backgroundColor = color.value; // استدعيت قيمةاللون بالفانكشن لما جيت برسم
    }
}