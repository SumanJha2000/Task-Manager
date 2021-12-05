const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/taskcontrollers')



router.get('/', ctrl.getTask)
router.post('/', ctrl.createTask)
router.delete('/:id', ctrl.deleteTask)
router.patch('/:id', ctrl.updateTask)


module.exports = router;