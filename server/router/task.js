const express = require('express');
const { setTask, setOrder,completeOrder } = require('../module/set');
const { getTask, myTask, myOrder , allTask } = require('../module/get')

const taskRouter = express.Router();

taskRouter.get('/getTask', getTask);

taskRouter.post('/setTask', setTask);

taskRouter.post('/setOrder', setOrder);

taskRouter.post('/myTask', myTask);
taskRouter.post('/myOrder', myOrder);

taskRouter.post('/complete', completeOrder);

taskRouter.get('/allTask', allTask);

module.exports = taskRouter;