import express from 'express';
import { checkDatabase } from './config/config.js';
const app = express();

app.use(express.json());

import clientRoutes from './route/clientRoutes.js';

// Use routes
app.use('/clientes', clientRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;

checkDatabase().then(() => {
  app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch(error => {
  console.error('Falha ao inicializar o banco de dados:', error);
});
