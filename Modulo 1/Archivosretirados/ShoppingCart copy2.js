import fs from 'fs';

export class ShoppingCart {
    constructor(path) {
        if (ShoppingCart.instance) {
            return ShoppingCart.instance;
        }
        this.productsInCart = [];
        this.path = path;

        ShoppingCart.instance = this;
    }

    generateIdShop() {
        let id = 1;

        if (this.productsInCart.length > 0) {
            const lastProduct = this.productsInCart[this.productsInCart.length - 1];
            id = lastProduct.id + 1;
        }

        return id;
    }

    loadProductsFromJson() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.productsInCart = JSON.parse(data);
        } catch (error) {
            // Si ocurre un error al leer el archivo, se considera como que el archivo no existe
            // Se crea un archivo vacío con un array vacío de productos
            this.saveProductsToJson();
        }
    }

    saveProductsToJson() {
        const data = JSON.stringify(this.productsInCart);
        fs.writeFileSync(this.path, data, 'utf-8');
    }

    addProductToCart(cantidad, { title, description, code, price, stock, thumbnail } = product) {
        const id = this.generateIdShop();

        const productToCart = {
            id,
            title,
            description,
            code,
            price,
            stock,
            thumbnail,
            cantidad
        };

        this.productsInCart.push(productToCart);
        this.saveProductsToJson();

        console.log('Producto agregado al carrito correctamente.');
    }

    /* addProductToCart(stock, { title = '', description = '', code = '', price = '', thumbnail = '' } = product) {
        try {

            // Leer los productos existentes del archivo json
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);

            const id = this.generateIdShop();
            const productToCart = {
                id,
                title,
                description,
                code,
                price,
                stock,
                thumbnail
            };

            this.productsInCart.push(productToCart);

            const data = JSON.stringify(this.productsInCart);
            fs.writeFileSync(this.path, data, 'utf-8');



            console.log('Producto agregado al carrito correctamente.');
        } catch (error) {
            console.error('Error al agregar el producto al carrito:', error);
        }
    } */

    /* addProductToCart(stock, { title = '', description = '', code = '', price = '', thumbnail = '' } = product) {
        try {
            // Leer los productos existentes del archivo
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
    
            const id = this.generateIdShop();
            const productToCart = {
                id,
                title,
                description,
                code,
                price,
                stock,
                thumbnail
            };
    
            this.products.push(productToCart);
    
            const newData = JSON.stringify(this.products);
            fs.writeFileSync(this.path, newData, 'utf-8');
    
            console.log('Producto agregado al carrito correctamente.');
        } catch (error) {
            console.error('Error al agregar el producto al carrito:', error);
        }
    } */

    getAllProductsInCart() {
        console.log(this.productsInCart)
    }


}
