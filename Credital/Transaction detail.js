let transaction_temp_1 = localStorage.getItem("credital_transaction")
let all_transaction_info_1 = [];
if (transaction_temp_1){
    all_transaction_info = JSON.parse(transaction_temp_1)
}



    const catTransaction = all_transaction_info_1.reduce((acc, all_transaction_info_1) =>{
        const {date} = all_transaction_info_1;

        if(!acc[date]){
            acc[date] = [all_transaction_info_1];
        }

        else{
            acc[date].push(tall_transaction_info_1)
        }
        return acc;

    }, {} );

    const orderedTransaction = Object.keys(catTransaction).sort()



// let hello = categorizeDate()

console.log(orderedTransaction)