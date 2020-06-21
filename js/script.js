let  myTransferObject, count = 0, expense_value = 0, income_value = 0, total_value = 0;
let cookie_data = {};

function loader(){
    console.log(cookie_data)
    for (all in cookie_data){
        if(all !== 'count'){
            console.log(cookie_data[all])
            appendToTransfer(cookie_data[all]);
        }
        else{
            count = cookie_data[all]
        }
    }
    calculate_total()
}

window.onload = ()=>{
    let data_list = document.cookie.split('=');
    cookie_data = JSON.parse(data_list[1]);
    loader();
}

// Transfer Form Input Feilds
const addRecord_btn = document.getElementById('addTransferRecord');
const expenseName = document.getElementById('ExpenseName-input');
const amount = document.getElementById('amount-input');
const type = document.getElementById('transfer-type-input');


//Transfer Table body
const transfer_table_body = document.getElementById('transferTableBody');
const transfer_value_holder = document.getElementById('transfer-Value');
const income_value_holder = document.getElementById('income-value');
const expense_value_holder = document.getElementById('expense-value');


// Transfer Form button Action
function addToTransfer(){
    let expenseName_value = expenseName.value;
    let amount_value = amount.value;
    let type_value = type.value;

    if (expenseName_value.length === 0 || amount_value.length === 0 || type_value.length === 0){
        alert('Fill in the details first!')
    }else{
        count += 1;
        myTransferObject = {
            'id': '#' + count,
            'name': expenseName_value,
            'type': type_value,
            'amount': amount_value,
        }

        appendToTransfer(myTransferObject);
        expenseName.value = '';
        amount.value = '';
        type.value = '';

        cookie_data[String (myTransferObject.id)] = myTransferObject;
        calculate_total();
        cookie_edit();
    }
}

// Appending the details into Transfer List..
function appendToTransfer(object){
    // Creating new row for insertion...
    let tableRow = document.createElement('tr');

    let tabledata_Id = document.createElement('td');
    let tabledata_Name = document.createElement('td');
    let tabledata_value = document.createElement('td');
    let tabledata_type = document.createElement('td');
    let tabledelete_btn = document.createElement('td');

    // Creating delete button
    let button_delete = document.createElement('button');
    button_delete.innerText = 'Delete';
    button_delete.classList.add('btn');
    button_delete.classList.add('btn-danger');
    button_delete.classList.add('delete_row');
    tabledelete_btn.appendChild(button_delete);
    console.log(object)
    tabledata_Id.innerText = object.id;
    tabledata_Name.innerText = object.name;
    tabledata_value.innerText = object.amount;
    tabledata_type.innerText = object.type;

    tableRow.append(tabledata_Id, tabledata_Name, tabledata_type, tabledata_value, tabledelete_btn)
    transfer_table_body.appendChild(tableRow);

    audio = new Audio('./sounds/add_button.mp3')
    audio.play();
}

// deleting data from object
function remove_from_cookie_list(row){
    id_remove = row.cells[0].innerText;
    delete cookie_data[id_remove];
    cookie_edit();
    calculate_total()
}

transfer_table_body.addEventListener('click', (e)=>{
    list = e.target.classList;
    if(list.contains('delete_row')){
        table_row = e.target.parentNode.parentNode;
        table_row.parentNode.removeChild(table_row);
        let audio = new Audio('./sounds/delete_button.mp3');
        audio.play();
    }

    remove_from_cookie_list(table_row)
});

// Calculating total, expense and income and Adding it to the HTML view....
function calculate_total(){
    total_value = 0;
    income_value =0;
    expense_value = 0;
    for (each in cookie_data){
        if(each === 'count'){
            continue;
        }
        if(cookie_data[each].type === 'income'){
            total_value += Number(cookie_data[each].amount);
            income_value += Number(cookie_data[each].amount)
        }else{
            total_value -= Number(cookie_data[each].amount);
            expense_value += Number(cookie_data[each].amount);
        }
    }

    transfer_value_holder.innerText = total_value;
    income_value_holder.innerText = income_value;
    expense_value_holder.innerText = expense_value;
}

// Cookie Edit saves a new cookie. This Happens each time a value is added or removed freom the cookie data object created.
function cookie_edit(){
    cookie_data['count'] = count;
    document.cookie = "details="+JSON.stringify(cookie_data)+";"+"Max-Age="+(60*60*24*7);
}

addRecord_btn.addEventListener('click', addToTransfer);
