const express = require('express');
const { getTask } = require('../module/getTask');
const { setTask } = require('../module/setTask');

const taskRouter = express.Router();

taskRouter.get('/getTask', getTask);

taskRouter.post('/setTask', setTask);

module.exports = taskRouter;