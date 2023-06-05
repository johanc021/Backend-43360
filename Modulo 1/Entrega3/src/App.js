import express from 'express'
import { ProductManager } from './ProductManager.js';

const app = express();

const manager = new ProductManager('./productos.txt');

// Instanciando ProducManager para crear 3 productos
manager.addProduct({ title: 'Producto 1', description: 'Descripción del producto 1', price: 10, thumbnail: 'https://url-del-thumbnail-1', code: 'A9374', stock: 5 });
manager.addProduct({ title: 'Producto 2', description: 'Descripción del producto 2', price: 20, thumbnail: 'https://url-del-thumbnail-2', code: 'A6587', stock: 10 });
manager.addProduct({ title: 'Producto 3', description: 'Descripción del producto 3', price: 30, thumbnail: 'https://url-del-thumbnail-3', code: 'A3214', stock: 15 });


// Ruta Home

/*    http://localhost:8090/    */

app.get('/', (req, res) => {
    res.send('¡Estas en el Home!');
});


// Rutas para obtener productos por id y limit

/*    http://localhost:8090/products     -->  Muestra todos los productos      */
/*    http://localhost:8090/products?limit=2  --> Muestra 2 productos o de acuerdo al limit enviado por query params    */

app.get('/products', async (req, res) => {
    const { limit } = req.query;
    try {
        const products = await manager.getProducts(parseInt(limit));
        res.json(products);
    } catch (error) {
        res.status(500).send('Error al obtener los productos.');
    }
});


// Ruta para devolver un producto por su id

/*     http://localhost:8090/product/A9374    */

app.get('/product/:code', async (req, res) => {
    const code = req.params.code;
    try {
        const product = await manager.getProductById(code);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).send(`Producto con código ${code} no encontrado.`);
        }
    } catch (error) {
        res.status(500).send('Error al obtener el producto');
    }
});

app.listen(8090, () => console.log('Escuchando en el puerto http://localhost:8090/'))