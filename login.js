document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('login-form').addEventListener('submit', async function (params) {
        params.preventDefault();
        const email=document.getElementById('login-email').value
        const password=document.getElementById('login-password').value
    
        try{
            const response = await fetch('http://127.0.0.1:8000/api/api/token/', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                'body': JSON.stringify({email, password})
            }
            )
    
            if(response.ok){
                const data = await response.json();
    
                localStorage.setItem('access', data.access)
                localStorage.setItem('refresh', data.refresh)
                // alert('Login Successful');
                window.location.href='index.html'
                
                // window.location.reload();
            }else{
                const dataErr = await response.json();
                document.getElementById('login-error').textContent = "Either the password or the email is incorrect"
            }
    
        }catch(error){
    console.error(error)
    }

    // displayLogin();
   
    })

    document.getElementById('forgot-password').addEventListener('click', async function (params) {
        params.preventDefault()
        const email=document.getElementById('login-email').value;

        const response = await fetch('http://127.0.0.1:8000/api/reset-password/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'email': email})
        })

        if(response.ok){
            const data = await response.json()
            document.getElementById('forgot-password-message').textContent=data.Message
            
            console.log('success')
        }

        
    })

    
})


