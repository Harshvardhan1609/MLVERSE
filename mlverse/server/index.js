const express = require('express');
const cors = require('cors');
const projects = require('./data/projects');

const app = express();
const PORT = 5000;

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());

app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
