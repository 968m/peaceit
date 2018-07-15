function btnAddClick() {

    let taskTitle = document.getElementById("inputbox").value;
    if (taskTitle.length == 0) {
        // if nothing entered - do nothing
        alert("Are you really going to do empty things?");
        return false;
    }
    let taskTable = document.getElementById("taskTable");

    // find out the last existent row id
    // increment it
    // and use as row_id for the new row
    let rowID = parseInt(getMaxRowID()) + 1;
    let row = taskTable.insertRow();
    row.id = 'tsk_'+rowID;

    // inflating new row with cells: "delete" and "check" buttons, then Task title.
    let cell = row.insertCell(0);
    cell.setAttribute("class", "button btnDelete");
    // charCode 215 is multiplication "cross" symbol like letter x
    cell.innerHTML = `<div onClick=\"deleteRow(\'${row.id}\');\">${String.fromCharCode(215)}</div>`;
    cell = row.insertCell(1);
    cell.setAttribute("class", "button btnCheck");
    cell.innerHTML = `<div onClick=\"checkRow(\'${row.id}\');\">o</div>`;
    // we could have chosen a better symbol for "check" button, but this will be our TODO for future :)
    cell = row.insertCell(2);
    cell.innerHTML = taskTitle;

    // clearing input field and restoring the placeholder
    document.getElementById('inputform').reset();
};

function clearTable() {
    // clears TODO table instantly and completely
    let taskTable = document.getElementById("taskTable");
    while (taskTable.rows.length > 0) {
        taskTable.deleteRow(0);
    }
};

function deleteRow(rowID) {
    // deletes task row with given rowID
    let row = document.getElementById(rowID);
    row.parentNode.removeChild(row);
};

function checkRow(rowID) {
    // makes row checked or unchecked (done or undone)
    // by assigning CSS class "tskDone" to entire task row and to cell with task title
    // or removing this class
    let row = document.getElementById(rowID);
    if (row.classList.contains("tskDone")) {
            row.classList.remove("tskDone");
            row.cells[2].classList.remove("tskDone");
        }
        else
        {
            row.setAttribute("class", "tskDone");
            row.cells[2].setAttribute("class", "tskDone");
        };

};

function getMaxRowID() {
    // returns integer      <------- IMPORTANT
    // returns number of last task ID from taskTable
    // we are not retrieving just the last row tsk_ID for future development
    // because in future the task list could be sorted not by id, but
    // for example by priority, by deadline, by executor, etc.

    let rows = document.getElementsByTagName("tr");
    let maxID = 0;

    for (let i = 0; i < rows.length; i++) {
        // rowID id format is "tsk_NN", so to obtain NN we need to cut off "tsk_", e.g. first 4 symbols
        let tskID = rows[i].id.toString().slice(4);
        maxID = (tskID > maxID) ? tskID : maxID;
    };

    return maxID;
};