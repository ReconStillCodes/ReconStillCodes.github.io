Chart.defaults.font.size = 12;
Chart.defaults.font.family = "patua one";
Chart.defaults.color = 'black';

let transaction_data_temp_1 = localStorage.getItem("credital_transaction")
let transaction_data_1 = [];

if (transaction_data_temp_1){
    transaction_data_1= JSON.parse(transaction_data_temp_1)
}



let expense_data = ["Food & Beverages", "Transportation", "House Maintainence",
    "Health Care", "Education", "Fashion", "Bills", "Others"]

let backColor = [
  "rgba(239, 245, 81, 0.7)",
  "rgba(106, 222, 108, 0.7)",
  "rgba(106, 154, 222, 0.7)",
  "rgba(232, 85, 56, 0.7)",
  "rgba(166, 99, 176, 0.7)",
  "rgba(252, 66, 109, 0.7)",
  "rgba(104, 194, 227, 0.7)",
  "rgba(216, 230, 64, 0.7)",
  "rgba(252, 93, 40, 0.7)",
]

let background

let label_data = []
let val_data = []
let val_debt = 0

for(let i=0; i<expense_data.length; i++){
  let checkCat = 0
  let val_temp = 0

  for (let j=0; j<transaction_data_1.length; j++){

    if(transaction_data_1[j].type_num == 0){

      if(transaction_data_1[j].type == expense_data[i]){
        checkCat = 1
        val_temp += parseInt(transaction_data_1[j].amount)
      }
    }
  }

  if (checkCat == 1){
    label_data.push(expense_data[i])
    val_data.push(val_temp)
  }
}

let checkDebt = 0

for (let i=0; i<transaction_data_1.length; i++){
    if(transaction_data_1[i].type_num == 2){
        checkDebt = 1
        val_debt += parseInt(transaction_data_1[i].amount)    
    } 
}

if (checkDebt == 1){
  label_data.push("Debt")
  val_data.push(val_debt)
}

// console.log(label_data)
// console.log(val_data)

  

const ctx = document.getElementById('pieChart').getContext("2d");

var myChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: [],
    datasets: [{
      label: 'Expenses',
      data: [],
      backgroundColor: [],
      borderWidth: 0.5,
      borderColor: 'black',
      spacing: 5
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

for(let i=0; i<label_data.length; i++){
  addDataPie(myChart, label_data[i], val_data[i], backColor[i])
}


function addDataPie(chart, label, val, color) {
  chart.data.labels.push(label);
  chart.data.datasets[0].data.push(val)
  chart.data.datasets[0].backgroundColor.push(color)
  // chart.data.datasets[1].data.push(expense)
  chart.update();
}