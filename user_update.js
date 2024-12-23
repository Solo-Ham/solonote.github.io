document.addEventListener('DOMContentLoaded', async function (params) {

    const accessToken = localStorage.getItem('access')

    if(!accessToken){
        window.location.href="login.html"
    }

    userUpdate(accessToken)

    
})

async function userUpdate(accessToken) {

const params = new URLSearchParams(window.location.search)
const user_Id = params.get('user_id')

const response = await fetch(`http://127.0.0.1:8000/api/current-user/`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    }
})

if(response.ok){
    const data = await response.json()

    document.getElementById('email').value = data.email;
    document.getElementById('name').value = data.name;


}



document.getElementById('user-update-form').addEventListener('submit', async function (event){
    event.preventDefault()
    const email = document.getElementById('email').value
    const name = document.getElementById('name').value

    const updateResponse = await fetch(`http://127.0.0.1:8000/api/user-update/${user_Id}/`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
            },
    
    body: JSON.stringify({'email': email, 'name': name})
    })

    if(updateResponse.ok){
        document.getElementById('email').value = '';
        document.getElementById('name').value = '';
        window.location.href='home.html';
    }

})


    
}