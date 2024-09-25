Chart.defaults.font.size = 12;
Chart.defaults.font.family = "patua one";
Chart.defaults.color = 'black';

let transaction_data_temp = localStorage.getItem("credital_transaction")
let transaction_data = [];

if (transaction_data_temp){
    transaction_data= JSON.parse(transaction_data_temp)
}



let month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
let month_val = []
let income_val = []
let expense_val = []

for(let i=0; i<month_names.length; i++){
    let checkMonth = 0
    let incomeTemp = 0
    let expenseTemp = 0
    // console.log(month_names[i])
    
    for(let j=0; j< transaction_data.length; j++){
        
        if (transaction_data[j].month == month_names[i]){
            // console.log(transaction_data[j].month)
            checkMonth = 1

            if(transaction_data[j].type_num == 1){
                incomeTemp += parseInt(transaction_data[j].amount) 
            }
            else{
                expenseTemp += parseInt(transaction_data[j].amount) 
            }
        }
    }

    if (checkMonth == 1){
        month_val.push(month_names[i])
        income_val.push(incomeTemp)
        expense_val.push(expenseTemp)
    }
    
}

// console.log(month_val)
// console.log(income_val)
// console.log(expense_val)

// const divData = transaction_data.reduce((acc, transaction_data)  =>{
//     const {month_num} = transaction_data;

//     if(!acc[month_num]){
//         acc[month_num] = [transaction_data];
//     }

//     else{
//         acc[month_num].push(transaction_data)
//     }
//     return acc;
// }, {});

// const orderData = Object.keys(divData).sort()

// console.log(divData)
// console.log(orderData)



var bar = document.getElementById("barGraph").getContext("2d");

var data = {
    labels: [],
    datasets: [
        {
            label: "Income",
            backgroundColor: 'rgba(82,176,108, 0.7)',
            data: []
        },
        {
            label: "Expense",
            backgroundColor: 'rgba(255,45,45, 0.7)',
            data: []
        }
    ]
};

var myBarChart = new Chart(bar, {
    type: 'bar',
    data: data  ,
    options: {
        barValueSpacing: 10,
        scales: {
            yAxes: [{
                ticks: {
                    min: 0,
                }
            }]
        }
    }
});

var labelTest = ["June", "July"]
var dataTest = 4;

for (let i=0; i<month_val.length; i++){
    addData(myBarChart, month_val[i], income_val[i], expense_val[i]);    
}



function addData(chart, label, income, expense) {
    chart.data.labels.push(label);
    // chart.data.datasets.forEach((dataset) => {
    //     dataset.data.push(data);
    // });

    chart.data.datasets[0].data.push(income)
    chart.data.datasets[1].data.push(expense)
    chart.update();
}
