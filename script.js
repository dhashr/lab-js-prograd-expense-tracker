let balance = document.querySelector("#balance")
let money_plus = document.querySelector("#money-plus")
let money_minus = document.querySelector("#money-minus")
let form = document.querySelector("#form")
let list_his = document.querySelector("#list")
let text = document.querySelector("#text")
let amount = document.querySelector("#amount")


let localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let transactions =localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

function addTransaction(){
    if(text.value == "" || amount.value == ""){
        alert("Enetr the transactions")
    }
    else{   
        let transaction = {
            id: randomid(),
            text: text.value,
            amount: +amount.value
        };
        transactions.push(transaction);
        addTransactionDOM(transaction);
        updatemoney();
        updateLocalStroage();
        removeTransaction(id)
        text.value = "";
        amount.value = "";

    }
}

function randomid(){
    return Math.floor(Math.random()*1000000);
}

function addTransactionDOM(transaction){
    let moneyvalue = transaction.amount < 0 ? "-" : "+";
    let items = document.createElement("li"); 
    items.classList.add(transaction.amount < 0 ? "minus" : "plus");
    items.innerHTML =`${transaction.text} <span> ${moneyvalue}$${Math.abs(transaction.amount)}
    </span> <button class="delete-btn onclick ="removeTransaction(${transaction.id})">x</button>`;
    list_his.appendChild(items)
    // console.log(transactions); 
    
}

  
function updatemoney(){
    let allamounts = transactions.map(transaction => transaction.amount);
    let total = allamounts.reduce((acc, initi) => (acc += initi),0).toFixed(2);
    let income = allamounts.filter(items => items > 0).reduce((acc, initi) => (acc += initi),0).toFixed(2);
    let expense = (allamounts.filter(items => items < 0).reduce((acc, initi) => (acc += initi),0)* -1).toFixed(2);
    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;

}

function removeTransaction(id){
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStroage();
    init();
}

function updateLocalStroage(){
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function init(){
    list_his.innerHTML = ""
    transactions.forEach(addTransactionDOM);
    updatemoney()
}
init() 
form.addEventListener("submit", addTransaction);




