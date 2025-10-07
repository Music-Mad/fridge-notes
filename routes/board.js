import express from 'express';
import path from 'path';
const router = express.Router();

//Get dirname 
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));



export default router;