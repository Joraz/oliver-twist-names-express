import express from 'express';
import { NameController } from './controllers/name.controller';
import { InMemoryNameStore } from './stores/name.store';

const app = express();
const nameCtrl = new NameController(new InMemoryNameStore());

app.set('port', process.env.PORT || 3000);

app.get('/name-count/:name', nameCtrl.getNameCount.bind(nameCtrl));

export default app;