const socket = io();
const productList = document.getElementById("productList");

socket.on('updateProducts', (products) => {
    console.log("estoy actualizando los productos")

    // Generar el HTML de los productos
    const productsHTML = products.map(product => `<li>${product.title}</li>`).join("");

    // Asignar el HTML generado al elemento "productList"
    productList.innerHTML = productsHTML;
});
/* socket.emit('message', "Estoy en ws")

socket.on('evento_para_socket', data => {
    console.log(data)
}) */