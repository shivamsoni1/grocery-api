import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import 'dotenv/config';
import router from './router';
import { buildApp } from './app';

const app = express();
buildApp(app);

app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/', router);

const server = http.createServer(app);

server.listen(3000, () => {
    console.log('Server running...');
});