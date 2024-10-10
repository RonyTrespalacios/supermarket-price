// Función para formatear el número con dos decimales
function formatNumber(num) {
    return num.toFixed(2);
}

// Función para validar y convertir la entrada del usuario
function parseInput(value) {
    // Reemplaza coma por punto
    let sanitized = value.replace(',', '.');
    let number = parseFloat(sanitized);
    return isNaN(number) ? 0 : number;
}
