const ErrorHandler = require('../errorHandler/errorHandler')
const Tasks = require('../taskModels/taskSchema.js')
const taskControllers = {
    getTask: async (req, res, next) => {

        try {
            const tasks = await Tasks.find()
            if (!tasks) {
                console.log('task')
                return next(new ErrorHandler("No Product found", 400))
            }
            res.status(200).json({
                success: true,
                tasks
            })
        } catch (err) {

            res.status(400).json({ err: err.messsage })
        }
    },

    createTask: async (req, res) => {

        try {
            const tasks = await Tasks.create(req.body)
            if (!tasks) {
                return next(new ErrorHandler("Error", 404))
            }
            res.status(200).json({
                message: "Task successfully created",
                success: true,
            })
        } catch (err) {
            res.status(400).json({ err: err.message })
        }
    },

    deleteTask: async (req, res) => {
        const id = req.params.id;

        try {
            const deletedTask = await Tasks.findOneAndDelete(id)
            if (!deletedTask) {
                return next(new ErrorHandler('id not found', 404))
            }

            res.status(200).json({
                message: "deleted successfully",
                success: true,
            })

        } catch (error) {

            res.status(400).json({
                error: error.message,
                success: false,
            })
        }
    },
    updateTask: async (req, res) => {
        try {
            let id = await req.params.id;
            let { completed, tasks } = req.body;
            console.log(completed, tasks)

            if (!id) {
                return res.status(400).json({ success: false })
            }
            const newTasks = await Tasks.findOneAndUpdate({ _id: id }, req.body, { new: true })
            res.status({ success: true, newTasks })
        }
        catch (err) {
            res.status(400).json({ err: err.message })
        }

    }
}

module.exports = taskControllers;