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
            this.id = lastProduct.id + 1;
        } else {
            this.id = 1;
        }
        return this.id;
    }

    addProduct({ title = '', description = '', code = '', price = 0, status = true, stock = 0, category = '', thumbnail = '' } = {}) {

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
            code,
            price,
            status,
            stock,
            category,
            thumbnail
        };

        this.products.push(newProduct);
        fs.writeFileSync(this.path, JSON.stringify(this.products), 'utf8');
    }

    // obtener productos
    async getProducts(limit) {
        try {
            const fileExists = await fs.promises.access(this.path)
                .then(() => true)
                .catch(() => false);

            if (fileExists) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                this.products = JSON.parse(data);
            } else {
                console.log(`El archivo ${this.path} no se encontró. Se utilizarán los productos en memoria.`);
            }

            if (limit) {
                return this.products.slice(0, limit);
            }

            return this.products;
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    // obtener un producto por su id
    /* async getProductById(id) {
        //console.log(id)
        try {
            // leer el archivo
            const data = await fs.readFile(this.path, 'utf-8');
            // parsear los datos como un array de objetos
            const products = JSON.parse(data);
            // buscar el producto por su código
            const product = products.find((p) => p.id === id);
            if (product) {
                return product;
            }

        } catch {
            console.log(`Producto con id ${id} no encontrado.`);
            return null;
        }

    } */

    getProductById(productId) {
        /* console.log(productId) */
        // Leer el contenido actual del archivo JSON
        const data = fs.readFileSync(this.path, 'utf-8');
        const products = JSON.parse(data);

        // Buscar el producto por ID
        const product = products.find(p => p.id === productId);

        return product;
    }

    //Actualizar un producto
    updateProduct(id, { title, description, code, price, status, stock, category, thumbnail } = {}) {
        console.log(id)
        const productIndex = this.products.findIndex((p) => p.id === id);
        console.log(productIndex)
        if (productIndex !== -1) {
            const product = this.products[productIndex];
            product.title = title || product.title;
            product.description = description || product.description;
            product.code = code || product.code;
            product.price = price || product.price;
            product.status = status || product.status;
            product.stock = stock || product.stock;
            product.category = category || product.category;
            product.thumbnail = thumbnail || product.thumbnail;
            this.products[productIndex] = product;
            fs.writeFileSync(this.path, JSON.stringify(this.products), 'utf8');
            console.log(`Producto con ID ${id} ha sido actualizado.`);
        } else {
            console.log(`Producto con ID ${id} no encontrado.`);
        }
    }

    //Eliminar un producto

    deleteProduct(id) {
        fs.promises.readFile(this.path, 'utf8')
            .then((data) => {
                let products = JSON.parse(data);
                const productIndex = products.findIndex((p) => p.id === id);

                if (productIndex !== -1) {
                    products.splice(productIndex, 1);
                    console.log(`Producto con id ${id} ha sido eliminado.`);

                    return fs.promises.writeFile(this.path, JSON.stringify(products), 'utf8');
                } else {
                    console.log(`Producto con id ${id} no encontrado.`);
                    throw new Error('Producto no encontrado');
                }
            })
            .catch((err) => {
                console.log(`Error al eliminar el producto: ${err}`);
            });
    }
}


