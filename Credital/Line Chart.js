Chart.defaults.font.size = 12;
Chart.defaults.font.family = "patua one";
Chart.defaults.color = 'black';



// Ambil Data

let dataForTransaction1_temp  = localStorage.getItem("credital_transaction")
let dataForTransaction1 = []

if (dataForTransaction1_temp){
    dataForTransaction1 = JSON.parse(dataForTransaction1_temp)
}

// console.log(dataForTransaction)


// Get date
const catDate = dataForTransaction1.reduce((acc, dataForTransaction1) =>{
    const {date} = dataForTransaction1;

    if(!acc[date]){
        acc[date] = [dataForTransaction1];
    }

    else{
        acc[date].push(dataForTransaction1)
    }
    return acc;

}, {} );
// console.log(catDate)
const orderedDate = Object.keys(catDate).sort()
// console.log(orderedDate)

//Find month
let listMonth = []
let thisDate = new Date()
let thisMonth = thisDate.getMonth()
// console.log(thisMonth)

for (let i=0; i<orderedDate.length; i++){
    testDate = new Date(orderedDate[i])
    testMonth = testDate.getMonth()
    if (testMonth == thisMonth){
        listMonth.push(orderedDate[i])
    }
}

//Name of Month
var nameOfMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
let nameThisMonth = nameOfMonth[thisMonth]
// console.log(nameThisMonth)


//Inputing Array

let arrDateVal = []
let arrDateLabel = []

for(let i=0; i<listMonth.length; i++){
    let sum = 0
    let dateTest = 0
    // console.log(orderedDate[i])
    for(let j =0; j< dataForTransaction1.length; j++){
        
        if(dataForTransaction1[j].date == listMonth[i]){
            if (parseInt(dataForTransaction1[j].type_num)  ==  1){
                sum -= parseInt(dataForTransaction1[j].amount)
            }
            else if(parseInt(dataForTransaction1[j].type_num)  ==  0){
                sum += parseInt(dataForTransaction1[j].amount)
            }
            dateTest = 1          
        }

    }

    // console.log(sum)

    if (dateTest == 1){
        if (i != 0){
            sum += arrDateVal[i-1]
        }  
        arrDateLabel.push(orderedDate[i])
        arrDateVal.push(sum)    
    }
    
}

let x_length = arrDateVal.length - 1
let outflow_data = []
outflow_data.push(arrDateVal[x_length])
for (let i=0; i<listMonth.length; i++){
    outflow_data.push(listMonth[i])
}
// console.log(outflow_data)
localStorage.setItem("credital_outflow", JSON.stringify( outflow_data))




// Check Target

let checkTarget_temp = localStorage.getItem("credital_balancing")
let checkTarget = []

console.log(checkTarget_temp)

if(checkTarget_temp){
    checkTarget = JSON.parse(checkTarget_temp)  
    checkTarget = parseInt(checkTarget[0]) 

}
else{
    checkTarget = 0
}







// Ambil elemen LineGraph
var ctx = document.getElementById('LineGraph').getContext('2d');

// Gambar Line Chart
var LineGraph = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: `Outflow in ${nameThisMonth}`,
            data: [],
            backgroundColor: 'rgba(0, 123, 255, 0.5)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            annotation: {
                annotations: [{
                    
                    type: 'line',
                    mode: 'horizontal',
                    scaleID: 'y',
                    value: checkTarget,
                    borderColor: 'red',
                    borderWidth: 1,
                    label: {
                        enabled: false
                    }
                }]
            }
        }
    }
});

for(let i=0; i<arrDateLabel.length; i++){
    addDataLine(LineGraph, arrDateLabel[i], arrDateVal[i])
}

function addDataLine(chart, label, val) {
    chart.data.labels.push(label);
    chart.data.datasets[0].data.push(val)
    // chart.data.datasets[1].data.push(expense)
    chart.update();
  }
