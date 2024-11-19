function mostrarReporteVentas() {
    tipoReporte = "ventas";
    const busquedaContainer = document.getElementById("busquedaContainer");
    busquedaContainer.style.display = "block"; // Mostrar el campo de búsqueda

    // Obtener el valor de la búsqueda directamente desde el input
    const busquedaInput = document.getElementById("busqueda");
    const busqueda = busquedaInput.value.trim().toLowerCase();  // Usamos .trim() para eliminar espacios adicionales
    console.log("Valor de búsqueda:", busqueda); // Depuramos el valor del input de búsqueda

    const reporteContenido = document.getElementById("reporteContenido");

    // Obtener las ventas desde localStorage
    const ventasJSON = localStorage.getItem('ventas');
    if (!ventasJSON) {
        console.error("No se encontraron ventas en localStorage.");
        reporteContenido.innerHTML = "<p>No hay ventas registradas.</p>";
        return;
    }

    let ventas = [];
    try {
        ventas = JSON.parse(ventasJSON) || [];  // Intentamos parsear las ventas
    } catch (e) {
        console.error("Error al parsear las ventas desde localStorage:", e);
        ventas = [];  // Si hay error, aseguramos que ventas sea un arreglo vacío
    }

    // Si la búsqueda está vacía, mostramos todas las ventas
    if (busqueda === "") {
        console.log("Busqueda vacía, mostrando todas las ventas.");
        mostrarVentas(ventas);  // Mostramos todas las ventas
        return;
    }

    // Filtrar las ventas si hay búsqueda, solo por folio
    const ventasFiltradas = ventas.filter(venta => {
        // Asegurarnos de que la venta tenga un folio
        if (!venta.folio) {
            console.warn("Venta sin folio encontrada:", venta);  // Mostrar advertencia si falta el folio
            return false;  // Excluir esta venta de los resultados
        }

        // Convertir folio a string y hacer la comparación exacta
        const folio = venta.folio.toString(); // Convertimos folio a string

        // Mostrar en consola para verificar el filtro
        console.log("Filtrando venta con folio:", folio);

        // Filtrar exactamente por folio
        return folio === busqueda;
    });

    // Verificamos qué ventas están siendo filtradas
    console.log("Ventas filtradas:", ventasFiltradas);

    // Limpiar la tabla antes de agregar las ventas filtradas
    reporteContenido.innerHTML = '';

    // Verificar si hay ventas filtradas y mostrarlas
    if (ventasFiltradas.length > 0) {
        let html = "<h2>Reporte de Ventas</h2><table class='table'><thead class='thead-dark'><tr><th>Folio</th><th>Fecha</th><th>Total</th><th>Productos</th></tr></thead><tbody>";

        ventasFiltradas.forEach((venta) => {
            const productos = venta.productos.map(p => `${p.cantidad} x ${p.nombre}`).join(', ');
            html += `<tr>
                        <td>${venta.folio}</td>
                        <td>${venta.fecha}</td>
                        <td>$${venta.total.toFixed(2)}</td>
                        <td>${productos}</td>
                      </tr>`;
        });

        html += "</tbody></table>";
        reporteContenido.innerHTML = html; // Colocamos el HTML generado en el contenedor
    } else {
        // Si no se encuentran ventas filtradas, mostramos este mensaje
        reporteContenido.innerHTML = "<p>No se encontraron ventas que coincidan con tu búsqueda.</p>";
    }
}


// Función para mostrar todas las ventas cuando no hay filtro
function mostrarVentas(ventas) {
    const reporteContenido = document.getElementById("reporteContenido");
    let html = "<h2>Reporte de Ventas</h2><table class='table'><thead class='thead-dark'><tr><th>Folio</th><th>Fecha</th><th>Total</th><th>Productos</th></tr></thead><tbody>";

    ventas.forEach((venta) => {
        const productos = venta.productos.map(p => `${p.cantidad} x ${p.nombre}`).join(', ');
        html += `<tr>
                    <td>${venta.folio}</td>
                    <td>${venta.fecha}</td>
                    <td>$${venta.total.toFixed(2)}</td>
                    <td>${productos}</td>
                  </tr>`;
    });

    html += "</tbody></table>";
    reporteContenido.innerHTML = html; // Colocamos el HTML generado en el contenedor
}




