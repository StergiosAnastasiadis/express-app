import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { db } from './db/connect.js';
import { notFound } from './middleware/not-found.middleware.js';
import router from './services/router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add Security Headers
app.use(helmet({ crossOriginEmbedderPolicy: false }));

// Enable CORS
app.use(cors());

// PostgreSQL
await db.connect();

app.use('/', router);
app.get('/', (req, res) => res.send('<h1>Hello Express!!!</h1>'));

app.use(notFound);

const port = process.env.PORT ?? 8000;
app.listen(port, () => {
  console.log(`Server listening on port: ${port.toString()}`);
});
