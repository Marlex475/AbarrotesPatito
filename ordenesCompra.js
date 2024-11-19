// Suponiendo que ya tienes este array de productos en localStorage
let productos = JSON.parse(localStorage.getItem('productos')) || [];

// Esta función busca productos por nombre
function buscarProducto() {
    const busqueda = document.getElementById("busquedaProducto").value.toLowerCase();
    const resultados = productos.filter(producto => 
        producto.nombre.toLowerCase().includes(busqueda)
    );

    mostrarResultados(resultados);
}

// Esta función muestra los resultados de la búsqueda en la tabla
function mostrarResultados(resultados) {
    const tabla = document.getElementById("productosTabla");
    tabla.innerHTML = "<tr><th>Producto</th><th>Cantidad</th><th>Precio Unitario</th></tr>"; // Reiniciar la tabla

    resultados.forEach(producto => {
        const fila = `<tr>
                        <td>${producto.nombre}</td>
                        <td><input type="number" value="1" min="1" id="cantidad_${producto.id}"></td>
                        <td>${producto.precio}</td>
                      </tr>`;
        tabla.innerHTML += fila;
    });
}

// Esta función genera la factura
// Esta función genera la factura de compra
// Esta función genera la factura de compra
function generarFactura() {
    const mensajeCompra = document.getElementById("mensajeCompra");
    const tabla = document.getElementById("productosTabla");
    const filas = tabla.getElementsByTagName("tr");
    let total = 0;
    let factura = [];

    for (let i = 1; i < filas.length; i++) { // Comenzar desde 1 para omitir encabezados
        const celdaProducto = filas[i].cells[0];
        const celdaCantidad = filas[i].getElementsByTagName("input")[0];
        const celdaPrecio = filas[i].cells[2];

        const nombreProducto = celdaProducto.innerText;
        const cantidad = parseInt(celdaCantidad.value);
        const precio = parseFloat(celdaPrecio.innerText);

        if (cantidad > 0) {
            total += cantidad * precio;

            // Guardar detalles de la factura
            factura.push({ nombre: nombreProducto, cantidad: cantidad, precio: precio });

            // Actualizar stock del producto
            const producto = productos.find(p => p.nombre === nombreProducto);
            if (producto) {
                producto.cantidad = parseInt(producto.cantidad) + cantidad; // Aumentar cantidad comprada
            }
        }
    }

    // Verificar si se generó alguna compra
    if (factura.length === 0) {
        mensajeCompra.innerText = "No se seleccionaron productos para la compra.";
        return;
    }

    // Guardar la factura de compra en localStorage, en el contenedor 'compras'
    const compras = JSON.parse(localStorage.getItem('compras')) || [];  // Cambiar 'facturas' por 'compras'
    const folioCompra = compras.length + 1;  // Asignar un folio único a la compra
    compras.push({
        tipo: "compra",  // Agregar tipo de reporte (compra)
        folio: folioCompra,  // Asignar un folio
        total: total, 
        productos: factura, 
        fecha: new Date().toLocaleString()
    });

    // Guardar las compras en localStorage
    localStorage.setItem('compras', JSON.stringify(compras));

    // Actualizar productos en localStorage
    localStorage.setItem('productos', JSON.stringify(productos));

    // Mostrar mensaje de éxito
    mensajeCompra.innerText = `Compra generada exitosamente. Folio: ${folioCompra}, Total: $${total.toFixed(2)}`;
}