// Mostrar reporte de compras
function mostrarReporteCompras() {
    tipoReporte = "compras";
    const busquedaContainer = document.getElementById("busquedaContainer");
    busquedaContainer.style.display = "block"; // Mostrar el campo de búsqueda

    // Obtener el valor de la búsqueda directamente desde el input
    const busquedaInput = document.getElementById("busqueda");
    const busqueda = busquedaInput.value.trim().toLowerCase();  // Usamos .trim() para eliminar espacios adicionales
    console.log("Valor de búsqueda:", busqueda); // Depuramos el valor del input de búsqueda

    const reporteContenido = document.getElementById("reporteContenido");

    // Obtener las compras desde localStorage (en lugar de facturas)
    const comprasJSON = localStorage.getItem('compras');
    if (!comprasJSON) {
        console.error("No se encontraron compras en localStorage.");
        reporteContenido.innerHTML = "<p>No hay compras registradas.</p>";
        return;
    }

    let compras = [];
    try {
        compras = JSON.parse(comprasJSON) || [];  // Intentamos parsear las compras
    } catch (e) {
        console.error("Error al parsear las compras desde localStorage:", e);
        compras = [];  // Si hay error, aseguramos que compras sea un arreglo vacío
    }

    // Si la búsqueda está vacía, mostramos todas las compras
    if (busqueda === "") {
        console.log("Busqueda vacía, mostrando todas las compras.");
        mostrarCompras(compras);  // Mostramos todas las compras
        return;
    }

    // Filtrar las compras si hay búsqueda, solo por folio
    const comprasFiltradas = compras.filter(compra => {
        // Convertir folio a string y hacer la comparación exacta
        const folio = compra.folio.toString(); // Convertimos folio a string

        // Mostrar en consola para verificar el filtro
        console.log("Filtrando compra con folio:", folio);

        // Filtrar exactamente por folio
        return folio === busqueda;
    });

    // Verificamos qué compras están siendo filtradas
    console.log("Compras filtradas:", comprasFiltradas);

    // Limpiar la tabla antes de agregar las compras filtradas
    reporteContenido.innerHTML = '';

    // Verificar si hay compras filtradas y mostrarlas
    if (comprasFiltradas.length > 0) {
        let html = "<h2>Reporte de Compras</h2><table class='table'><thead class='thead-dark'><tr><th>Folio</th><th>Fecha</th><th>Total</th><th>Productos</th></tr></thead><tbody>";

        comprasFiltradas.forEach((compra) => {
            const productos = compra.productos.map(p => `${p.cantidad} x ${p.nombre}`).join(', ');
            html += `<tr>
                        <td>${compra.folio}</td>
                        <td>${compra.fecha}</td>
                        <td>$${compra.total.toFixed(2)}</td>
                        <td>${productos}</td>
                      </tr>`;
        });

        html += "</tbody></table>";
        reporteContenido.innerHTML = html; // Colocamos el HTML generado en el contenedor
    } else {
        // Si no se encuentran compras filtradas, mostramos este mensaje
        reporteContenido.innerHTML = "<p>No se encontraron compras que coincidan con tu búsqueda.</p>";
    }
}






// Mostrar reporte de productos
function mostrarReporteProductos() {
    tipoReporte = "productos";
    const busquedaContainer = document.getElementById("busquedaContainer");
    busquedaContainer.style.display = "block"; // Mostrar el campo de búsqueda

    const busquedaInput = document.getElementById("busqueda");
    const busqueda = busquedaInput.value.trim().toLowerCase();  // Usamos .trim() para eliminar espacios adicionales
    console.log("Valor de búsqueda:", busqueda); // Depuramos el valor del input de búsqueda

    const reporteContenido = document.getElementById("reporteContenido");

    // Obtener los productos desde localStorage
    const productosJSON = localStorage.getItem('productos');
    if (!productosJSON) {
        console.error("No se encontraron productos en localStorage.");
        reporteContenido.innerHTML = "<p>No hay productos registrados.</p>";
        return;
    }

    let productos = [];
    try {
        productos = JSON.parse(productosJSON) || [];  // Intentamos parsear los productos
    } catch (e) {
        console.error("Error al parsear los productos desde localStorage:", e);
        productos = [];  // Si hay error, aseguramos que productos sea un arreglo vacío
    }

    // Si la búsqueda está vacía, mostramos todos los productos
    if (busqueda === "") {
        console.log("Busqueda vacía, mostrando todos los productos.");
        mostrarProductos(productos);  // Mostramos todos los productos
        return;
    }

    // Filtrar los productos si hay búsqueda, por nombre o ID
    const productosFiltrados = productos.filter(producto => {
        const nombre = producto.nombre.toLowerCase(); // Convertimos el nombre a minúsculas
        return nombre.includes(busqueda); // Filtramos por nombre que contenga la búsqueda
    });

    console.log("Productos filtrados:", productosFiltrados);

    // Limpiar la tabla antes de agregar los productos filtrados
    reporteContenido.innerHTML = '';

    // Verificar si hay productos filtrados y mostrarlos
    if (productosFiltrados.length > 0) {
        let html = "<h2>Reporte de Productos</h2><table class='table'><thead class='thead-dark'><tr><th>ID</th><th>Nombre</th><th>Precio</th><th>Cantidad</th></tr></thead><tbody>";

        productosFiltrados.forEach((producto) => {
            html += `<tr>
                        <td>${producto.id}</td>
                        <td>${producto.nombre}</td>
                        <td>$${producto.precio.toFixed(2)}</td>
                        <td>${producto.cantidad}</td>
                      </tr>`;
        });

        html += "</tbody></table>";
        reporteContenido.innerHTML = html; // Colocamos el HTML generado en el contenedor
    } else {
        reporteContenido.innerHTML = "<p>No se encontraron productos que coincidan con tu búsqueda.</p>";
    }
}

