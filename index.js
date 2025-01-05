document.getElementById('expense-form').addEventListener('submit', addExpense);

function addExpense(e) {
    e.preventDefault();

    const amount = document.getElementById('expense').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;

    const expense = {
        amount,
        description,
        category
    };

    let expenses = localStorage.getItem('expensex');
    expenses = expenses ? JSON.parse(expenses) : [];

    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));

    document.getElementById('expense-form').reset();
    displayExpenses();
}

function displayExpenses() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = '';

    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `${expense.description} - Rs${expense.amount} <span class="badge badge-secondary">${expense.category}</span>
        <button class="btn btn-sm btn-warning float-right ml-2" onclick="editExpense(${index})">Edit</button>
        <button class="btn btn-sm btn-danger float-right" onclick="deleteExpense(${index})">Delete</button>`;
        expenseList.appendChild(li);
    });
}

function deleteExpense(index) {
    let expenses = JSON.parse(localStorage.getItem('expenses'));
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
}

function editExpense(index) {
    let expenses = JSON.parse(localStorage.getItem('expenses'));
    const expense = expenses[index];
    document.getElementById('expense').value = expense.amount;
    document.getElementById('description').value = expense.description;
    document.getElementById('category').value = expense.category;

    deleteExpense(index);
}

document.addEventListener('DOMContentLoaded', displayExpenses);