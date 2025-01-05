const expensesModal = document.getElementById("expenses-modal")


let months = {
    january: {
        spent: 120,
        gained: 300,
    },
    february: {
        spent: 250,
        gained: 450,
    },
    march: {
        spent: 400,
        gained: 500,
    },
    april: {
        spent: 350,
        gained: 600,
    },
    may: {
        spent: 500,
        gained: 700,
    },
    june: {
        spent: 200,
        gained: 400,
    },
    july: {
        spent: 450,
        gained: 550,
    },
    august: {
        spent: 300,
        gained: 500,
    },
    september: {
        spent: 600,
        gained: 750,
    },
    october: {
        spent: 550,
        gained: 650,
    },
    november: {
        spent: 400,
        gained: 800,
    },
    december: {
        spent: 700,
        gained: 900,
    },
};


function closeExpensesModal(){
    expensesModal.classList.remove("modal-active")
}
function openExpensesModal(month, type){
    const modalTitle = document.getElementById("modal-title")
    modalTitle.innerHTML = `Editing ${type} for ${month}`;

    expensesModal.classList.add("modal-active")
    monthToChange = month
    typeToChange = type
    console.log(monthToChange)
    console.log(typeToChange)
}


function addAmount(){
    const inputValue = document.getElementById("amount")
    let value = parseFloat(inputValue.value, 10)
    if (isNaN(value)){
        console.log("Input was not a number")
    }else{
        months[monthToChange][typeToChange] += value
        closeExpensesModal()
        renderMonths(months)
        inputValue.value = ""
    }

}

function removeAmount(){
    const inputValue = document.getElementById("amount")
    let value = parseFloat(inputValue.value, 10)
    if (isNaN(value)){
        console.log("Input was not a number")
    }else{
        months[monthToChange][typeToChange] -= value
        if (months[monthToChange][typeToChange] < 0){
            months[monthToChange][typeToChange] = 0
        }
        closeExpensesModal()
        renderMonths(months)
        inputValue.value = ""
    }

}


function getTotalSpent(data) {
    const spentLabel = document.getElementById("spent-label") 
    let totalSpent = 0
    for (let month in data) {
        const monthData = data[month];
        totalSpent += monthData.spent
    }
    spentLabel.innerHTML = `Spent: <strong>${totalSpent} €</strong>`
    return totalSpent
}


function getTotalGained(data) {
    const gainedLabel = document.getElementById("gained-label") 
    let totalGained = 0
    for (let month in data) {
        const monthData = data[month];
        totalGained += monthData.gained
    }
    gainedLabel.innerHTML = `Gained: <strong>${totalGained} €</strong>`
    return totalGained
}

function getTotalForAll(data){
    const totalLabel = document.getElementById("total-label") 
    let totalResult = getTotalGained(data) - getTotalSpent(data)
    totalLabel.innerHTML = `Total: <strong>${totalResult} €</strong>`
    return totalResult
}




function renderMonths(data) {
    const mainContainer = document.getElementById("main-container")
    mainContainer.innerHTML = ""

    for (let month in data) {
        const monthData = data[month];

        const expenseCont = document.createElement('div');
        expenseCont.className = 'expense-cont';

        const title = document.createElement('h2');
        title.className = 'title';
        title.textContent = month.charAt(0).toUpperCase() + month.slice(1); // Capitalize the month name
        expenseCont.appendChild(title);

        // Add the "Spent" label
        const spentLabel = document.createElement('label');
        spentLabel.textContent = `Spent: ${monthData.spent}`;
        expenseCont.appendChild(spentLabel);

        // Add the "Gained" label
        const gainedLabel = document.createElement('label');
        gainedLabel.textContent = `Gained: ${monthData.gained}`;
        expenseCont.appendChild(gainedLabel);

        // Create the buttons container
        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'buttons';

        // Add "Edit Spent" button
        const editSpentBtn = document.createElement('button');
        editSpentBtn.textContent = 'Edit spent';
        editSpentBtn.addEventListener('click', () =>{
            openExpensesModal(month, 'spent')
        })
        buttonsDiv.appendChild(editSpentBtn);

        // Add "Edit Gained" button
        const editGainedBtn = document.createElement('button');
        editGainedBtn.textContent = 'Edit gained';
        editGainedBtn.addEventListener('click', () =>{
            openExpensesModal(month, 'gained')
        })
        buttonsDiv.appendChild(editGainedBtn);

        expenseCont.appendChild(buttonsDiv);
        mainContainer.appendChild(expenseCont);
    }
    getTotalSpent(data)
    getTotalGained(data)
    getTotalForAll(data)
}





document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.getElementById("main-container")
    const expenseContainers = document.querySelectorAll(".expense-cont")
    renderMonths(months)

});















