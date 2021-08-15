// Write your "projects" router here!
const express = require('express');
const projectInfo = require('./projects-model');
const { validateField } = require('./projects-middleware');
const router = express.Router();


router.get('/', async (req, res) => {
  const projects = await projectInfo.get();
  res.status(200).json(projects);
})

router.get('/:id', async (req,res) => {
   await projectInfo.get(req.params.id)
    .then((projectID) => {
      if (projectID) {
      res.status(200).json(projectID)
      } else {
        res.status(404).json({
          message: "Project not found"
        })
      }
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: "Error retrieving projects",
      })
    })
})

router.post('/', validateField, async (req,res) => {
  await projectInfo.insert(req.body);
  res.status(200).json(req.body);
});

router.put('/:id', validateField, async (req, res) => {
  await projectInfo.get(req.params.id)
    .then((projectID) => {
      if (projectID) {
      res.status(200).json(projectID)
      } else {
        res.status(404).json({
          message: "Project not found"
        })
      }
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: "Error updating projects",
      })
    })
})

module.exports = router