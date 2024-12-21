const express = require('express'); 

const {getTalking} = require('../module/getTalking');

const {sendMessageToDB} = require('../module/sendMessages');

const talkRouter = express.Router();

talkRouter.get('/getTalking', getTalking);
talkRouter.post('/sendMessageToDB', sendMessageToDB);

module.exports = talkRouter;