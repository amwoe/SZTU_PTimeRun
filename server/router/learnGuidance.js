const express = require('express');

const {courseMaterial,reviewMaterial,learnGuidance} = require('../module/getLearnGuidance');

const learnGuidanceRouter = express.Router();

learnGuidanceRouter.get('/courseMaterial', getAllLearnGuidance);

module.exports = learnGuidanceRouter;