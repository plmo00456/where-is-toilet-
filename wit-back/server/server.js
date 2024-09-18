const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/api', (req, res) => {
  res.send({hello: 'hello'})
})

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})