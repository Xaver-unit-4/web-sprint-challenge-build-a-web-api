// Write your "actions" router here!
const express = require("express");
const actionInfo = require('./actions-model');
const { validateField, validateProjectId } = require('../projects/projects-middleware');
const router = express.Router();

router.get('/', async (req, res) => {
  const projects = await actionInfo.get();
  res.status(200).json(projects);
})

router.get('/:id', async (req,res) => {
  await actionInfo.get(req.params.id)
   .then((actionID) => {
     if (actionID) {
     res.status(200).json(actionID)
     } else {
      res.status(404).json({
        message: "Action not found",
      })
     }
   })
   .catch((error) => {
     console.log(error)
     res.status(500).json({
       message: "Error retrieving actions",
     })
   })
})

router.post('/', validateProjectId, validateField, async (req,res) => {
  await actionInfo.insert(req.body);
  res.status(200).json(req.body);
});




module.exports = router