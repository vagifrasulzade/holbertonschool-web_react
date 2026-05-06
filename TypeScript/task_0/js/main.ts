interface Student {
  firstName: string;
  lastName: string;
  age: number;
  location: string;
}

const student1: Student = {
  firstName: "John",
  lastName: "Doe",
  age: 20,
  location: "New York"
};

const student2: Student = {
  firstName: "Jane",
  lastName: "Smith",
  age: 22,
  location: "London"
};

const studentsList: Student[] = [student1, student2];

const table = document.createElement('table');
const tableHeader = document.createElement('thead');
const headerRow = document.createElement('tr');

const th1 = document.createElement('th');
th1.textContent = 'First Name';
const th2 = document.createElement('th');
th2.textContent = 'Location';

headerRow.appendChild(th1);
headerRow.appendChild(th2);
tableHeader.appendChild(headerRow);
table.appendChild(tableHeader);

const tableBody = document.createElement('tbody');

studentsList.forEach((student) => {
  const row = document.createElement('tr');
  
  const firstNameCell = document.createElement('td');
  firstNameCell.textContent = student.firstName;
  
  const locationCell = document.createElement('td');
  locationCell.textContent = student.location;
  
  row.appendChild(firstNameCell);
  row.appendChild(locationCell);
  
  tableBody.appendChild(row);
});

table.appendChild(tableBody);
document.body.appendChild(table);
