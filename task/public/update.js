

let data = { task: '', completed: false }
let receivedData = []
let update = document.querySelector('.update')
let inputSection = document.querySelector('.inputSection')
let check = document.querySelector('#completed')
let params = window.location.search




let output = ''
// function insertValue(e) {

//     let v = 0;
//     let { name, value } = e.target;
//     if (name === "task") {
//         data = { ...data, [name]: value }
//     }
//     if (name === 'completed') {
//         c += 1;
//         c % 2 === 1 ? v = true : v = false
//         data = { ...data, [name]: v }
//     }

//     v = 0;
//     console.log(data, 'data')
// }

function insertValue(e) {

    let { name, value } = e.target;
    if (name === "task") {
        data = { ...data, [name]: value }
    }
    if (name === 'completed') {

        data = { ...data, [name]: check.checked }
    }
    console.log(data, 'data')

}


async function updateTask(e) {
    e.preventDefault()
    let usp = new URLSearchParams(params)
    try {
        let id = await usp.get('id')

        const task = await axios.patch(`http://localhost:8000/api/v1/${id}`, data)
        await window.alert('updated succesffully')

    }
    catch (err) {
        alert('update failed')
        console.log(err.message)
    }

}

inputSection.addEventListener('change', insertValue)
update.addEventListener('click', updateTask)