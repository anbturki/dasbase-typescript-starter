import express from 'express';

const app = express();

app.get('/', (request, response) => {
  response.send('Got your request.');
});
app.listen(3939, () => {
  console.log('App up and running correctly');
});
