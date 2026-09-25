import express from 'express';
import cors from 'cors';
import apiRoutes from '../server/routes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Handle both /api and root paths cleanly in serverless environment
app.use('/api', apiRoutes);
app.use('/', apiRoutes);

export default app;