// Función para mostrar todos los productos cuando no hay filtro
function mostrarProductos(productos) {
    const reporteContenido = document.getElementById("reporteContenido");
    let html = "<h2>Reporte de Productos</h2><table class='table'><thead class='thead-dark'><tr><th>ID</th><th>Nombre</th><th>Precio</th><th>Cantidad</th></tr></thead><tbody>";

    productos.forEach((producto) => {
        html += `<tr>
                    <td>${producto.id}</td>
                    <td>${producto.nombre}</td>
                    <td>$${producto.precio.toFixed(2)}</td>
                    <td>${producto.cantidad}</td>
                  </tr>`;
    });

    html += "</tbody></table>";
    reporteContenido.innerHTML = html; // Colocamos el HTML generado en el contenedor
}





// Función para actualizar el campo de búsqueda y la lógica del tipo de reporte
function actualizarBusqueda() {
    const busquedaContainer = document.getElementById("busquedaContainer");
    busquedaContainer.style.display = "block"; // Mostrar el campo de búsqueda
    document.getElementById("busqueda").value = ""; // Limpiar el campo de búsqueda
    const busquedaBtn = document.getElementById("btnBuscarReporte");
    busquedaBtn.style.display = "block";
}


// Función para mostrar todas las ventas cuando no hay filtro
// Función para mostrar todas las ventas cuando no hay filtro
function mostrarVentas(ventas) {
    const reporteContenido = document.getElementById("reporteContenido");
    let html = "<h2>Reporte de Ventas</h2><table class='table'><thead class='thead-dark'><tr><th>Folio</th><th>Fecha</th><th>Total</th><th>Productos</th></tr></thead><tbody>";

    // Recorremos todas las ventas y agregamos los datos a la tabla
    ventas.forEach((venta) => {
        const productos = venta.productos.map(p => `${p.cantidad} x ${p.nombre}`).join(', ');  // Corregimos la interpolación
        html += `<tr>
                    <td>${venta.folio}</td>
                    <td>${venta.fecha}</td>
                    <td>$${venta.total.toFixed(2)}</td>
                    <td>${productos}</td>
                  </tr>`;
    });

    html += "</tbody></table>";
    reporteContenido.innerHTML = html; // Colocamos el HTML generado en el contenedor
}


// Función para mostrar todas las compras cuando no hay filtro
function mostrarCompras(compras) {
    const reporteContenido = document.getElementById("reporteContenido");
    let html = "<h2>Reporte de Compras</h2><table class='table'><thead class='thead-dark'><tr><th>Factura</th><th>Fecha</th><th>Total</th><th>Productos</th></tr></thead><tbody>";

    // Recorremos todas las compras y agregamos los datos a la tabla
    compras.forEach((compra) => {
        const productos = compra.productos.map(p => `${p.cantidad} x ${p.nombre}`).join(', ');  // Corregimos la interpolación
        html += `<tr>
                    <td>${compra.folio}</td>
                    <td>${compra.fecha}</td>
                    <td>$${compra.total.toFixed(2)}</td>
                    <td>${productos}</td>
                  </tr>`;
    });

    html += "</tbody></table>";
    reporteContenido.innerHTML = html; // Colocamos el HTML generado en el contenedor
}


// Función para mostrar todos los productos cuando no hay filtro
// Función para mostrar todos los productos cuando no hay filtro
function mostrarProductos(productos) {
    const reporteContenido = document.getElementById("reporteContenido");
    let html = "<h2>Reporte de Productos</h2><table class='table'><thead class='thead-dark'><tr><th>ID</th><th>Nombre</th><th>Precio</th><th>Cantidad</th></tr></thead><tbody>";

    // Recorremos todos los productos y agregamos los datos a la tabla
    productos.forEach((producto) => {
        html += `<tr>
                    <td>${producto.id}</td>
                    <td>${producto.nombre}</td>
                    <td>${producto.precio}</td>  <!-- Precio se muestra como string directamente -->
                    <td>${producto.cantidad}</td>
                  </tr>`;
    });

    html += "</tbody></table>";
    reporteContenido.innerHTML = html; // Colocamos el HTML generado en el contenedor
}






