import express from 'express';
const router = express.Router();
import {createClient, updateClient, deleteClient, getAllClients, getClient, getCountActiveClients} from '../controller/clientController.js';

router.get('/quantidade', getCountActiveClients);
router.post('/', createClient);
router.get('/', getAllClients);
router.get('/:id', getClient);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

export default router;
