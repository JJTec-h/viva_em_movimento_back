import express from 'express';
const router = express.Router();
import {createClient, updateClient, deleteClient, getAllClients, getClient} from '../controller/clientController.js';

// Define routes
router.post('/', createClient);
router.get('/', getAllClients);
router.get('/:id', getClient);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

export default router;
