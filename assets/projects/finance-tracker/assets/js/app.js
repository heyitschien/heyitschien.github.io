let transactions = [];

function addTransaction() {
    const type = document.querySelector('input[name="type"]:checked').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;

    if (!type || !amount || !category || !description || !date) {
        alert("Please fill in all fields.");
        return;
    }

    const transaction = {
        type,
        amount,
        category,
        description,
        date
    };

    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions)); // Save to local storage
    updateTransactionTable(); // Function to update the displayed transactions
    updateDashboard(); // Function to update the dashboard metrics
    const toast = new bootstrap.Toast(document.getElementById('transactionToast'));
    toast.show();
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('addTransactionModal'));
    modal.hide();
    document.getElementById('transactionForm').reset();
}

// Function to update the transaction table
function updateTransactionTable() {
    const tbody = document.querySelector('#transactions tbody');
    tbody.innerHTML = ''; // Clear existing rows
    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.date}</td>
            <td>${transaction.description}</td>
            <td>${transaction.category}</td>
            <td class="${transaction.type === 'expense' ? 'text-danger' : 'text-success'}">
                ${transaction.type === 'expense' ? '-' : '+'}$${Math.abs(transaction.amount).toFixed(2)}
            </td>
            <td><span class="badge ${transaction.type === 'expense' ? 'bg-danger' : 'bg-success'}">${transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</span></td>
        `;
        tbody.appendChild(row);
    });
}