let account_data = JSON.parse(localStorage.getItem("credital_account"))

let navbar_name = document.getElementById("navbar-name")
navbar_name.innerText = account_data[0]

function openAccount(){
    window.open('Account.html', '_self')
}