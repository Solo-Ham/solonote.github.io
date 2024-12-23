document.addEventListener('DOMContentLoaded', function(){
    const accessToken = localStorage.getItem('access')
    console.log(accessToken);
    
checkLogInStatus(accessToken)
    
fetchData(accessToken)

currentUser(accessToken)

document.getElementById('logout-button').addEventListener('click', function (){
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    window.location.href="login.html"
}
)

document.getElementById('add-note-button').addEventListener('click', function (){
    const addNote = document.getElementById('note-add-div')
    if(addNote.style.display=='none'){
        addNote.style.display = 'block';
    }else{
        addNote.style.display = 'none';
    }   
})

document.getElementById('note-form').addEventListener('submit', async function (event){
    event.preventDefault()
    const subject = document.getElementById('title').value
    const body = document.getElementById('body').value

    const response = await fetch('https://solo20.pythonanywhere.com/api/create-note/', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'title': subject, 'body': body})
        
    })

    if(!response.ok){
        console.error('An error occured')
    }

    document.getElementById('title').value = ''
    document.getElementById('body').value = ''
    window.location.reload();


})

document.getElementById('user-name').addEventListener('click', function (){
    window.location.href=`user_update.html?user_id=${document.getElementById('user_id').textContent}`
})

// document.getElementById('')

})


async function fetchData(accessToken){
   
    const response = await fetch('https://solo20.pythonanywhere.com/api/show-notes',{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    }
    )

    if(!response.ok){
        console.log('Bad Request')
    }

    const data = await response.json()

    const note = document.getElementById('note')

    data.forEach(item => {

        const subject = document.createElement('h4')
        subject.textContent = item.title
        const body = document.createElement('p')
        body.textContent = item.body
        const date = document.createElement('p')
        date.textContent = item.date

        const update = document.createElement('button')
        update.textContent = 'Update'
        update.addEventListener('click', function (){
            window.location.href=`update.html?noteId=${item.id}`
        })

        const delete_note = document.createElement('button')
        delete_note.textContent = 'Delete'
        delete_note.addEventListener('click', async function (params) {
            params.preventDefault()
            const delete_response = await fetch(`https://solo20.pythonanywhere.com/api/note-delete/${item.id}/`,{
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            })

            // if(delete_response.ok){
            //     console.log('Note Successfully deleted')
            // }

            window.location.reload()
        }) 
        
        const horizontal_line = document.createElement('hr')



        note.appendChild(subject)
        note.appendChild(body)
        note.appendChild(update)
        note.appendChild(delete_note)
        note.appendChild(date)
        note.appendChild(horizontal_line)
        
    });
}


function checkLogInStatus(token) {

if(!token){
    window.location.href="login.html"
}
    
}


async function currentUser(accessToken) {
    // params.preventDefault()

    const response = await fetch('https://solo20.pythonanywhere.com/api/current-user/', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    })

    if(response.ok){
        const data = await response.json()

    document.getElementById('user-name').innerHTML = data.name

    document.getElementById('user_id').innerHTML = data.id

    }
    
}

