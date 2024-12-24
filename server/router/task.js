const express = require('express');
const { setTask, setOrder,completeOrder } = require('../module/set');
const { getTask, myTask, myOrder, getTask_1, getTask_2 , getTask_3, myTaskCount, myOrderCount } = require('../module/get')

const taskRouter = express.Router();

taskRouter.get('/getTask', getTask);

taskRouter.post('/setTask', setTask);

taskRouter.post('/setOrder', setOrder);

taskRouter.post('/myTask', myTask);
taskRouter.post('/myOrder', myOrder);

taskRouter.post('/complete', completeOrder);

taskRouter.get('/getTask_1', getTask_1);
taskRouter.get('/getTask_2', getTask_2);
taskRouter.get('/getTask_3', getTask_3);

taskRouter.post('/myTaskCount', myTaskCount);
taskRouter.post('/myOrderCount', myOrderCount);

module.exports = taskRouter;