import fs from 'fs';

export class ShoppingCart {
    constructor(path) {
        this.products = [];
        this.path = path;
    }

    generateIdShop() {
        let id = 1;

        if (this.products.length > 0) {
            const lastProduct = this.products[this.products.length - 1];
            id = lastProduct.id + 1;
        }

        return id;
    }

    addProductToCart(stock, { title = '', description = '', code = '', price = '', thumbnail = '' } = product) {
        try {
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

            const data = JSON.stringify(this.products);
            fs.writeFileSync(this.path, data, 'utf-8');



            console.log('Producto agregado al carrito correctamente.');
        } catch (error) {
            console.error('Error al agregar el producto al carrito:', error);
        }
    }

    async getAllProductsInCart() {
        return this.products
        /*  try {
             let products = [];
 
             const data = await fs.promises.readFile(this.path, 'utf-8');
             const fileProducts = JSON.parse(data);
 
             if (fileProducts.length > 0) {
                 products = fileProducts;
             }
 
             products = products.concat(this.products);
 
             return products;
         } catch (err) {
             console.error('Error al obtener los productos:', err);
             return [];
         } */
    }
}
