import express from 'express'
import fs from 'fs'
import { ProductManager } from '../ProductManager.js';
import { socketServer } from '../App.js'

const router = express.Router();

const manager = new ProductManager('./products.json')

/* router.get('/', (req, res) => {
    const data = fs.readFileSync('./products.json', 'utf-8');
    const products = JSON.parse(data);

    res.render('realTimeProducts', { products });
}); */


router.get('/', (req, res) => {

    const data = fs.readFileSync('./products.json', 'utf-8');
    const products = JSON.parse(data);
    // Emitir evento 'updateProducts' con la lista de productos

    socketServer.emit('updateProducts', products)
    res.render('realTimeProducts', { products });
});

export default router;