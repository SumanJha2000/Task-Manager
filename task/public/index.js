// const { default: axios } = require("axios");


let submitBtn = document.querySelector('.submit')
let inputSection = document.querySelector('.inputSection');
let deleted = document.querySelector('.delete')
let edit = document.querySelector('.edit')
let check = document.querySelector('#completed')
// let update = document.querySelector('.update')
check.checked = false;


let data = { task: '', completed: false }
let receivedData = []

let output = ''


async function addTask(e) {
    e.preventDefault()
    output = ''
    receivedData = []
    try {
        await axios.post('http://localhost:8000/api/v1', data)
            .then(() => console.log('success'))
            .catch(err => console.log(err.message))

        document.querySelector('.inputTask').value = ""
        getData()

    } catch (err) {
        console.log(err.message)
    }

}

async function deleteFnc(arg) {
    try {
        const id = arg.getAttribute('data')
        await axios.delete('http://localhost:8000/api/v1/' + id)
        console.log("deleted succesffullly")
        getData()
    } catch (err) {
        console.log(err.message)
    }

}



async function getData() {
    try {
        output = ''
        receivedData = []
        await axios.get('http://localhost:8000/api/v1')
            .then(data => data.data.tasks.map(v => receivedData.push(v)))
            .catch(err => console.log(err.message))

        receivedData.map(v => {

            output += ` <div class="mb-3 d-flex justify-content-between border-white w-100 mx-auto  border">
            <li class="text card-header text-dark  w- ${v.completed && 'complete'} ">${v.task}</li>
            <div class="d-flex ">
                <button data=${v._id} onclick="" class='edit text-white  rounded bg-success px-3 mx-1 h-75 my-auto '><a
                      target="_blank" href="update.html?id=${v._id}" class="text-white fa fa-edit "></a></button>
                <button data=${v._id} onclick="deleteFnc(this)" class='delete rounded bg-danger  px-3 h-75 my-auto mr-2 text-white'><i
                         class="fa fa-trash delete "></i></button>
            </div>
        </div>`
        })
        document.querySelector('.display_task').innerHTML = output;
    } catch (err) {
        console.log(err)
    }

}

getData()

function insertValue(e) {


    let { name, value } = e.target;
    if (name === "task") {
        data = { ...data, [name]: value }
    }
    if (name === 'completed') {

        data = { ...data, [name]: check.checked }
    }


}






submitBtn.addEventListener('click', addTask)
inputSection.addEventListener('change', insertValue)
deleted.addEventListener('click', deleteFnc)
// update.addEventListener('click', taskEdit)


