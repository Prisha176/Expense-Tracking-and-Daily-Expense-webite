let totalExpenses = 0;
let membersList = [];


document.getElementById('addMemberBtn').addEventListener('click', function() {
   
    document.getElementById('memberName').value = '';
    document.getElementById('memberContact').value = '';
    
    document.getElementById('memberPopup').style.display = 'flex';
});


document.getElementById('addExpenseBtn').addEventListener('click', function() {
    
    document.getElementById('expenseAmount').value = '';
    
    document.getElementById('expensePopup').style.display = 'flex';
});


document.getElementById('splitExpenseBtn').addEventListener('click', function() {
    if (membersList.length === 0) {
        alert('No members available to split the expenses.');
        return;
    }

    if (totalExpenses === 0) {
        alert('No expenses to split.');
        return;
    }

    const perPersonExpense = totalExpenses / membersList.length;

    let splitDetails = '<ul>';
    membersList.forEach(member => {
        splitDetails += `<li>${member.name}: ₹${perPersonExpense.toFixed(2)}</li>`;
    });
    splitDetails += '</ul>';


    document.getElementById('splitDetails').innerHTML = splitDetails;

    
    document.getElementById('splitPopup').style.display = 'flex';
});


function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}


document.getElementById('saveMemberBtn').addEventListener('click', function() {
    const name = document.getElementById('memberName').value.trim();
    const contact = document.getElementById('memberContact').value.trim();

    if (name && contact) {
        const listItem = document.createElement('li');
        listItem.textContent = `Name: ${name}, Contact: ${contact}`;
        document.getElementById('members').appendChild(listItem);

     
        membersList.push({ name: name, contact: contact });

        closePopup('memberPopup');
    } else {
        alert('Please enter both name and contact.');
    }
});


document.getElementById('saveExpenseBtn').addEventListener('click', function() {
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    
    if (amount && amount > 0) {
        totalExpenses += amount;

        const listItem = document.createElement('li');
        listItem.textContent = `Amount: ₹${amount.toFixed(2)}`;
        document.getElementById('expenses').appendChild(listItem);
        closePopup('expensePopup');
    } else {
        alert('Please enter a valid amount.');
    }
});
