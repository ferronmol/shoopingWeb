const cards = document.getElementById("cards");
const precio = document.getElementById("precio");
const modal_aniadir = document.getElementById("modal_aniadir");
const modal_cancelar = document.getElementById("modal_cancelar");
const modal_title = document.getElementById("modal_title");
const modal_container = document.getElementById("modal_container");
const carrito__compra = document.getElementById("carrito__compra");

let carritoGuardado = []; //creo un array vacio para guardar los productos que ya estaban en el carrito

// 1.JSON para el producto del carrito que añadimos al localStorage
let producto_carrito = {
  nombre: "",
  precio: "",
  imagen: "",
};
//2. CARGAMOS 20 PRODUCTOS DE LA API https://fakestoreapi.com/products en un objeto de la clase producto qu eesta en productos.js

const cargarProductos = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    const productos = data.map((producto) => {
      return new Producto(
        producto.id,
        producto.title,
        producto.price,
        producto.image
      );
    });
    mostrarProductos(productos);
  } catch (error) {
    console.log(error);
  }
};
let carrito = []; //array de productos que añadimos al carrito
const mostrarProductos = (productos) => {
  //debemos recorrer el array de productos y por cada producto crear una tarjeta donde se muestre la imagen, el nombre, el precio y el precio rebajado
  productos.forEach((producto) => {
    //PARA CREAR UNA TARJETA
    // card
    let card = document.createElement("ARTICLE");
    card.classList.add("card");

    // img
    let img = document.createElement("IMG");
    img.classList.add("card__img");
    img.src = producto.imagen;
    card.appendChild(img);

    // p
    let p = document.createElement("P");
    p.classList.add("card__text");
    p.textContent = producto.nombre;
    card.appendChild(p);

    // div
    let div = document.createElement("DIV");
    div.classList.add("card__precios");
    card.appendChild(div);

    // span
    let span = document.createElement("SPAN");
    span.classList.add("card__rebajado");
    let precioReb = producto.precio * 0.8;
    span.textContent = `${precioReb.toFixed(2)} €`;
    div.appendChild(span);

    // span precio
    let spanp = document.createElement("SPAN");
    spanp.classList.add("card__precio");
    spanp.textContent = producto.precio + " €";
    div.appendChild(spanp);

    // button
    let button = document.createElement("BUTTON");
    button.classList.add("card__button");
    button.textContent = "Añadir al carro";

    // Calcular el precio rebajado con dos decimales
    producto.precio = (producto.precio * 0.8).toFixed(2);

    // Agregar event listener al botón dentro del bucle forEach
    card.addEventListener("click", () => {
      if (event.target.tagName === "BUTTON") {
        //el modal-container esat fuera del layout, tengo que darle top 0 para que se vea
        modal_container.style.top = "0"; //ya se ve el modal (añadir-cancelar)
        //creo el JSON del producto que he hecho click para añadirlo al carrito
        producto_carrito.nombre = producto.nombre;
        producto_carrito.precio = producto.precio;
        producto_carrito.imagen = producto.imagen;
        console.log(producto_carrito); // es un objeto con los datos del producto que he hecho click
      }
    });

    // i
    let i = document.createElement("I");
    i.classList.add("fa-solid");
    i.classList.add("fa-cart-arrow-down");
    i.classList.add("card__icon");
    button.appendChild(i);
    card.appendChild(button);

    cards.appendChild(card); //añadimos el card al div cards
  });
}; //fin de mostrarProductos

modal_aniadir.addEventListener("click", (event) => {
  //leer el localStorage para OBTENER EL CARRITO ACTUAL
  if (localStorage.getItem("producto_carrito")) {
    carritoGuardado =
      JSON.parse(localStorage.getItem("producto_carrito")) || [];
  }
  console.log("Carrito ya guardado:", carritoGuardado); //es un array de objetos que ya estaban en el carrito
  //tengo en prodcuto_carrito el producto que he añadido al carrito en el modal como un objeto
  console.log("producto_carrito: ", producto_carrito); //es un objeto con los datos del producto que he hecho click
  //creo una copia del objeto producto_carrito para que no se modifique cuando lo añada al carrito
  //tengo que meter en carrito los objetos que ya estaban en el carrito
  carrito = carritoGuardado.slice();
  const producto_carrito_copia = { ...producto_carrito };
  //añadir el producto al carrito como un objeto
  carrito.push(producto_carrito_copia);
  //limpio producto_carrito para que no se añada al carrito otra vez
  producto_carrito = {};
  //muestro el array con los objetos que voy añadiendo
  console.log("carrito: ", carrito);
  //lo guardo en el localStorage
  localStorage.setItem("producto_carrito", JSON.stringify(carrito));
  //ocultar el modal
  modal_container.style.top = "-100%";
});
modal_cancelar.addEventListener("click", (event) => {
  modal_container.style.top = "-100%";
});
document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();
});

carrito__compra.addEventListener("click", () => {
  window.location.href = "carrito.html";
});
