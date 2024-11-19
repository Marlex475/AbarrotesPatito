function cargarCSV() {
    const input = document.getElementById('csvFileInput');
    const file = input.files[0];

    if (!file) {
        alert("Por favor, selecciona un archivo CSV.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function(event) {
        const text = event.target.result;
        const productos = parseCSV(text);
        // Guardar productos en localStorage
        localStorage.setItem('productos', JSON.stringify(productos));
        alert("Productos cargados correctamente. Puedes ver el reporte.");
    };

    reader.readAsText(file);
}

function parseCSV(text) {
    const lines = text.split('\n'); // Divide el texto en líneas
    const productos = []; // Inicializa un array para los productos

    for (let i = 1; i < lines.length; i++) { // Omitir encabezados
        const columns = lines[i].split(','); // Divide cada línea en columnas
        if (columns.length >= 4) { // Verifica que haya suficientes columnas
            const producto = {
                id: columns[0].trim(), // ID del producto
                nombre: columns[1].trim(), // Nombre del producto
                cantidad: columns[2].trim(), // Cantidad
                precio: columns[3].trim() // Precio
            };
            productos.push(producto); // Añade el producto al array
        }
    }

    return productos; // Devuelve el array de productos
}

