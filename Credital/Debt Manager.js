let overlay_shadow = document.getElementById("overlay-shadow")
let debt_container = document.getElementById("debt-data-container")

let totalDebt_data = 0
let totalPaid_data = 0

let all_debt_info_temp = localStorage.getItem("credital_debt")
let all_debt_info = []

if (all_debt_info_temp){
    all_debt_info = JSON.parse(all_debt_info_temp) 
}

let debtExpense_temp = localStorage.getItem("credital_transaction")
let debtExpense = []
if (debtExpense_temp){
    debtExpense = JSON.parse(debtExpense_temp)
}

addProgress()
topDebt()

for(let i = 0; i<all_debt_info.length; i++){
    debt_container.innerHTML += `
        <div class="debt-data-container" >
            <div class="debt-main-container">
                <div class="debt-main-title">${all_debt_info[i].name}</div>

                <div class="debt-main-lender-container">
                    <div class="debt-main-lender-title"> Lender's Name:</div>
                    <div class="debt-main-lender-val">
                    ${all_debt_info[i].lender}
                    </div>
                </div>

                <div class="debt-main-info-container">
                    <div class="debt-main-info-blue">
                        <span class="debt-main-info-title">Total Loan</span>
                        <span class="debt-main-info-val">Rp ${all_debt_info[i].ammount}</span>
                    </div>

                    <div class="debt-main-info-blue">
                        <span class="debt-main-info-title">Monthly Payment</span>
                        <span class="debt-main-info-val">Rp ${all_debt_info[i].monthly}</span>
                    </div>

                    <div class="debt-main-info-blue">
                        <span class="debt-main-info-title">Interest</span>
                        <span class="debt-main-info-val">${all_debt_info[i].interest}%</span>
                    </div>

                </div>
                
                <div class="debt-main-line"></div>

                <div class="debt-main-date">
                    <span class="debt-main-duedate">Due Date:</span>
                    <span class="debt-main-date-val">${all_debt_info[i].dueDate}</span>
                </div>
            </div> 

            
            <!-- Right Wing -->

            
            <div class="debt-right-wing">
                <!-- Delete Button -->
                <button class="debt-delete">
                    <img src="Assets/delete icon.png">
                </button>

                <!-- Prorgess Bar -->

                <div class="debt-progress-text">${all_debt_info[i].percentProgress}%</div>

                <div class="debt-progress-container">
                    <div class="debt-progress-val" style = "width: ${all_debt_info[i].percentProgress}%"></div>
                </div>
            
                <!-- Remaining Payment -->

                <div class="debt-remaining-container">
                    <div class="debt-remaining-title">
                        Remaining Payment
                    </div>
                    <div class="debt-remaining-val">
                    Rp. ${all_debt_info[i].remainingPayment}
                    </div>
                </div>
            </div>
        </div>
        `
}

function openOverlay(){
    overlay_shadow.style.display = "flex"
}

function closeOverlay(){
    document.getElementById("debt-name").value = ""
    document.getElementById("debt-lender").value = ""
    document.getElementById("debt-amount").value = ""
    document.getElementById("debt-interest").value = ""
    document.getElementById("debt-intitialDate").value = ""
    document.getElementById("debt-dueDate").value = ""
    overlay_shadow.style.display = "none" 
}

