import fs from 'fs'

export class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = path
    }

    // generar id autoincrementable
    generateId() {
        if (this.products.length > 0) {
            const lastProduct = this.products[this.products.length - 1];
            this.code = lastProduct.code + 1;
        } else {
            this.code = 1;
        }
        return this.code;
    }

    addProduct({ title = '', description = '', price = 0, thumbnail = '', code = '', stock = 0 } = {}) {

        //Validando los datos ingresados
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log('Error: Debes proporcionar todos los valores obligatorios.');
            return;
        }

        // Creando nuevo producto
        const newProduct = {
            id: this.generateId(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        this.products.push(newProduct);
        fs.writeFileSync(this.path, JSON.stringify(this.products), 'utf8');
    }

    // obtener productos
    async getProducts(limit) {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);
            if (limit) {
                return products.slice(0, limit);
            }
            return products;
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    // obtener un producto por su codigo (code)
    async getProductById(code) {

        try {
            // leer el archivo
            const data = await fs.readFileSync(this.path, 'utf-8');
            // parsear los datos como un array de objetos
            const products = JSON.parse(data);
            // buscar el producto por su código
            const product = products.find((p) => p.code === code);
            if (product) {
                return product;
            }

        } catch {
            console.log(`Producto con código ${code} no encontrado.`);
            return null;
        }

    }

    //Actualizar un producto
    updateProduct(code, { title, description, price, thumbnail, stock } = {}) {
        const productIndex = this.products.findIndex((p) => p.code === code);
        if (productIndex !== -1) {
            const product = this.products[productIndex];
            product.title = title || product.title;
            product.description = description || product.description;
            product.price = price || product.price;
            product.thumbnail = thumbnail || product.thumbnail;
            product.stock = stock || product.stock;
            this.products[productIndex] = product;
            fs.writeFileSync(this.path, JSON.stringify(this.products), 'utf8');
            console.log(`Producto con código ${code} ha sido actualizado.`);
        } else {
            console.log(`Producto con código ${code} no encontrado.`);
        }
    }

    //Eliminar un producto
    deleteProduct(code) {
        fs.readFile(this.path, 'utf8', (err, data) => {
            if (err) {
                console.log(`Error al leer el archivo: ${err}`);
                return;
            }

            let products = JSON.parse(data);
            const productIndex = products.findIndex((p) => p.code === code);

            if (productIndex !== -1) {
                products.splice(productIndex, 1);
                console.log(`Producto con código ${code} ha sido eliminado.`);

                fs.writeFile(this.path, JSON.stringify(products), (err) => {
                    if (err) {
                        console.log(`Error al escribir en el archivo: ${err}`);
                    }
                });
            } else {
                console.log(`Producto con código ${code} no encontrado.`);
            }
        });
    }
}

//peticiones

// Creando instancia
/* const manager = new ProductManager('./productos.txt');

// Agregando algunos productos
manager.addProduct({ title: 'Producto 1', description: 'Descripción del producto 1', price: 10, thumbnail: 'https://url-del-thumbnail-1', code: 'A9374', stock: 5 });
manager.addProduct({ title: 'Producto 2', description: 'Descripción del producto 2', price: 20, thumbnail: 'https://url-del-thumbnail-2', code: 'A6587', stock: 10 });
manager.addProduct({ title: 'Producto 3', description: 'Descripción del producto 3', price: 30, thumbnail: 'https://url-del-thumbnail-3', code: 'A3214', stock: 15 });

// Obtenemos todos los productos agregados hasta el momento
const products = manager.getProducts();
console.log(products);

// Intentando obtener un producto que no existe
const productNotFound = manager.getProductById('A6333');
console.log(productNotFound)

// obtener un producto por su code
const product = manager.getProductById('A6587');
console.log(product);

// Modificar un producto por su codigo
manager.updateProduct('A9374', { title: 'Producto 1 Mod', description: 'Descripcion Producto1 Mod', price: 25, thumbnail: 'https://url-del-thumbnail-1-modificado', stock: 12 })


// Eliminar un producto por su codigo
manager.deleteProduct('A6587');
console.log(manager.getProducts()); */


