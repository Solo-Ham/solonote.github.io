document.addEventListener('DOMContentLoaded', async function (params) {
    params.preventDefault()


    // console.log(email, name, password, confirm_password);
    

    document.getElementById('create-account').addEventListener('submit', async function (event){
        event.preventDefault()


        const email = document.getElementById('email').value
        const name = document.getElementById('name').value
        const password = document.getElementById('password1').value
        const confirm_password = document.getElementById('password2').value

        const response = await fetch(`https://solo20.pythonanywhere.com/api/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({'email': email, 'name': name, 'password1': password, 'password2': confirm_password})
            // body: JSON.stringify({email, name, password, confirm_password})

        })

        if(response.ok){
            localStorage.setItem('access', response.access)
            localStorage.setItem('refresh', response.refresh)

            window.location.href="login.html";
            
        }

    })

})
