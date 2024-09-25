let dataForTransaction_temp  = localStorage.getItem("credital_transaction")
let dataForTransaction = []

if (dataForTransaction_temp){
    dataForTransaction = JSON.parse(dataForTransaction_temp)
}
// console.log(dataForTransaction[0].type_num)


let outFlow_temp = localStorage.getItem("credital_outflow")
let outFlow = 0
let dateFlow = []

console.log(outFlow_temp)

// if(outFlow_temp[0] != NaN){
//     dateFlow =JSON.parse( localStorage.getItem("credital_outflow"))
//     console.log(dateFlow)
//     outFlow = parseInt(dateFlow[0])
//     // dateFlow = (outFlow_temp)
//     console.log(outFlow)
// }
// else{
//     outFlow = 0
// }

if(outFlow_temp){
    dateFlow = JSON.parse(outFlow_temp)
    outFlow = dateFlow[0]
}
else{
    outFlow = 0
}


// console.log(dateFlow)

document.getElementById("info-sum-outflow").innerText = "Rp. " + outFlow


// Your Target
let valTarget_temp = localStorage.getItem("credital_balancing")
let valTarget = []
let outputTarget = 0

// console.log(valTarget_temp)

if(valTarget_temp){
    valTarget = JSON.parse(valTarget_temp)  
    outputTarget  = parseInt(valTarget[0]) 

}
else{
    outputTarget  = 0
}

document.getElementById("targetOutput").innerText = "Rp. " + outputTarget 







// Expense Report
let nameExpense = ["Food & Beverages", "Transportation", "House Maintainence", "Health Care", "Education", "Fashion", "Bills", "Others"]
let iconExpense = ["categories/food.png", "categories/transportation.png", "categories/home.png", "categories/health.png",
                    "categories/education.png", "categories/fashion.png", "categories/bills.png", "categories/Other.png"]

let typeExpense = []
let valExpense = []
let iconE = []

for (let i=0; i<nameExpense.length; i++){
    let sumExpense = 0


    for(let j=1; j<dateFlow.length; j++){
        for(let k=0; k<dataForTransaction.length; k++){

            // console.log(dataForTransaction[k].date)
        
            if(dataForTransaction[k].type_num  == 0 && dataForTransaction[k].date == dateFlow[j] && dataForTransaction[k].type == nameExpense[i]){
                sumExpense +=  parseInt(dataForTransaction[k].amount)
            }
        }
    }

    // console.log(nameExpense[i])
    // console.log(sumExpense)

    if(sumExpense != 0){
        typeExpense.push(nameExpense[i])
        valExpense.push(sumExpense)
        iconE.push(iconExpense[i])
    }
}

// console.log(typeExpense)
// console.log(valExpense)



// Tambah Expense Summary
let expenseSummary_container = document.getElementById("expenseSummary_container")

for(let i=0; i<typeExpense.length; i++){
    expenseSummary_container.innerHTML += `
    <div class="sum-category">
        <img src="${iconE[i]}">
        <div class="sum-sum-container">
            <div class="info-sum-title">${typeExpense[i]}</div>
            <div class="info-sum-sum-val" >Rp. ${valExpense[i]}</div>
        </div>
    </div>
    
    
    `
}

checkNotif()

let targetPlan = 0
let notify1 = 0
let notify2 = 0
let balancing_data = []

// Make Balancing Plan
function makePlan(){
    let target = document.getElementById("targetVal").value 
    let check1 = document.getElementById("check1").checked 
    let check2 = document.getElementById("check2").checked 

    if(target == ""){
        alert("Please enter a Target")
    }
    else{
        targetPlan = target
        document.getElementById("targetOutput").innerText = "Rp. " + targetPlan
        if (check1){
            notify1 = 1
        }
        
        if(check2){
            notify2 = 1
        }

        balancing_data.push(targetPlan)
        balancing_data.push(notify1)
        balancing_data.push(notify2)

        localStorage.setItem("credital_balancing", JSON.stringify(balancing_data))
        resetPlan()
    }
}

function resetPlan(){
    document.getElementById("targetVal").value = ""
    document.getElementById("check1").checked  = ""
    document.getElementById("check2").checked  = ""
}

// Notification


function showNotif1(){
    alert("Your outflow almost pass your target!")
    console.log("Your outflow almost pass your target!")
    const notification = new Notification("Balancing Plan Reminder", {
        body: "Your outflow almost pass your target!"
    });
    
}

function showNotif2(){
    alert("Your outflow has already pass your target!")
    const notification = new Notification("Balancing Plan Reminder", {
        body: "Your outflow has already pass your target!"
    });
    
}

  
function showNotif() {
    let tenPercent = outputTarget * (90 / 100)
    tenPercent = tenPercent.toFixed(0)

    // console.log(tenPercent)
    // console.log(outFlow)
    // console.log(outputTarget)

    if ( parseInt(valTarget[1]) == 1 && outFlow >= tenPercent && outFlow < outputTarget){
        showNotif1()
    }

    if ( parseInt(valTarget[2]) == 1 && outFlow > outputTarget){
        showNotif2()
    }
    // console.log("done")

    

    
}


function checkNotif(){
    console.log(Notification.permission)
    if (Notification.permission === "granted") {
        showNotif();
    }
    
    else if (Notification.permission !== "denied"){

        Notification.requestPermission().then(permission => {
            if (permission === "granted"){
                showNotif();

            }
        });
    }
}