const express = require('express');

const {getAllLearnGuidance} = require('../module/getLearnGuidance');

const learnGuidanceRouter = express.Router();

learnGuidanceRouter.get('/courseMaterial', getAllLearnGuidance);

module.exports = learnGuidanceRouter;