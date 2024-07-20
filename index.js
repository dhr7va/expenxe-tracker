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

    let expenses = localStorage.getItem('expenses');
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

    expenses.forEach(expense => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `${expense.description} - Rs${expense.amount} <span class="badge badge-secondary">${expense.category}</span>`;
        expenseList.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', displayExpenses);