function addDebt(){
    let debt_name = document.getElementById("debt-name").value
    let debt_lender = document.getElementById("debt-lender").value
    let debt_amount = document.getElementById("debt-amount").value
    let debt_interest = document.getElementById("debt-interest").value
    let debt_initialDate = document.getElementById("debt-intitialDate").value
    let debt_dueDate = document.getElementById("debt-dueDate").value


    let reset = 1

    if(debt_name == "" || debt_lender == "" || debt_amount == ""
        || debt_interest == "" || debt_initialDate == "" 
        || debt_dueDate == ""){
        
        alert("Please enter all the required data")
        reset = 0
    }
    else{

        // https://codingbeautydev.com/blog/javascript-get-number-of-months-between-two-dates/

        // Calculating Monthly Payment
        let date1 = new Date(debt_initialDate)
        let date2 = new Date(debt_dueDate)

        const monthDiff = date2.getMonth() - date1.getMonth()
        const yearDiff = date2.getYear() - date1.getYear()
        let n = monthDiff + yearDiff * 12

        let r = debt_interest / 1200 
        let p = debt_amount

        let monthly = (p*r*(1+r)**n) / ((1+r)**n - 1)

        debt_info = {
            name : debt_name,
            lender: debt_lender,
            ammount: debt_amount,
            interest: debt_interest,
            initialDate: debt_initialDate,
            dueDate: debt_dueDate,
            monthly : monthly.toFixed(2),
            rawProgress: 0,
            percentProgress: 0,
            remainingPayment: debt_amount
        }

        // console.log(debt_info)

        debt_container.innerHTML += `
        <div class="debt-data-container" >
            <div class="debt-main-container">
                <div class="debt-main-title">${debt_info.name}</div>

                <div class="debt-main-lender-container">
                    <div class="debt-main-lender-title"> Lender's Name:</div>
                    <div class="debt-main-lender-val">
                    ${debt_info.lender}
                    </div>
                </div>

                <div class="debt-main-info-container">
                    <div class="debt-main-info-blue">
                        <span class="debt-main-info-title">Total Loan</span>
                        <span class="debt-main-info-val">Rp ${debt_info.ammount}</span>
                    </div>

                    <div class="debt-main-info-blue">
                        <span class="debt-main-info-title">Monthly Payment</span>
                        <span class="debt-main-info-val">Rp ${debt_info.monthly}</span>
                    </div>

                    <div class="debt-main-info-blue">
                        <span class="debt-main-info-title">Interest</span>
                        <span class="debt-main-info-val">${debt_info.interest}%</span>
                    </div>

                </div>
                
                <div class="debt-main-line"></div>

                <div class="debt-main-date">
                    <span class="debt-main-duedate">Due Date:</span>
                    <span class="debt-main-date-val">${debt_info.dueDate}</span>
                </div>
            </div> 

            
            <!-- Right Wing -->

            
            <div class="debt-right-wing">
                <!-- Delete Button -->
                <button class="debt-delete">
                    <img src="Assets/delete icon.png">
                </button>

                <!-- Prorgess Bar -->

                <div class="debt-progress-text">0.0%</div>

                <div class="debt-progress-container">
                    <div class="debt-progress-val" style="width: 0%;"></div>
                </div>
            
                <!-- Remaining Payment -->

                <div class="debt-remaining-container">
                    <div class="debt-remaining-title">
                        Remaining Payment
                    </div>
                    <div class="debt-remaining-val">
                        Test
                    </div>
                </div>
            </div>
        </div>
        `

        all_debt_info.push(debt_info)

        localStorage.setItem("credital_debt", JSON.stringify(all_debt_info  ))

        closeOverlay()
    }

}


// M = (P * r * (1 + r)^n) / ((1 + r)^n - 1)

// Where:
// M = Monthly payment
// P = Principal amount (initial debt)
// r = Monthly interest rate (annual interest rate divided by 12)
// n = Total number of payments (number of months)



function addProgress(){
    // Finding Progress
    
    // console.log()
    for(let j=0; j<all_debt_info.length; j++){
        
    let rawProgress = 0
    let percentProgress = 0
    let remainingPayment = 0

    // console.log(all_debt_info[j].name)

        for(let i =0; i< debtExpense.length; i++){
            // console.log(debtExpense[i].type)
            
            if( debtExpense[i].type == all_debt_info[j].name){


                rawProgress += parseInt(debtExpense[i].amount)
                // console.log(rawProgress)
            }
        }

    percentProgress = (parseFloat(rawProgress) / parseFloat(all_debt_info[j].ammount)) * 100
    // console.log(percentProgress)

    remainingPayment = parseInt(all_debt_info[j].ammount) - rawProgress
    // console.log(remainingPayment)

    all_debt_info[j].rawProgress = rawProgress
    all_debt_info[j].percentProgress = percentProgress.toFixed(1)
    all_debt_info[j].remainingPayment = remainingPayment.toFixed(2)
    }

    
    localStorage.setItem("credital_debt", JSON.stringify(all_debt_info  ))
}

function topDebt(){
    let totalDebt_val = 0
    let totalPaid_val = 0
    for(let i=0; i< all_debt_info.length; i++){
        totalDebt_val += parseInt(all_debt_info[i].ammount)
        totalPaid_val += ( parseInt(all_debt_info[i].ammount) - parseInt(all_debt_info[i].remainingPayment) )
    }

    totalDebt_val = totalDebt_val.toFixed(2)
    totalPaid_val = totalPaid_val.toFixed(2)

    document.getElementById("info-sum-expense").innerHTML ="Rp. " + totalDebt_val
    document.getElementById("info-sum-income").innerHTML ="Rp. " +  totalPaid_val

    totalDebt_data = totalDebt_val
    totalPaid_data = totalPaid_val
    sendData()

}


// Send Amount Data

function sendData(){
    let credital_HomeDebt= []
    let totalMonthly = 0

    for (let i=0; i<all_debt_info.length; i++){
        totalMonthly += parseInt(all_debt_info[i].monthly) 
    }

    credital_HomeDebt.push(totalDebt_data)
    credital_HomeDebt.push(totalMonthly)
    credital_HomeDebt.push(totalPaid_data)

    // console.log(credital_HomeDebt)
    localStorage.setItem("credital_HomeDebt", JSON.stringify(credital_HomeDebt ))
    

    let totalProgress
    if(totalDebt_data == 0){
        totalProgress = 0
    }
    else{
        totalProgress = (totalPaid_data / totalDebt_data) * 100
        totalProgress = totalProgress.toFixed(0)   
    }
    

    document.getElementById("total_progress_debt").innerText = totalProgress + "%"
}   