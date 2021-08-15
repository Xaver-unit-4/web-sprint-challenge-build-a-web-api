// add middlewares here related to projects

const projectInfo = require('../projects/projects-model');

function logger(req, res, next) {
  const time = new Date().toISOString()
  console.log(`${time} ${req.ip} ${req.method} ${req.url}`);
  next();
}

async function validateField(req, res, next) {
  const { completed } = await req.body;
  if (completed) {
    next()
  } else {
    res.status(400).json({ message: "missing required completed status" })
  }
}

async function validateProjectId(req, res, next) {
  const project_id = req.params.id;
  const project = await projectInfo.get(project_id)
  if (project_id) {
    req.project = project
    next()
  } else {
    res.status(404).json({ message: "project does not exist" })
  }
}

module.exports = {
  logger,
  validateField,
  validateProjectId
};