function filtrarVentas() {
    const busqueda = document.getElementById("busqueda").value.toLowerCase(); // Obtener lo que se ha escrito en el campo de búsqueda
    const reporteContenido = document.getElementById("reporteContenido");

    // Obtener las ventas desde localStorage (asegurarse de que sea un array válido)
    const ventasJSON = localStorage.getItem('facturas');
    console.log("Ventas JSON recuperadas del localStorage (filtrar):", ventasJSON);  // Verificar el valor

    // Si no hay ventas, inicializamos un array vacío
    let ventas = [];
    try {
        ventas = JSON.parse(ventasJSON) || [];  // Intentamos parsear las facturas
    } catch (e) {
        console.error("Error al parsear las ventas desde localStorage:", e);
        ventas = [];  // Si hay error, aseguramos que ventas sea un arreglo vacío
    }

    // Verificamos que ventas sea un array válido
    if (!Array.isArray(ventas)) {
        console.error("Las ventas no son un arreglo válido.");
        reporteContenido.innerHTML = "<p>No se encontraron ventas registradas.</p>";
        return;
    }

    // Filtrar las ventas que coincidan con el folio o la fecha
    const ventasFiltradas = ventas.filter(venta => {
        return venta.folio.toString().includes(busqueda) || // Filtrar por folio
               venta.fecha.toLowerCase().includes(busqueda);  // Filtrar por fecha
    });

    // Mostrar las ventas filtradas en la tabla
    if (ventasFiltradas.length > 0) {
        let html = "<h2>Reporte de Ventas</h2><table class='table'><thead class='thead-dark'><tr><th>Folio</th><th>Fecha</th><th>Total</th><th>Productos</th></tr></thead><tbody>";

        ventasFiltradas.forEach((venta) => {
            const productos = venta.productos.map(p => `${p.cantidad} x ${p.nombre}`).join(', ');
            html += `<tr>
                        <td>${venta.folio}</td>
                        <td>${venta.fecha}</td>
                        <td>$${venta.total.toFixed(2)}</td>
                        <td>${productos}</td>
                      </tr>`;
        });

        html += "</tbody></table>";
        reporteContenido.innerHTML = html;
    } else {
        reporteContenido.innerHTML = "<p>No se encontraron ventas que coincidan con tu búsqueda.</p>";
    }
}




// Función que se ejecuta cuando el usuario hace clic en el botón "Buscar"
// Función que se ejecuta en tiempo real cuando se escribe en el campo de búsqueda
function filtrarReportes() {
    const busqueda = document.getElementById("busqueda").value.trim().toLowerCase();
    console.log("Valor de búsqueda:", busqueda);  // Verifica el valor de búsqueda

    if (busqueda === "") {
        console.log("Búsqueda vacía, mostrando todas las ventas");
        mostrarReporteVentas();  // Muestra todas las ventas si la búsqueda está vacía
        return;
    }

    // Filtrar las ventas por folio
    const ventasJSON = localStorage.getItem('facturas');
    let ventas = [];
    if (ventasJSON) {
        try {
            ventas = JSON.parse(ventasJSON);
            console.log("Ventas encontradas:", ventas);  // Verifica las ventas
        } catch (e) {
            console.error("Error al parsear ventas desde localStorage:", e);
            return;
        }
    }

    // Filtrar por folio (asegurándote de que busques solo por texto)
    const ventasFiltradas = ventas.filter(venta => {
        const folio = venta.folio ? venta.folio.toString() : "";  // Asegúrate de que el folio esté definido como cadena
        console.log("Filtrando venta con folio:", folio);  // Verifica qué folio estás filtrando
        return folio.includes(busqueda);  // Compara el folio con la búsqueda (incluso de forma parcial)
    });

    // Mostrar las ventas filtradas
    console.log("Ventas filtradas:", ventasFiltradas); // Verifica las ventas filtradas

    // Mostrar los resultados
    const reporteContenido = document.getElementById("reporteContenido");
    reporteContenido.innerHTML = "";  // Limpiar el contenido antes de agregar el nuevo HTML

    if (ventasFiltradas.length > 0) {
        let html = "<h2>Reporte de Ventas</h2><table class='table'><thead class='thead-dark'><tr><th>Folio</th><th>Fecha</th><th>Total</th><th>Productos</th></tr></thead><tbody>";

        ventasFiltradas.forEach(venta => {
            const productos = venta.productos.map(p => `${p.cantidad} x ${p.nombre}`).join(', ');
            html += `<tr>
                        <td>${venta.folio}</td>
                        <td>${venta.fecha}</td>
                        <td>$${venta.total.toFixed(2)}</td>
                        <td>${productos}</td>
                      </tr>`;
        });

        html += "</tbody></table>";
        reporteContenido.innerHTML = html;  // Colocamos el HTML generado en el contenedor
    } else {
        reporteContenido.innerHTML = "<p>No se encontraron ventas que coincidan con tu búsqueda.</p>";
    }
}
