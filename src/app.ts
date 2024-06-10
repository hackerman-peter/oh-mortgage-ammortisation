import express from 'express';
import bodyParser from 'body-parser';
import amortisationRoutes from './routes/amortisationRoutes';

const app = express();

app.use(bodyParser.json());
app.use('/api', amortisationRoutes);

export default app;