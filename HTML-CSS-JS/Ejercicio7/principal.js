function sumarCinco() {
    let numero = 10;
    let resultado = numero + 5;
    alert("Resultado: " + resultado);
}

function concatenarCadenas() {
    let cadena1 = "Hola";
    let cadena2 = "Mundo";
    let resultado = cadena1 + " " + cadena2;
    alert("Concatenación: " + resultado);
}

function compararNumeros() {
    let a = 7;
    let b = 5;
    let mensaje = "";

    if (a === b) {
        mensaje = "Los números son iguales.";
    } else if (a > b) {
        mensaje = a + " es mayor que " + b;
    } else {
        mensaje = a + " es menor que " + b;
    }

    alert(mensaje);
}

function grupoPorNumero() {
    let numero = 6;
    let grupo = "";

    switch (true) {
        case (numero >= 1 && numero <= 3):
            grupo = "Grupo 1";
            break;
        case (numero >= 4 && numero <= 6):
            grupo = "Grupo 2";
            break;
        case (numero >= 7 && numero <= 10):
            grupo = "Grupo 3";
            break;
        default:
            grupo = "Número fuera de rango";
    }

    alert("El número " + numero + " pertenece al " + grupo);
}

function grupoPorNumeroUsuario() {
let entrada = prompt("Ingrese un número del 1 al 10:");
    let numero = parseInt(entrada);
    let grupo = "";

    switch (true) {
    case (numero >= 1 && numero <= 3):
        grupo = "Grupo 1";
        break;
    case (numero >= 4 && numero <= 6):
        grupo = "Grupo 2";
        break;
    case (numero >= 7 && numero <= 10):
        grupo = "Grupo 3";
        break;
    default:
        grupo = "Número fuera de rango";
    }

    alert("El número " + numero + " pertenece al " + grupo);
}

function sumatoriaHastaDiez() {
    let suma = 0;
    for (let i = 0; i < 10; i++) {
        suma += 1;
    }
    alert("La sumatoria de 0 a 10 es: " + suma);
}

function productoArray() {
    let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let producto = 1;
    for (let i = 0; i < numeros.length; i++) {
        producto *= numeros[i];
    }
    alert("El producto total es: " + producto);
}

function multiplicarValores() {
    let entrada = prompt("Ingrese un número:");
    let a = parseInt(entrada);
    let entrada2 = prompt("Ingrese otro número:");
    let b = parseInt(entrada2);

    let producto = a * b;
    alert("El producto de " + a + " y " + b + " es: " + producto);
}

function concatenarCadenasParametros() {
    let entrada = prompt("Ingrese una cadena:");
    let a = entrada;
    let entrada2 = prompt("Ingrese otra cadena:");
    let b = entrada2;
    let resultado = a + " " + b;
    alert("Concatenación: " + resultado);
}

function compararDosValores() {
    let entrada = prompt("Ingrese un número:");
    let a = parseInt(entrada);
    let entrada2 = prompt("Ingrese otro número:");
    let b = parseInt(entrada2);
    let mensaje = "";
    if (a === b) {
        mensaje = "Ambos números son iguales.";
    } else if (a > b) {
        mensaje = a + " es mayor que " + b;
    } else {
        mensaje = b + " es mayor que " + a;
    }
    alert(mensaje);
}

function mostrarAsteriscos() {
    let entrada = prompt("Ingrese un número:");
    let n = parseInt(entrada);
    let resultado = "";
    for (let i = 0; i < n; i++) {
        resultado += "*";
    }
    alert(resultado);
}

function calcularMontoFinal() {
    let descuento = 0;

    let entrada = prompt("Ingrese un número:");
    let monto = parseInt(entrada);
    let entrada2 = prompt("Ingrese un medio(E, D, C):");
    let medioPago = entrada2;

    if (monto >= 200 && monto <= 400) {
        switch (medioPago.toUpperCase()) {
        case 'E':
            descuento = 0.30;
            break;
        case 'D':
            descuento = 0.20;
            break;
        case 'C':
            descuento = 0.10;
            break;
        }
    } else if (monto > 400) {
        descuento = 0.40;
    }

    let montoFinal = monto - (monto * descuento);
    alert("Monto final a abonar: $" + montoFinal.toFixed(2));
    return montoFinal;
}

function medioArbol(altura = 5) {
    let resultado = "";
    for (let i = 1; i <= altura; i++) {
        resultado += "* ".repeat(i) + "\n";
    }
    alert(resultado);
    }

