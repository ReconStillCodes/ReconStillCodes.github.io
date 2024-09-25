
// Type Data ============================================
let debt_data_temp = localStorage.getItem("credital_debt")

let debt_data = [];
if (debt_data_temp){
    debt_data= JSON.parse(debt_data_temp)
}

let type_expense = ["Food & Beverages", "Transportation", "House Maintainence",
    "Health Care", "Education", "Fashion", "Bills", "Others"]
let type_income = ["Salary", "Incoming Transfer", "Others"]

// Dates

var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']




let overlay_shadow = document.getElementById("overlay-shadow")
// let trasaction_temp = JSON.parse(localStorage.getItem("credital_transaction"))

let transaction_temp = localStorage.getItem("credital_transaction")
let all_transaction_info = [];
if (transaction_temp){
    all_transaction_info = JSON.parse(transaction_temp)
    top_trasaction()
}
// console.log(all_transaction_info)   




categorize()




let choice_expense = document.getElementById("but-catgeory-expense")
let choice_income = document.getElementById("but-catgeory-income")
let choice_debt = document.getElementById("but-catgeory-debt")
let type_container = document.getElementById("type-container")



function openOverlay(){
    overlay_shadow.style.display = "flex"
    
    choice_expense.style.backgroundColor = "white"
    choice_expense.style.color = "black"
    choice_income.style.backgroundColor = "#537FE7"
    choice_income.style.color = "white"
    choice_debt.style.backgroundColor = "#537FE7"
    choice_debt.style.color = "white"
    
    for(let i=0; i<type_expense.length; i++){
        type_container.innerHTML += 
        `<button class="but-category-type" onclick="enterCategory(0, ${i})">${type_expense[i]}</button>`    
    }

    document.getElementById("category-val").innerText = "Pick a Category"
}

function closeOverlay(){
    document.getElementById("add-transaction-amount").value = ""
    document.getElementById("add-transaction-date").value = ""
    document.getElementById("category-val").innerHTML = "Pick a Category"
    document.getElementById("type-container").innerHTML = ""
    overlay_shadow.style.display = "none" 
}

function enterCategory(type, x){

    if (type == 0){
        document.getElementById("category-val").innerText= type_expense[x]
    }
    else if(type == 1){
        document.getElementById("category-val").innerText = type_income[x]
    }
    else if(type == 2){
        document.getElementById("category-val").innerText = debt_data[x].name
    }
}

function pickCategory(x){

    type_container.innerHTML = "" 

    if(x == 0){
        choice_expense.style.backgroundColor = "white"
        choice_expense.style.color = "black"

        choice_income.style.backgroundColor = "#537FE7"
        choice_income.style.color = "white"
        choice_debt.style.backgroundColor = "#537FE7"
        choice_debt.style.color = "white"

        for(let i=0; i<type_expense.length; i++){
            type_container.innerHTML += 
            `<button class="but-category-type" onclick="enterCategory(0, ${i})" >${type_expense[i]}</button>`    
        }
    }
    else if(x == 1){
        choice_income.style.backgroundColor = "white"
        choice_income.style.color = "black"

        choice_expense.style.backgroundColor = "#537FE7"
        choice_expense.style.color = "white"
        choice_debt.style.backgroundColor = "#537FE7"
        choice_debt.style.color = "white"

        for(let i=0; i<type_income.length; i++){
            type_container.innerHTML += 
            `<button class="but-category-type" onclick="enterCategory(1, ${i})">${type_income[i]}</button>`    
        }
    }
    else if(x == 2){
        choice_debt.style.backgroundColor = "white"
        choice_debt.style.color = "black"

        choice_expense.style.backgroundColor = "#537FE7"
        choice_expense.style.color = "white"
        choice_income.style.backgroundColor = "#537FE7"
        choice_income.style.color = "white"

        for(let i=0; i<debt_data.length; i++){
            type_container.innerHTML += 
            `<button class="but-category-type" onclick="enterCategory(2, ${i})">${debt_data[i].name}</button>`    
        }
    }
}








