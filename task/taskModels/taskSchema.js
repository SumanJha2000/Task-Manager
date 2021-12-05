const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: [true, 'Enter Your task'],
        minlength: [4, 'Length Should be greater than 4']
    },
    completed: {
        type: Boolean,
        default: false,
    }
})

const Tasks = mongoose.model('Tasks', taskSchema)
module.exports = Tasks;