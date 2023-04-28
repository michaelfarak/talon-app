const express = require('express');
const app = express();

const eventsRouter = express.Router();
let Event = require('../model/event');

const data = require('../data.json');

eventsRouter.get('/events-json',  (req, res) => {
  res.json(data)
})

eventsRouter.get('/filtered-events-json', (req, res) => {
  const filters = req.query.filters.split(', ');
  const filteredData = filterData(data, filters);
  res.json(filteredData);
})


function filterData(data,filters){
  return data.filter((item) => {
    return !filters.some((filter) => {
      const regex = new RegExp("\\b" + filter + "\\b", "i");
      return JSON.stringify(item).match(regex)
    });
  });
}


// TODO endpoints with mongo



module.exports = eventsRouter;
