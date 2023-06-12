import fs from 'fs';

export class ShoppingCart {
    constructor(path) {
        this.productsInCart = [];
        this.path = path;
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

        const productToCart = {
            id: this.generateIdShop(),
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

    getAllProductsInCart() {
        return this.productsInCart;
    }
}