function diaDeLaSemana() {
    let mensaje = "";
    let entrada = prompt("Ingrese un número:");
    let dia = parseInt(entrada);
    switch (dia) {
        case 1: mensaje = "Lunes"; break;
        case 2: mensaje = "Martes"; break;
        case 3: mensaje = "Miércoles"; break;
        case 4: mensaje = "Jueves"; break;
        case 5: mensaje = "Viernes"; break;
        case 6:
        case 7:
        mensaje = "Fin de semana";
        break;
        default:
        mensaje = "Día inválido";
    }
    alert(mensaje);
    return mensaje;
}

function promedioDeNumeros() {
    let cantidad = parseInt(prompt("¿Cuántos números querés ingresar?"));
    if (isNaN(cantidad) || cantidad <= 0) {
        alert("Cantidad inválida.");
        return;
    }

    let entrada = prompt("Ingresá los " + cantidad + " números separados por comas (ej: 10,20,30):");
    let numeros = entrada.split(",").map(n => Number(n.trim()));

    if (numeros.length !== cantidad || numeros.some(isNaN)) {
        alert("Error: la cantidad de números no coincide o hay valores inválidos.");
        return;
    }

    let suma = numeros.reduce((acc, val) => acc + val, 0);
    let promedio = suma / cantidad;

    alert("El promedio es: " + promedio.toFixed(2));
}

function mostrarArbolDesdeInput() {
    let input = document.getElementById("alturaInput").value;
    let altura = parseInt(input);

    if (isNaN(altura) || altura <= 0) {
        alert("Por favor ingresá un número válido mayor a cero.");
        return;
    }

    let resultado = medioArbol(altura);

    document.getElementById("resultadoArbol").innerHTML = resultado.replace(/\n/g, "<br>");
}

// 16
let piso = '';
let dpto = '';

function ingresarNumero(num) {
    const visorPiso = document.getElementById("visorPiso");
    const visorDpto = document.getElementById("visorDpto");

    if (piso.length < 2) {
        piso += num;
        visorPiso.value = piso;
    } else if (dpto.length < 1) {
        dpto += num;
        visorDpto.value = dpto;
    }
}

function llamar() {
    const mensaje = document.getElementById("mensaje");

    const pisoNum = parseInt(piso);
    const dptoNum = parseInt(dpto);

    if (piso.length !== 2 || isNaN(pisoNum) || pisoNum < 0 || pisoNum > 48) {
        mensaje.innerText = "Error: Piso inválido (00 a 48)";
        return;
    }

    if (dpto.length !== 1 || isNaN(dptoNum) || dptoNum < 1 || dptoNum > 6) {
        mensaje.innerText = "Error: Dpto inválido (1 a 6)";
    return;
    }

    mensaje.innerText = `Llamando al piso ${piso}, dpto ${dpto}...`; 
}

function borrar() {
    piso = '';
    dpto = '';
    document.getElementById("visorPiso").value = '';
    document.getElementById("visorDpto").value = '';
    document.getElementById("mensaje").innerText = "[ Mensaje aparecerá aquí ]";
}
//17
const fila1 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const fila2 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
const fila3 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
const fila4 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

const teclado = document.getElementById("teclado");
const display = document.getElementById("display");
let contenido = "";

function actualizarDisplay(valor) {
    if (valor === "borrar") {
        contenido = "";
    } else if (valor === "backspace") {
        contenido = contenido.slice(0, -1);
    } else {
        contenido += valor;
    }
    display.textContent = contenido;
}

function crearFila(teclas) {
    const fila = document.createElement("div");
    fila.className = "fila";
    teclas.forEach(letra => {
        const boton = document.createElement("button");
        boton.className = "tecla";
        boton.textContent = letra;
        boton.onclick = () => actualizarDisplay(letra);
        fila.appendChild(boton);
    });
    teclado.appendChild(fila);
}

crearFila(fila1);
crearFila(fila2);
crearFila(fila3);
crearFila(fila4);

const filaEspecial = document.createElement("div");
filaEspecial.className = "fila";

const borrarBtn = document.createElement("button");
borrarBtn.className = "tecla especial";
borrarBtn.textContent = "Borrar";
borrarBtn.onclick = () => actualizarDisplay("borrar");

const backspaceBtn = document.createElement("button");
backspaceBtn.className = "tecla especial";
backspaceBtn.textContent = "←";
backspaceBtn.onclick = () => actualizarDisplay("backspace");

filaEspecial.appendChild(borrarBtn);
filaEspecial.appendChild(backspaceBtn);
teclado.appendChild(filaEspecial);