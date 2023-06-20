import fs from 'fs';

export class ShoppingCart {
    constructor(path) {
        this.productsInCart = [];
        this.path = path;
    }

    generateIdShop() {
        let id = 1;

        try {
            // Verificar si el archivo JSON existe
            if (fs.existsSync(this.path)) {
                // Leer el contenido actual del archivo JSON
                const data = fs.readFileSync(this.path, 'utf-8');
                const productsInCart = JSON.parse(data);

                // Verificar si hay carritos creados
                if (productsInCart.length > 0) {
                    const lastCart = productsInCart[productsInCart.length - 1];
                    id = lastCart.idShop + 1;
                }
            }
        } catch (error) {
            console.log(`Error al generar el ID del carrito: ${error}`);
        }

        return id;
    }

    getAllProductsInCart() {
        // Leer el contenido actual del archivo JSON
        let data = fs.readFileSync(this.path, 'utf-8');
        let productsInCart = JSON.parse(data);

        // Obtener todos los productos de todos los carritos con la estructura deseada
        let allProducts = [];
        for (const cart of productsInCart) {
            const cartProducts = {
                idShop: cart.id,
                products: cart.products
            };
            allProducts.push(cartProducts);
        }

        return allProducts;
    }

    createCart() {
        try {
            const idShop = this.generateIdShop();
            const newCart = {
                idShop,
                products: []
            };

            let data;
            let productsInCart = [];

            // Verificar si el archivo JSON ya existe
            if (fs.existsSync(this.path)) {
                // Leer el contenido actual del archivo JSON
                data = fs.readFileSync(this.path, 'utf-8');
                productsInCart = JSON.parse(data);
            }

            // Verificar si ya existe un carrito con el idShop especificado
            const existingCart = productsInCart.find(cart => cart.idShop === idShop);

            if (existingCart) {
                console.log(`El carrito con ID ${idShop} ya existe.`);
                return;
            }

            // Agregar el nuevo carrito al array productsInCart
            productsInCart.push(newCart);

            // Convertir el contenido actualizado en una cadena JSON
            data = JSON.stringify(productsInCart);

            // Escribir la cadena JSON en el archivo
            fs.writeFileSync(this.path, data, 'utf-8');

            console.log(`Carrito con ID ${idShop} creado correctamente.`);
        } catch (error) {
            console.log(`Error al crear el carrito: ${error}`);
        }
    }

    addProductToCart(idShop, product) {
        try {
            let data;
            let productsInCart = [];

            // Verificar si el archivo JSON ya existe
            if (fs.existsSync(this.path)) {
                // Leer el contenido actual del archivo JSON
                data = fs.readFileSync(this.path, 'utf-8');
                productsInCart = JSON.parse(data);
            }

            // Verificar si ya existe un carrito con el idShop especificado
            const existingCartIndex = productsInCart.findIndex((cart) => cart.idShop === idShop);

            if (existingCartIndex !== -1) {
                const existingCart = productsInCart[existingCartIndex];
                const existingProduct = existingCart.products.find((p) => p.id === product.id);

                if (existingProduct) {
                    // Si el producto ya existe en el carrito, mostrar un mensaje indicando que el producto ya está en el carrito
                    console.log('El producto ya está en el carrito.');
                    return false; // Retorna false indicando que no se pudo agregar el producto al carrito
                } else {
                    // Si el producto no existe en el carrito, se agrega al carrito existente
                    existingCart.products.push(product);
                }
            } else {
                // Si no existe un carrito, se muestra un mensaje indicando que primero se debe crear el carrito
                console.log('Debe crear primero el carrito antes de agregar productos.');
                return false; // Retorna false indicando que no se pudo agregar el producto al carrito
            }

            // Convertir el contenido actualizado en una cadena JSON
            data = JSON.stringify(productsInCart);

            // Escribir la cadena JSON en el archivo
            fs.writeFileSync(this.path, data, 'utf-8');

            console.log('Producto agregado al carrito correctamente.');
            return true; // Retorna true indicando que se agregó el producto al carrito
        } catch (error) {
            console.log(`Error al agregar el producto al carrito: ${error}`);
            return false; // Retorna false indicando que no se pudo agregar el producto al carrito
        }
    }

    getProductsInCartById(cartId) {
        /*         console.log(cartId) */
        try {
            // Leer el contenido actual del archivo JSON
            const data = fs.readFileSync(this.path, 'utf-8');
            const productsInCart = JSON.parse(data);
            /* console.log(productsInCart) */

            // Buscar el carrito con el ID especificado
            const cart = productsInCart.find(cart => +cart.idShop == cartId);

            // Verificar si se encontró el carrito
            if (cart) {
                return cart.products;
            }

            return null;
        } catch (error) {
            console.log(`Error al obtener los productos del carrito: ${error}`);
            return null;
        }
    }

}