import Router from 'express'
import { ShoppingCart } from '../src/ShoppingCart.js';
import { ProductManager } from '../src/ProductManager.js';


const router = Router();

const shoppingCart = new ShoppingCart('./productsToCart.json');
const manager = new ProductManager('./products')


// Ruta para ver los productos en el carrito
router.get('/', (req, res) => {
    const productsInCart = shoppingCart.getAllProductsInCart();
    res.json(productsInCart);
});


// Ruta para agregar un producto al carrito
router.post('/:productId', async (req, res) => {
    const productId = req.params.productId;
    const cantidad = req.body.cantidad;
    console.log(productId)
    console.log(cantidad)
    try {
        // Obtener el producto del ProductManager o cualquier otra fuente
        const product = await manager.getProductById(+productId);

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Agregar el producto al carrito
        shoppingCart.addProductToCart(cantidad, product);
        res.status(200).json({ message: 'Producto agregado al carrito correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el producto al carrito' });
    }
});





export default router;

