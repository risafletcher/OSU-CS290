const createButton = (label, handler) => {
    const body = document.getElementsByTagName('body')[0];
    const button = document.createElement('button');
    button.textContent = label;
    button.addEventListener('click', handler);
    body.appendChild(button);
}

function createTable() {
    const body = document.getElementsByTagName('body')[0];
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
        const row = document.createElement('tr');
        row.id = rowIndex;
        for (let columnIndex = 1; columnIndex < 5; columnIndex++) {
            if (rowIndex === 0) {
                const cell = document.createElement('th');
                cell.style.border = '1px solid black';
                cell.textContent = `Header ${columnIndex}`;
                cell.id = `header${columnIndex}`;
                row.appendChild(cell);
            } else {
                const cell = document.createElement('td');
                cell.style.border = '1px solid black';
                cell.textContent = `${rowIndex}, ${columnIndex}`;
                if (columnIndex === 1 && rowIndex === 1) {
                    cell.style.border = '3px solid black';
                    cell.className = 'selected';
                }
                cell.id = `row${rowIndex}col${columnIndex}`;
                row.appendChild(cell);
            }
        }
        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    body.appendChild(table);
    table.style.border = '1px solid black';
}

const changeDirection = (direction) => () => {
    const selectedCell = document.getElementsByClassName('selected')[0];
    const parentRow = selectedCell.parentNode;
    const columnIndex = Array.prototype.indexOf.call(parentRow.children, selectedCell);
    let newRowIndex = parentRow.id;
    let newColumnIndex = columnIndex + 1;
    switch (direction) {
        case 'up':
            newRowIndex > 0 && newRowIndex--;
            break;
        case 'down':
            newRowIndex < 4 && newRowIndex++;
            break;
        case 'left':
            newColumnIndex !== 1 && newColumnIndex--;
            break;
        case 'right':
            newColumnIndex !== 4 && newColumnIndex++;
            break;
        default:
            break;
    }
    if (newRowIndex !== 0 && newRowIndex !== 4 && newColumnIndex !== 0 && newColumnIndex !== 5) {
        selectedCell.removeAttribute('class');
        selectedCell.style.border = '1px solid black';
        const newCell = document.getElementById(`row${newRowIndex}col${newColumnIndex}`);
        newCell.className = 'selected';
        newCell.style.border = '3px solid black';
    }
}

(function () {
    createTable();
    createButton('Up', changeDirection('up'));
    createButton('Down', changeDirection('down'));
    createButton('Left', changeDirection('left'));
    createButton('Right', changeDirection('right'));
    createButton('Mark Cell', () => {
        const selectedCell = document.getElementsByClassName('selected')[0];
        selectedCell.style.backgroundColor = 'yellow';
    });
})();