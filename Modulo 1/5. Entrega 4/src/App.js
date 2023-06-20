import express from 'express'
import handlebars from 'express-handlebars'
import productsRoutes from './routes/products.router.js'
import cartRoutes from './routes/cart.router.js'
import wsRoutes from './routes/views.router.js'
import __dirname from './utils.js';
import { Server } from 'socket.io'


const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const httpserver = app.listen(8090, () => console.log('Escuchando en el puerto http://localhost:8090/'))

const socketServer = new Server(httpserver)

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(`${__dirname}/public`));


app.use('/api/products', productsRoutes)
app.use('/api/add-to-cart', cartRoutes)
app.use('/api/carts', cartRoutes)
app.use('/api/realtimeproducts', wsRoutes)

socketServer.on('connection', socket => {
    console.log('Nuevo Cliente con id # ' + socket.id)
    /* socket.on('message', data => {
        console.log(data)
    })
    socket.emit('evento_para_socket', "mensaje para que lo reciba socket cliente") */

    /* socket.on('addProduct', product => {
        // Agrega la lógica para agregar el producto al archivo JSON y emitir el evento 'updateProducts' con la lista actualizada
    });

    socket.on('deleteProduct', productId => {
        // Agrega la lógica para eliminar el producto del archivo JSON y emitir el evento 'updateProducts' con la lista actualizada
    }); */
})

export { app, socketServer };