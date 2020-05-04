const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const project = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(project);

  return response.status(200).json(project);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const {techs, title, url} = request.body;
  
  const repoIndex = repositories.findIndex(repository => repository.id === id);

  if(repoIndex < 0) {
    return response.status(400).json({error: 'Repository not found'});
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: 0
  }

  repositories[repoIndex] = repository;

  response.status(200).json(repository);


});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex(repository => repository.id === id);

  if(repoIndex < 0){
    return response.status(400).json({error:'Repository not found'});
  }

  repositories.splice(repoIndex,1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex(repository => repository.id === id);
  
  if(repoIndex < 0){
    return response.status(400).json({error: 'Repository not found'});
  }

  const repository = repositories[repoIndex];
  
  repository.likes++;

  return response.json(repository);

});

module.exports = app;
