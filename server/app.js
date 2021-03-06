import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import winston from 'winston';
import routes from './routes/routes';


// Create a top level instance of express
const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const port = process.env.PORT || 7000;

app.use('/api/v1/', routes);
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Politico' });
});

app.all('*', (req, res) => res.status(404).json({
  message: 'Wrong endpoint. Such endpoint does not exist',
}));

app.listen(port, () => {
  winston.info(`Server is live on PORT👍 : ${port}`);
});

export default app;
