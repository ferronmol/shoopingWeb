tablaventas_body = document.getElementById("tablaventas_body"); //aqui se van a mostrar las ventas filtradas
select_clientes = document.getElementById("select_clientes");
select_productos = document.getElementById("select_productos");
select_precios = document.getElementById("select_precios");
btn_todos = document.getElementById("btn_todos");

// Crea una celda
const nuevaCelda = (dato) => {
  let nuevacelda = document.createElement("TD");
  nuevacelda.textContent = dato;
  return nuevacelda;
};

// let fecha = ("0" + date.getDate()).slice(-2) + "-" + ("0" + (date.getMonth() + 1)).slice(-2) +  "-" + date.getFullYear();
const fecha = new Date().toLocaleDateString();
//nuevafila.append(nuevaCelda(fecha));
//creo un array par alamacenar las ventas
const Ventas = [];
const Clientes = [];
const Productos = [];

/************************************************* */
const urlClientes = "https://randomuser.me/api/?results=20";

//voy a pedirle a la api 20 clientes para crear objetos de la clase cliente
const cargarClientes = async () => {
  try {
    const res = await fetch(urlClientes);
    const data = await res.json();
    // console.log(data);
    const clientes = data.results.map((clienteData) => {
      const codigo = clienteData.login.uuid;
      const nombre = clienteData.name.first;
      const apellidos = clienteData.name.last;
      const email = clienteData.email;
      const usuario = clienteData.login.username;
      const password = clienteData.login.password;
      return new Cliente(codigo, nombre, apellidos, email, usuario, password);
    });
    console.log(clientes);
    mostrarClientes(clientes);
    //meto los clientes en el array de clientes
    clientes.forEach((cliente) => Clientes.push(cliente));
    console.log("clientes", Clientes);
  } catch (error) {
    console.log(error);
  }
};

const mostrarClientes = (clientes) => {
  clientes.forEach((cliente) => {
    let option = document.createElement("OPTION");
    option.textContent = `${cliente.nombre} ${cliente.apellidos}`;
    select_clientes.appendChild(option);
  });
};
/******************************************************************* */
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
    //meto los productos en el array de productos
    productos.forEach((producto) => Productos.push(producto));
    console.log("productos", Productos); //para ver que se han cargado los productos en el array
    simulaVenta();
  } catch (error) {
    console.log(error);
  }
};
cargarClientes();
cargarProductos();

const mostrarProductos = (productos) => {
  productos.forEach((producto) => {
    let option = document.createElement("OPTION");
    option.textContent = `${producto.nombre}`;
    select_productos.appendChild(option);
  });
};
/******************************************************************* */

// Función para simular una venta
// Función para simular una venta
const simulaVenta = () => {
  // Asegúrate de que haya clientes y productos antes de intentar crear una venta
  if (Clientes.length > 0 && Productos.length > 0) {
    console.log("simulando venta, clientes y productos disponibles");

    for (let i = 0; i < 25; i++) {
      // Selecciona un cliente aleatorio
      const cliente = Clientes[Math.floor(Math.random() * Clientes.length)];

      // Selecciona un producto aleatorio
      const producto = Productos[Math.floor(Math.random() * Productos.length)];

      // Selecciona el precio del producto aleatorio
      const precio = producto.precio;
      //console.log("precio", precio);

      // Crea una nueva venta
      const fecha = new Date().toLocaleDateString();
      const venta = new Venta(cliente, producto, fecha);
      venta.precio = precio;

      // Agrega la venta al array de ventas
      Ventas.push(venta);
      //console.log("ventas simuladas", venta);
    }

    console.log("ventas", Ventas);
  } else {
    console.log(
      "No hay clientes o productos disponibles para realizar ventas."
    );
  }
};

// Llama a la función para simular 15 ventas
simulaVenta();

// Función para filtrar y mostrar las ventas en la tabla
const filtrarVentas = () => {
  // Obtener los valores seleccionados en los select
  const clienteSeleccionadoOption =
    select_clientes.options[select_clientes.selectedIndex]; //para obtener el texto del option seleccionado
  const clienteSeleccionado = clienteSeleccionadoOption.value; //para obtener el valor del option seleccionado no se puede hacer directamente
  const productoSeleccionado = select_productos.value;
  const precioSeleccionado = select_precios.value;

  // console.log("cliente seleccionado", clienteSeleccionado);
  // console.log("producto seleccionado", productoSeleccionado);
  // console.log("precio seleccionado", precioSeleccionado);

  // Lógica de filtrado de ventas usando filter sobre el array de ventas
  const ventasFiltradas = Ventas.filter((venta) => {
    const cumpleCliente =
      !clienteSeleccionado ||
      venta.cliente.nombre + " " + venta.cliente.apellidos ===
        clienteSeleccionado;
    const cumpleProducto =
      !productoSeleccionado || venta.producto.nombre === productoSeleccionado;
    const cumplePrecio =
      !precioSeleccionado || cumpleConPrecio(venta.precio, precioSeleccionado);

    return cumpleCliente && cumpleProducto && cumplePrecio;
  });

  // Limpiar la tabla antes de agregar las filas filtradas
  tablaventas_body.innerHTML = "";

  ventasFiltradas.forEach((venta) => {
    // Crear una nueva fila
    let nuevafila = document.createElement("TR");
    nuevafila.append(
      nuevaCelda(venta.cliente.nombre + " " + venta.cliente.apellidos)
    );
    nuevafila.append(nuevaCelda(venta.producto.nombre));
    nuevafila.append(nuevaCelda(venta.precio + " €"));
    nuevafila.append(nuevaCelda(venta.fecha));

    // Agregar la fila a la tabla
    tablaventas_body.appendChild(nuevafila);
  });
};
/************************************************************************************* */
// Función para verificar si un precio cumple con el rango seleccionado (rango solo en algunos casos)
const cumpleConPrecio = (precio, rango) => {
  console.log(precio, rango);
  const precioNum = parseFloat(precio);
  if (isNaN(precioNum)) {
    return false; //no cumple con el rango
  }
  if (rango === "10") {
    return precioNum < 10;
  } else if (rango === "10-50") {
    return precioNum >= 10 && precioNum <= 50;
  } else if (rango === "50-100") {
    return precioNum >= 50 && precioNum <= 100;
  } else if (rango === "100-200") {
    return precioNum >= 100 && precioNum <= 200;
  } else if (rango === "200") {
    return precioNum > 200;
  } else {
    return false;
  }
};

/******************************************************************************* */
//eventos de cambio en los select
select_clientes.addEventListener("change", filtrarVentas);
select_productos.addEventListener("change", filtrarVentas);
select_precios.addEventListener("change", filtrarVentas);

btn_todos.addEventListener("click", () => {
  select_clientes.value = "";
  select_productos.value = "";
  select_precios.value = "";
  filtrarVentas(); //para que se muestren todas las ventas una vez limpiado el formulario
});
//al cargar la pagina se realizan las ventas simuladas
filtrarVentas();
