let HomeDebt_temp = localStorage.getItem("credital_HomeDebt")
let HomeDebt = []

if (HomeDebt_temp){
    HomeDebt = JSON.parse(HomeDebt_temp) 
}
else{
    HomeDebt = [0, 0, 0]
}
inputDebtInfo()

function inputDebtInfo(){
    document.getElementById("totalDebt-val").innerText = "Rp. " + HomeDebt[0]
    document.getElementById("totalMonthly-val").innerText = "Rp. " + HomeDebt[1]
    document.getElementById("totalPaid-val").innerText = "Rp. " + HomeDebt[2]
}





let HomeExtra_temp = localStorage.getItem("credital_HomeExtraInfo")
let HomeExtra = []

if (HomeExtra_temp){
    HomeExtra = JSON.parse(HomeExtra_temp) 
} 
else{
    HomeExtra = [0, 0]
}
inputHomeExtra()

function inputHomeExtra(){
    document.getElementById("report-income").innerText = "Rp. " + HomeExtra[0] 
    document.getElementById("report-expense").innerText = "Rp. " + HomeExtra[1]
}






let HomeTransaction_temp = localStorage.getItem("credital_transaction")
let HomeTransaction = []

if (HomeTransaction_temp){
    HomeTransaction = JSON.parse(HomeTransaction_temp) 
} 

const catHomeT = HomeTransaction.reduce((acc, HomeTransaction) =>{
    const {date} = HomeTransaction;

    if(!acc[date]){
        acc[date] = [HomeTransaction];
    }

    else{
        acc[date].push(HomeTransaction)
    }
    return acc;

}, {} );


const orderedHomeT = Object.keys(catHomeT).sort()

console.log(orderedHomeT)





let report_container = document.getElementById("report-data-container")
for(let i=0; i<orderedHomeT.length; i++){
    let net_temp = 0
    let day_temp;
    let month_temp;
    let year_temp;
    let date_temp;
    

    for(let j=0; j<HomeTransaction.length; j++){
        
        if(HomeTransaction[j].date == orderedHomeT[i]){
            day_temp = HomeTransaction[j].day
            month_temp = HomeTransaction[j].month
            year_temp = HomeTransaction[j].year
            date_temp = HomeTransaction[j].date_num

            // console.log(all_transaction_info_1[j].day_name)

            // console.log(all_transaction_info_1[j].amount)
            if (HomeTransaction[j].type_num == "1"){
                net_temp += parseInt(HomeTransaction[j].amount)   
            }
            else{
                net_temp -= parseInt(HomeTransaction[j].amount) 
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



    


