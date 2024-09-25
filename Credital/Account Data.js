

function register(){
    let reset = 1
    let username = document.getElementById("username").value
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    let confirmP = document.getElementById("confirm").value

    if (username == "" || email == "" || password == "" || confirmP == ""){
        alert("Please enter all the required data")
        reset = 0
    }
    else{
        if(email.indexOf('@') == -1){
            alert("Please enter a valid email")
            document.getElementById("email").value= ""
            reset = 0
        }

        if (password.length < 8){
            alert("Password must be at least 8 characters long")
            document.getElementById("password").value= ""
            document.getElementById("confirm").value= ""
            reset = 0
        }
        else if(password != confirmP){
            alert("Confirm Password is invalid")
            document.getElementById("password").value= ""
            document.getElementById("confirm").value= ""
            reset = 0
        }
    }

    if(reset == 1){
        let credital_account = [
            credital_username = username,
            credital_email = email,
            credital_password = password
        ]
            

        localStorage.setItem("credital_account", JSON.stringify(credital_account))
        localStorage.setItem("credital_balancing", "")
        localStorage.setItem("credital_HomeDebt", "")
        localStorage.setItem("credital_HomeExtraInfo", "")
        localStorage.setItem("credital_transaction", "")
        localStorage.setItem("credital_debt", "")
        localStorage.setItem("credital_outflow", "")


        window.open('Home.html', '_self')
    }
}

function checkAccount(){
    let account_data = JSON.parse(localStorage.getItem("credital_account"))
    // console.log(account_data)  
    

    let username = document.getElementById("login_username").value
    let password = document.getElementById("login_password").value

    if(username != account_data[0] && username != account_data[1]){
        alert("Please enter a valid account")
    }
    else if (password != account_data[2]){
        alert("Password is incorrect")
    }
    else{
        window.open('Home.html', '_self')
    }
}