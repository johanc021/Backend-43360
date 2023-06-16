import Router from 'express'
import { ShoppingCart } from '../src/ShoppingCart.js';
import { ProductManager } from '../src/ProductManager.js';


const router = Router();

const shoppingCart = new ShoppingCart('./cart.json');
const manager = new ProductManager('./products.json')


// Ruta para ver los productos en el carrito
router.get('/', (req, res) => {
    const productsInCart = shoppingCart.getAllProductsInCart();
    res.json(productsInCart);
});


// Ruta para crear un nuevo carrito
router.post('/', (req, res) => {
    // Generar un ID único para el carrito
    shoppingCart.createCart();

    res.status(200).json({ message: 'Carrito creado.' });
});


// ruta para Consultar Carrito por ID
router.get('/:cid', async (req, res) => {
    const cartId = parseInt(req.params.cid);
    /* console.log("ID del carrito en los parámetros: " + cartId); */

    try {
        const cartProducts = await shoppingCart.getProductsInCartById(cartId);
        /* console.log(cartProducts); */

        if (cartProducts) {
            res.json(cartProducts);
        } else {
            res.status(404).json({ error: 'El carrito no existe o no contiene productos.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos del carrito.' });
    }
});

//ruta para agregar producto en carrito
router.post('/:cid/product/:pid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);

    const product = manager.getProductById(productId);

    if (product) {
        const isAdded = shoppingCart.addProductToCart(cartId, product);

        if (isAdded) {
            res.json({ message: 'Producto agregado correctamente.' });
        } else {
            res.json({ message: 'El producto ya existe en el carrito.' });
        }
    } else {
        res.status(404).json({ error: 'El producto no existe.' });
    }
});

export default router;

