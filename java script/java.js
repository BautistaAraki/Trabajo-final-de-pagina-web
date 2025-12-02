let carrito = [];
let total = 0;

// Notificación
function mostrarNotificacion(texto) {
    const noti = document.getElementById("notificacion");
    noti.textContent = texto;
    noti.classList.add("show");

    setTimeout(() => {
        noti.classList.remove("show");
    }, 2000);
}

// Agregar producto (con flag de oferta)
function agregarProducto(nombre, precio, oferta2x1 = false) {
    carrito.push({ nombre, precio, oferta2x1 });

    mostrarNotificacion(`✔ ${nombre} agregado correctamente`);
    actualizarCarrito();
}

// Calcular total con 2x1 SOLO para los que tienen oferta
function calcularTotal2x1() {
    let total = 0;

    // Agrupar por nombre
    let grupos = {};

    carrito.forEach(prod => {
        if (!grupos[prod.nombre]) {
            grupos[prod.nombre] = { cantidad: 0, precio: prod.precio, oferta2x1: prod.oferta2x1 };
        }
        grupos[prod.nombre].cantidad++;
    });

    // Aplicar cálculo
    for (let nombre in grupos) {
        let item = grupos[nombre];

        if (item.oferta2x1) {
            // Oferta 2x1 → se cobra la mitad de pares
            total += Math.ceil(item.cantidad / 2) * item.precio;
        } else {
            // Normal
            total += item.cantidad * item.precio;
        }
    }

    return total;
}

// Actualizar lista visual
function actualizarCarrito() {
    const lista = document.getElementById("listaCarrito");
    const totalSpan = document.getElementById("total");

    lista.innerHTML = "";

    // Agrupar
    let grupos = {};

    carrito.forEach(prod => {
        if (!grupos[prod.nombre]) {
            grupos[prod.nombre] = { cantidad: 0, precio: prod.precio, oferta2x1: prod.oferta2x1 };
        }
        grupos[prod.nombre].cantidad++;
    });

    // Mostrar en pantalla
    for (let nombre in grupos) {
        let item = grupos[nombre];

        let etiqueta = item.oferta2x1 ? " (2x1)" : "";

        lista.innerHTML += `
            <li>${nombre} x${item.cantidad} ${etiqueta}</li>
        `;
    }

    totalSpan.textContent = calcularTotal2x1();
}

// Vaciar carrito
function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}
