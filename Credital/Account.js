let account_data_1 = JSON.parse(localStorage.getItem("credital_account"))

let personal_name = document.getElementById("personal-name")
let personal_email = document.getElementById("personal-email")

personal_name.innerText = account_data_1[0]
personal_email.innerText = account_data_1[1]

function openLogin(){
    window.open('Login.html', '_self')
}

// Wallet ==================================================


let HomeExtra_temp = localStorage.getItem("credital_HomeExtraInfo")
let HomeExtra = []

if (HomeExtra_temp){
    HomeExtra = JSON.parse(HomeExtra_temp) 
} 
else{
    HomeExtra = [0, 0]
}

let walletVal = parseInt(HomeExtra[0]) - parseInt(HomeExtra[1])
document.getElementById("wallet-val").innerText = "Rp. " + walletVal

// Overlay =============================================

let overlay_shadow = document.getElementById("overlay-shadow")
let navbar_name_1 = document.getElementById("navbar-name")


function changeSubmit(){
    let change_username = document.getElementById("change-username").value
    let change_email = document.getElementById("change-email").value

    if(change_email.indexOf('@') == -1){
        alert("Please enter a valid email")
    }
    else{
        account_data_1[0] = change_username
        account_data_1[1] = change_email

        localStorage.setItem("credital_account", JSON.stringify(account_data_1))

        personal_name.innerText = account_data_1[0]
        personal_email.innerText = account_data_1[1]
        navbar_name_1.innerText = account_data_1[0]

        console.log(localStorage)
        console.log(account_data_1)

        closeOverlay()
    }
}

function openOverlay(){
    overlay_shadow.style.display = "flex"
}

function closeOverlay(){
    document.getElementById("change-username").value = ""
    document.getElementById("change-email").value = ""
    overlay_shadow.style.display = "none"
}
