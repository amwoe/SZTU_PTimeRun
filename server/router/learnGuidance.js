const express = require('express');

const {courseMaterial,reviewMaterial,learnGuidance} = require('../module/getLearnGuidance');

const learnGuidanceRouter = express.Router();

learnGuidanceRouter.get('/courseMaterial', courseMaterial);
learnGuidanceRouter.get('/reviewMaterial', reviewMaterial);
learnGuidanceRouter.get('/learnGuidance', learnGuidance);

module.exports = learnGuidanceRouter;