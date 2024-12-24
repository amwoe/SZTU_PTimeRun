const express = require('express');
const { setTask, setOrder,completeOrder, setTask_2 } = require('../module/set');
const { getTask, myTask, myOrder, getTask_1, getTask_2 , getTask_3, myTaskCount, myOrderCount,getBalance,getAnotherMoney } = require('../module/get')

const taskRouter = express.Router();

taskRouter.get('/getTask', getTask);

taskRouter.post('/setTask', setTask);
taskRouter.post('/setTask_2', setTask_2);

taskRouter.post('/setOrder', setOrder);

taskRouter.post('/myTask', myTask);
taskRouter.post('/myOrder', myOrder);

taskRouter.post('/complete', completeOrder);

taskRouter.get('/getTask_1', getTask_1);
taskRouter.get('/getTask_2', getTask_2);
taskRouter.get('/getTask_3', getTask_3);

taskRouter.post('/myTaskCount', myTaskCount);
taskRouter.post('/myOrderCount', myOrderCount);

taskRouter.post('/getBalance', getBalance);
taskRouter.post('/getAnotherMoney',getAnotherMoney);

module.exports = taskRouter;