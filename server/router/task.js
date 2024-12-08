const express = require('express');
const { getTask } = require('../module/getTask');
const { setTask } = require('../module/setTask');
const { setOrder } = require('../module/setOrder');

const taskRouter = express.Router();

taskRouter.get('/getTask', getTask);

taskRouter.post('/setTask', setTask);

taskRouter.post('/setOrder', setOrder);

module.exports = taskRouter;