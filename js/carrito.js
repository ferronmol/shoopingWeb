const productos = document.getElementById("productos");
const btncomprar = document.getElementById("btncomprar");
const precio_total = document.getElementById("precio_total");
let carrito = [];
let carritoGuardado = [];

//eliminar un producto del carrito
const eliminar = (e) => {
  //quiero saber del array de objetos cual es el que tiene el boton que he pulsado
  const boton = e.target;
  const producto = boton.parentElement.parentElement;
  console.log("he pulsado el boton de eliminar");
  const nombre = producto.querySelector(
    ".producto__textos span:nth-child(2)"
  ).textContent;
  // Encontrar el índice del producto en el array
  const indice = carritoGuardado.findIndex(
    (producto) => producto.nombre === nombre
  );
  console.log("indice del producto a eliminar", indice);
  // Verificar si se encontró el producto en el array
  if (indice !== -1) {
    //si lo ha encontrado
    // Eliminar el producto del array
    carritoGuardado.splice(indice, 1); //elimina 1 elemento a partir del indice

    // Actualizar el localStorage con el nuevo array de productos
    localStorage.setItem("producto_carrito", JSON.stringify(carritoGuardado)); //setItem guarda en el localstorage y getItem lo lee

    carrito = carritoGuardado.slice();
    productos.innerHTML = "";
    mostrarCarrito();
  }
};

const mostrarCarrito = () => {
  carritoGuardado = JSON.parse(localStorage.getItem("producto_carrito")) || [];
  console.log("Carrito guardado:", carritoGuardado);
  console.log("Carrito:", carrito);

  let total = 0;

  carritoGuardado.forEach((producto) => {
    const artproducto = crearProducto(producto);
    productos.appendChild(artproducto);
    total += parseFloat(producto.precio);
  });

  precio_total.textContent = `${total.toFixed(2)} €`;
};

const crearProducto = (producto) => {
  const artproducto = document.createElement("ARTICLE");
  artproducto.classList.add("producto");

  const img = document.createElement("IMG");
  img.classList.add("producto__img");
  img.src = producto.imagen;
  artproducto.appendChild(img);

  const section = document.createElement("SECTION");
  section.classList.add("producto__textos");
  artproducto.appendChild(section);

  const nombreSpan = document.createElement("SPAN");
  nombreSpan.classList.add("producto__texto");
  nombreSpan.textContent = "Nombre: ";
  section.appendChild(nombreSpan);

  const nombreValor = document.createElement("SPAN");
  nombreValor.textContent = producto.nombre;
  section.appendChild(nombreValor);

  const br = document.createElement("BR");
  section.appendChild(br);

  const precioSpan = document.createElement("SPAN");
  precioSpan.classList.add("producto__texto");
  precioSpan.textContent = "Precio: ";
  section.appendChild(precioSpan);

  const precioValor = document.createElement("SPAN");
  precioValor.textContent = `${producto.precio} €`;
  section.appendChild(precioValor);

  const button = document.createElement("BUTTON");
  button.classList.add("producto__btnborrar");
  button.textContent = "Eliminar";
  section.appendChild(button);

  button.addEventListener("click", eliminar);

  return artproducto;
};

mostrarCarrito();

//cuando pulso el boton comprar me borra el carrito y el localstorage
btncomprar.addEventListener("click", () => {
  //me
  localStorage.removeItem("producto_carrito");
  carrito = [];
  productos.innerHTML = "";
  mostrarCarrito();
});
