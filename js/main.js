document.addEventListener('DOMContentLoaded', () => {
    const priceInput = document.getElementById('price-input');
    const recommendedOutput = document.getElementById('recommended-output');
    const maxOutput = document.getElementById('max-output');
    const clearBtn = document.getElementById('clear-btn');
    const adjustBtns = document.querySelectorAll('.adjust-btn');

    // Función para calcular el precio recomendado
    function calculatePrice(pEntrada) {
        let aux = parseFloat((pEntrada * 2).toFixed(2)); // Multiplicamos por 2 y truncamos a 2 decimales
        let auxStr = aux.toString();
        let decimals = auxStr.split('.')[1] || '00'; // Tomamos los decimales de 'aux'

        // Si el segundo decimal es diferente de 0, truncamos a un decimal usando Math.floor para evitar redondeo
        if (decimals.length === 2 && parseInt(decimals[1]) !== 0) {
            return Math.floor(aux * 10) / 10; // Truncamos a 1 decimal
        }
        // Si el segundo decimal es 0, restamos 0.1 a aux
        else {
            return parseFloat((aux - 0.1).toFixed(2));
        }
    }

    // Función para actualizar los precios
    function updatePrice() {
        let pEntrada = parseInput(priceInput.value);
    
        // Si la entrada es vacía o inválida, mostrar $0.00 para ambos precios
        if (isNaN(pEntrada) || pEntrada === 0) {
            recommendedOutput.textContent = '$0.00';
            maxOutput.textContent = '$0.00';
            return;
        }
    
        let pRecomendado = calculatePrice(pEntrada);
        let pMaximo = parseFloat((pEntrada * 2).toFixed(2)); // Precio máximo es pEntrada * 2
    
        // Actualizamos la salida de precios
        recommendedOutput.textContent = `$${pRecomendado}`;
        maxOutput.textContent = `$${pMaximo}`;
    }    

    // Event listener para la entrada del usuario
    priceInput.addEventListener('input', updatePrice);

    // Event listener para el botón de limpiar
    clearBtn.addEventListener('click', () => {
        priceInput.value = '';
        recommendedOutput.textContent = '$0.00';
        maxOutput.textContent = '$0.00';
    });

    // Event listeners para los botones de ajuste
    adjustBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            let adjustment = parseFloat(btn.getAttribute('data-value'));
            let currentVal = parseInput(priceInput.value);
            let newVal = parseFloat((currentVal + adjustment).toFixed(2));
            if (newVal < 0) newVal = 0;
            priceInput.value = formatNumber(newVal);
            updatePrice();
        });
    });

    // Inicializar con valor por defecto
    updatePrice();
});
