let carrito = [];
let total = 0;

function agregarProducto(nombre, precio) {
    carrito.push({nombre, precio});
    total += precio;
    
    const lista = document.getElementById('listaCarrito');
    lista.innerHTML = ''; 
    carrito.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nombre} - $${item.precio}`;
        lista.appendChild(li);
    });

    document.getElementById('total').textContent = total;
}

function vaciarCarrito() {
    carrito = [];
    total = 0;
    document.getElementById('listaCarrito').innerHTML = '';
    document.getElementById('total').textContent = total;
}
function calcularTotal2x1() {
  let contador = [];
  let totalCalculado = 0;

  for (let i = 0; i < carrito.length; i++) {
    let prod = carrito[i][0];
    let precio = carrito[i][1];
    let encontrado = false;

    for (let j = 0; j < contador.length; j++) {
      if (contador[j][0] === prod) {
        contador[j][1]++;
        encontrado = true;
      }
    }

    if (!encontrado) {
      contador.push([prod, 1, precio]); 
    }
  }

  for (let i = 0; i < contador.length; i++) {
    let cantidad = contador[i][1];
    let precio = contador[i][2];
    totalCalculado += Math.ceil(cantidad / 2) * precio;
  }

  return totalCalculado;
}

function actualizarCarrito() {
  listaCarrito.innerHTML = "";

  let contador = [];
  for (let i = 0; i < carrito.length; i++) {
    let prod = carrito[i][0];
    let precio = carrito[i][1];
    let encontrado = false;

    for (let j = 0; j < contador.length; j++) {
      if (contador[j][0] === prod) {
        contador[j][1]++;
        encontrado = true;
      }
    }

    if (!encontrado) {
      contador.push([prod, 1, precio]);
    }
  }

  for (let i = 0; i < contador.length; i++) {
    listaCarrito.innerHTML += "<li>" + contador[i][0] + " x" + contador[i][1] + "</li>";
  }

  totalSpan.textContent = calcularTotal2x1();
}
