import express from 'express'
import productsRoutes from '../routes/products.router.js'
import cartRoutes from '../routes/cart.router.js'


const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* app.use(express.static(`${__dirname}/public`)); */

app.use('/api/products', productsRoutes)
app.use('/api/add-to-cart', cartRoutes)
app.use('/api/carts', cartRoutes)


app.listen(8090, () => console.log('Escuchando en el puerto http://localhost:8090/'))