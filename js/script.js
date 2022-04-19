// CREATE AN ARRAY OF EMPLOYEES

let employeeList = [
    [11111111, 'Marty Manager', 1111, 'marty@email.com', 'Executive'],
    [22222222, 'Sally Sales', 2222, 'sally@email.com', 'Sales'],
    [33333333, 'Adam Admin', 3333, 'adam@email.com', 'Administrative'],
    [44444444, 'Dave Developer', 4444, 'dave@email.com', 'Engineering'],
    [55555555, 'Quinn QA', 5555, 'quinn@email.com', 'QA'],
];

// CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
// IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED ARRAY

window.addEventListener('load', init);

function init() {
    employeeList = JSON.parse(localStorage.getItem('employees')) || employeeList;

// GET DOM ELEMENTS

    let form = document.getElementById('addForm');
    let empTable = document.getElementById('employees');

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS

    buildGrid();

// ADD EMPLOYEE
    form.addEventListener('submit', (e) => {
    // PREVENT FORM SUBMISSION

        e.preventDefault();

    // GET THE VALUES FROM THE TEXT BOXES

        let newId = document.querySelector('#id').value;
        let newName = document.querySelector('#name').value;
        let newExtension = document.querySelector('#extension').value;
        let newEmail = document.querySelector('#email').value;
        let newDepartment = document.querySelector('#department').value;

    // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT

        let newEmployee = [newId, newName, newExtension, newEmail, newDepartment];

    // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY

        employeeList.push(newEmployee);

    // BUILD THE GRID

        buildGrid();

    // RESET THE FORM

        document.querySelector('#id').value = '';
        document.querySelector('#name').value = '';
        document.querySelector('#extension').value = '';
        document.querySelector('#email').value = '';
        document.querySelector('#department').value = '';

    // SET FOCUS BACK TO THE ID TEXT BOX

        document.querySelector('#id').focus();
    });

// DELETE EMPLOYEE
    empTable.addEventListener('click', (e) => {

    // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)

        let targetRow = e.target.parentElement;
        let deleteName = targetRow.children[1].innerText;
        let rowIndex = targetRow.rowIndex;  

    // CONFIRM THE DELETE
  
        if (rowIndex > 0 && confirm(`Are you sure you want to delete ${deleteName}?`)) {

        // CALL DELETEROW() METHOD TO DELETE SPECIFIC ROW IN THE TABLE

            empTable.deleteRow(rowIndex);

        // REMOVE EMPLOYEE FROM ARRAY

            employeeList.splice(rowIndex - 1, 1)

        // BUILD THE GRID

            buildGrid();
        }
    });

// BUILD THE EMPLOYEES GRID
    function buildGrid() {
    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION

        empTable.removeChild(empTable.children[1]);

    // REBUILD THE TBODY FROM SCRATCH

        let tableBody = document.createElement('tbody');

    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    // REBUILDING THE ROW STRUCTURE

        let row, cellId, cellName, cellExtension, cellEmail, cellDepartment;
        for (let employee of employeeList) {
            row = document.createElement('tr');
            cellId = `<td>${employee[0]}</td>`;
            cellName = `<td>${employee[1]}</td>`;
            cellExtension = `<td>${employee[2]}</td>`;
            cellEmail = `<td>${employee[3]}</td>`;
            cellDepartment = `<td>${employee[4]}</td>`;
            row.innerHTML = `${cellId}${cellName}${cellExtension}${cellEmail}${cellDepartment}`
            tableBody.appendChild(row);
        }

    // BIND THE TBODY TO THE EMPLOYEE TABLE

        empTable.appendChild(tableBody);

    // UPDATE EMPLOYEE COUNT

        document.getElementById('empCount').innerText = employeeList.length;

    // STORE THE ARRAY IN STORAGE

        localStorage.setItem('employees', JSON.stringify(employeeList));
    }
};