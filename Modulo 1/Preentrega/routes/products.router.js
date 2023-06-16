import { Router } from 'express'
import { ProductManager } from '../src/ProductManager.js'

const router = Router();

const manager = new ProductManager('./products.json');

// Ruta para obtener todos los productos
// http://localhost:8090/api/products

router.get('/', async (req, res) => {
    try {
        const products = await manager.getProducts();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});


// Ruta para crear un nuevo producto
router.post('/', async (req, res) => {

    const {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnail,
    } = req.body;

    // Verificar que se proporcionen todos los valores obligatorios
    /* if (!title || !description || !code || !price || status || !stock || !category || !thumbnail) {
        return res
            .status(400)
            .json({ error: 'Debes proporcionar todos los valores obligatorios' });
    } */

    // Crear el nuevo producto
    const newProduct = {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnail,
    };

    try {
        await manager.addProduct(newProduct);
        res.status(201).json({ message: 'Producto creado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al crear el producto' });
    }
});

// Ruta para obtener un producto por su ID
//http://localhost:8090/api/products/:pid

router.get('/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await manager.getProductById(+productId);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

// Ruta para actualizar un producto por su ID
router.put('/:id', (req, res) => {
    const productId = req.params.id;
    const {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnail,
    } = req.body;

    // Verificar que se proporcionen todos los valores obligatorios
    if (!title || !description || !price || !thumbnail || !code || !stock) {
        return res
            .status(400)
            .json({ error: 'Debes proporcionar todos los valores obligatorios' });
    }

    // Actualizar el producto
    const updatedProduct = {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnail,
    };

    try {
        manager.updateProduct(+productId, updatedProduct);
        res.json({ message: 'Producto actualizado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
});


//Ruta para eliminar un producto por Id
//http://localhost:8090/api/products/:id

router.delete('/:id', async (req, res) => {
    const productId = parseInt(req.params.id);

    try {
        const product = await manager.getProductById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        manager.deleteProduct(productId);

        res.json({ message: 'Producto eliminado exitosamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});

// Exportacion
export default router;