function addTransaction(){
    let category_amount = document.getElementById("add-transaction-amount").value
    let category_date = document.getElementById("add-transaction-date").value
    let category_val = document.getElementById("category-val").innerText

    if(category_amount == "" || category_date =="" || 
        category_val == "Pick a Category"){
        
        alert("Please enter all required data")
    }
    else{
        let type_number = 10

        for(let j=0; j< type_expense.length; j++){
            
            if (category_val == type_expense[j] ){
                type_number = 0
                {break ;}
            }
            else{
                type_number = 10
            }
        }

        if(type_number == 10){
            for(let j=0; j< type_income.length; j++){
            
                if (category_val == type_income[j] ){
                    type_number = 1
                    {break ;}
                }
                else{
                    type_number = 10
                }
            }  
        }

        if(type_number == 10){
            for(let j=0; j< debt_data.length; j++){
            
                if (category_val == debt_data[j] ){
                    type_number  = 2
                    {break ;}
                }
                else{
                    type_number = 10
                }
            }  
        }

        let date_temp = new Date(category_date)

        let date_name = date_temp.getDate().toString()

        let day_name = dayNames[date_temp.getDay()]
        // console.log(day_name)

        let month = date_temp.getMonth()
        let month_name = monthNames[month]
        // console.log(month_name)

        let year = date_temp.getFullYear()
        // console.log(year)

        let transaction_data = {
            amount : category_amount,
            date: category_date,
            type: category_val,
            type_num: type_number,
            day: day_name,
            month: month_name,
            month_num: month,
            year: year,
            date_num: date_name
        }

        all_transaction_info.push(transaction_data)
        console.log(all_transaction_info)



      

        localStorage.setItem("credital_transaction", JSON.stringify(all_transaction_info))

        closeOverlay()
        categorize()
        top_trasaction()
    }
}





















function categorize(){
    // document.createElement("div").innerHTML ==  ""

    let transaction_temp_1 = localStorage.getItem("credital_transaction")
    let all_transaction_info_1 = [];
    if (transaction_temp_1){
        all_transaction_info_1 = JSON.parse(transaction_temp_1)
    }

    // console.log(all_transaction_info_1[0].amount)



    const catTransaction = all_transaction_info_1.reduce((acc, all_transaction_info_1) =>{
        const {date} = all_transaction_info_1;

        if(!acc[date]){
            acc[date] = [all_transaction_info_1];
        }

        else{
            acc[date].push(all_transaction_info_1)
        }
        return acc;

    }, {} );
    // console.log(catTransaction)
    // console.log(catTransaction[0])
    const orderedTransaction = Object.keys(catTransaction).sort()

    // console.log(orderedTransaction)
    // console.log(orderedTransaction.length)


    let report_container = document.getElementById("report-container")

    report_container.innerHTML = ""


    for(let i=0; i<orderedTransaction.length; i++){
        let net_temp = 0
        let day_temp;
        let month_temp;
        let year_temp;
        let date_temp;
        

        for(let j=0; j<all_transaction_info_1.length; j++){
            
            if(all_transaction_info_1[j].date == orderedTransaction[i]){
                day_temp = all_transaction_info_1[j].day
                month_temp = all_transaction_info_1[j].month
                year_temp = all_transaction_info_1[j].year
                date_temp = all_transaction_info_1[j].date_num

                // console.log(all_transaction_info_1[j].day_name)

                // console.log(all_transaction_info_1[j].amount)
                if (all_transaction_info_1[j].type_num == "1"){
                    net_temp += parseInt(all_transaction_info_1[j].amount)   
                }
                else{
                    net_temp -= parseInt(all_transaction_info_1[j].amount) 
                }   
            }
        }

        let color
        if (net_temp < 0){
            color = "red"
        }
        else{
            color = "green"
        }


        var newMainInfo = document.createElement("div")
        newMainInfo.className = "report-data-first"

        newMainInfo.innerHTML = `
            <div class="report-date">${date_temp}</div>
                <div class="report-date-extra">
                    <div class="report-day">${day_temp}</div>
                    <div class="report-year">${month_temp} ${year_temp}</div>
                </div>
                    <div class="report-net ${color}">Rp ${net_temp}</div>
    
               
            </div>
        `

        report_container.appendChild(newMainInfo)

    }


    

}


function top_trasaction(){
    let net_val = 0
    let income_val = 0
    let expense_val = 0

    for (let i=0; i < all_transaction_info.length; i++){
        let check = 1

        // console.log(all_transaction_info[i].type)

        for(let j=0; j< type_income.length; j++){
            // console.log(type_income[j])
            if (all_transaction_info[i].type == type_income[j] ){
                check = 0
                {break ;}
            }
            else{
                check = 1
            }
        }

        if(check == 0){
            net_val += parseInt(all_transaction_info[i].amount) 
            income_val += parseInt(all_transaction_info[i].amount) 
            // console.log(income_val)
        }
        else if(check == 1){
            net_val -=  parseInt(all_transaction_info[i].amount) 
            expense_val += parseInt(all_transaction_info[i].amount) 
            // console.log(expense_val)
        }

    }
    // console.log(net_val)
    // console.log(income_val)
    // console.log(expense_val)

    document.getElementById("net-val").innerText = "Rp " + net_val
    document.getElementById("info-sum-income").innerText = "Rp " + income_val
    document.getElementById("info-sum-expense").innerText = "Rp " +expense_val

    let HomeExtraInfo =[ income_val, expense_val ]

    localStorage.setItem("credital_HomeExtraInfo", JSON.stringify(HomeExtraInfo))
}