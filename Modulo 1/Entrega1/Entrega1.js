class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct({ title = '', description = '', price = 0, thumbnail = '', code = '', stock = 0 } = {}) {

        //Validando los datos ingresados
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log('Error: Debes proporcionar todos los valores obligatorios.');
            return;
        }

        // Creando nuevo producto
        const newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.products.push(newProduct);
    }

    // obtener productos
    getProducts() {
        return this.products;
    }

    // obtener un producto por su codigo (code)
    getProductById(code) {
        const product = this.products.find((p) => p.code === code);
        if (product) {
            return product;
        } else {
            console.log(`Producto con codigo ${code} no encontrado.`);
            return null;
        }
    }
}



//peticiones

// Creando instancia
const manager = new ProductManager();

// Agregando algunos productos
manager.addProduct({ title: 'Producto 1', description: 'Descripción del producto 1', price: 10, thumbnail: 'https://url-del-thumbnail-1', code: 'A9374', stock: 5 });
manager.addProduct({ title: 'Producto 2', description: 'Descripción del producto 2', price: 20, thumbnail: 'https://url-del-thumbnail-2', code: 'A6587', stock: 10 });
manager.addProduct({ title: 'Producto 3', description: 'Descripción del producto 3', price: 30, thumbnail: 'https://url-del-thumbnail-3', code: 'A3214', stock: 15 });

// Obtenemos todos los productos agregados hasta el momento
const products = manager.getProducts();
console.log(products);

// obtener un producto por su code
const product = manager.getProductById('A6587');
console.log(product);

// Intentando obtener un producto que no existe
const productNotFound = manager.getProductById('A6333');
/* console.log(productNotFound) */


