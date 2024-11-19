// Suponiendo que ya tienes este array de productos en localStorage
let productos = JSON.parse(localStorage.getItem('productos')) || [];

// Esta función busca productos por nombre
function buscarProductoVenta() {
    const busqueda = document.getElementById("busquedaProductoVenta").value.toLowerCase();
    const resultados = productos.filter(producto => 
        producto.nombre.toLowerCase().includes(busqueda)
    );

    mostrarResultados(resultados);
}

// Esta función muestra los resultados de la búsqueda en la tabla
function mostrarResultados(resultados) {
    const tabla = document.getElementById("productosVentaTabla");
    tabla.innerHTML = "<tr><th>Producto</th><th>Cantidad</th><th>Precio Unitario</th></tr>"; // Reiniciar la tabla

    resultados.forEach(producto => {
        const fila = `<tr>
                        <td>${producto.nombre}</td>
                        <td><input type="number" value="0" min="0" id="cantidad_${producto.id}" onchange="actualizarTotal()"></td>
                        <td>${producto.precio}</td>
                      </tr>`;
        tabla.innerHTML += fila;
    });
}

// Esta función actualiza el total en base a las cantidades ingresadas
function actualizarTotal() {
    const tabla = document.getElementById("productosVentaTabla");
    const filas = tabla.getElementsByTagName("tr");
    let total = 0;

    for (let i = 1; i < filas.length; i++) { // Comenzar desde 1 para omitir encabezados
        const celdaCantidad = filas[i].getElementsByTagName("input")[0];
        const celdaPrecio = filas[i].cells[2];

        const cantidad = parseInt(celdaCantidad.value) || 0;
        const precio = parseFloat(celdaPrecio.innerText) || 0;

        total += cantidad * precio;
    }

    document.getElementById("totalVenta").innerText = total.toFixed(2);
}

// Esta función genera la factura y actualiza el stock
// Esta función genera la factura y actualiza el stock
function generarVenta() {
    const totalVenta = parseFloat(document.getElementById("totalVenta").innerText);

    // Validación: No se ha seleccionado ningún producto
    if (totalVenta === 0) {
        alert("No se ha seleccionado ningún producto.");
        return;
    }

    // Solicitar el monto de pago
    const pago = parseFloat(prompt("¿Con cuánto dinero se pagará?"));
    if (isNaN(pago) || pago < totalVenta) { // Asegurarnos de que sea un número válido
        alert("El pago debe ser un número mayor o igual al total.");
        return;
    }

    // Calcular cambio
    const cambio = pago - totalVenta;

    const mensajeVenta = document.getElementById("mensajeVenta");
    const tabla = document.getElementById("productosVentaTabla");
    const filas = tabla.getElementsByTagName("tr");
    let factura = [];

    // Recorrer las filas de la tabla
    for (let i = 1; i < filas.length; i++) { // Comenzar desde 1 para omitir encabezados
        const celdaProducto = filas[i].cells[0];
        const celdaCantidad = filas[i].getElementsByTagName("input")[0];
        const celdaPrecio = filas[i].cells[2];

        const nombreProducto = celdaProducto.innerText;
        const cantidad = parseInt(celdaCantidad.value) || 0;
        const precio = parseFloat(celdaPrecio.innerText) || 0; // Asegurarnos de que el precio sea un número

        if (cantidad > 0) {
            factura.push({ nombre: nombreProducto, cantidad: cantidad, precio: precio });

            // Actualizar stock del producto
            const producto = productos.find(p => p.nombre === nombreProducto);
            if (producto) {
                producto.cantidad = Math.max(0, producto.cantidad - cantidad); // Restar cantidad comprada
            }
        }
    }

    // Obtener las ventas existentes desde localStorage
    const ventas = JSON.parse(localStorage.getItem('ventas')) || [];  // Aseguramos que se usa 'ventas' en lugar de 'facturas'

    // Asignar un folio único basado en el número de ventas
    const folio = ventas.length > 0 ? ventas[ventas.length - 1].folio + 1 : 1; // Incrementamos el folio basándonos en la última venta

    // Crear una nueva venta con el folio
    const nuevaVenta = {
        tipo: "venta",  // Especificamos el tipo como "venta"
        folio: folio,  // Asignamos el folio calculado
        total: totalVenta, 
        cambio: cambio, 
        productos: factura, 
        fecha: new Date().toLocaleString()
    };

    // Guardar la nueva venta en el array de ventas
    ventas.push(nuevaVenta);

    // Guardar las ventas en localStorage
    localStorage.setItem('ventas', JSON.stringify(ventas));

    // Actualizar productos en localStorage
    localStorage.setItem('productos', JSON.stringify(productos));

    // Mensaje de éxito
    mensajeVenta.innerText = `Venta generada exitosamente. Folio: ${folio}, Total: $${totalVenta.toFixed(2)}, Cambio: $${cambio.toFixed(2)}`;
}
