//precios de combustible
const precSuper = 77;
const precPrem = 80;

//clase para representar un Vehículo
class Vehiculo {
    constructor(marca, modelo, rendimiento) {
        this.marca = marca;
        this.modelo = modelo;
        this.rendimiento = rendimiento; // Kilómetros por litro
    }

    //calculo el rendimiento según el tráfico
    rendimientoConCondiciones(velocidad, trafico) {
        let ajusteVelocidad = velocidad >= 120 ? 0.95 : 1; // Si la velocidad es >=120, rendimiento se reduce
        let ajusteTrafico = trafico ? Math.random() * 0.2 : 1; // Ajuste por tráfico (0.8 a 1)
        return this.rendimiento * ajusteVelocidad * ajusteTrafico;
    }
}

//array de Vehículos disponibles
const vehiculos = [
    new Vehiculo('Toyota', 'Corolla', 15),
    new Vehiculo('Ford', 'Focus', 12),
    new Vehiculo('Honda', 'Civic', 14),
    new Vehiculo('Chevrolet', 'Onix', 13)
];

//función para pedir y validar datos
function obtenerDatoValido(mensaje, validar) {
    let dato = prompt(mensaje);
    while (!validar(dato)) {
        dato = prompt(`Entrada no válida. ${mensaje}`);
    }
    return dato;
}

//función para calcular el consumo y el costo del viaje
function calcularViaje(vehiculo, kms, vel, tipoCombustible) {
    const hayTrafico = Math.random() > 0.7; // 30% de probabilidad de tráfico
    const rendimientoReal = vehiculo.rendimientoConCondiciones(vel, hayTrafico);

    const consumo = kms / rendimientoReal;
    const costo = consumo * (tipoCombustible === "super" ? precSuper : precPrem);

    return { consumo, costo, hayTrafico }; // Devuelvo el tráfico también
}

//función para mostrar los resultados
function mostrarResultados(vehiculo, kms, vel, tipoCombustible) {
    const { consumo, costo, hayTrafico } = calcularViaje(vehiculo, kms, vel, tipoCombustible);

    alert(`Vehículo: ${vehiculo.marca} ${vehiculo.modelo}\nConsumo: ${consumo.toFixed(2)} litros\nCosto: $${costo.toFixed(2)}`);
    
    //mostrar resultados en la consola
    console.log(`Vehículo: ${vehiculo.marca} ${vehiculo.modelo}`);
    console.log(`Kilómetros: ${kms}`);
    console.log(`Velocidad: ${vel}`);
    console.log(`Consumo: ${consumo.toFixed(2)} litros`);
    console.log(`Costo: $${costo.toFixed(2)}`);
    console.log(`Combustible: ${tipoCombustible}`);
    console.log(`Tráfico: ${hayTrafico ? "Sí" : "No"}`);
    console.log('---');
}

//función para iniciar la simulación
function iniciarSimulacion() {
    const vehiculo = vehiculos[parseInt(obtenerDatoValido(
        `Selecciona el vehículo:\n${vehiculos.map((veh, i) => `${i + 1}: ${veh.marca} ${veh.modelo}`).join('\n')}`,
        dato => !isNaN(dato) && dato > 0 && dato <= vehiculos.length
    )) - 1];

    const kms = parseInt(obtenerDatoValido(
        "Kilómetros (10 a 500):", 
        dato => !isNaN(dato) && dato >= 10 && dato <= 500
    ));

    const vel = parseInt(obtenerDatoValido(
        "Velocidad (90, 100, 110, 120, 130):", 
        dato => [90, 100, 110, 120, 130].includes(parseInt(dato))
    ));

    const tipoCombustible = obtenerDatoValido("Combustible (super/prem):", dato => ["super", "prem"].includes(dato.toLowerCase())).toLowerCase();

    //mostrar resultados
    mostrarResultados(vehiculo, kms, vel, tipoCombustible);
}

//ejecutar la simulación al hacer clic en el botón, para no volver a cargar la pagina y perder la información de la consola
document.getElementById('iniciarSimulacion').addEventListener('click', iniciarSimulacion);
