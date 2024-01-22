class Venta {
  constructor(cliente, producto, fecha,) {
      this.cliente = cliente;
      this.producto = producto;
      this.fecha = fecha;
  }

  getCliente() {
      return this.cliente;
  }
  setCliente(cliente) {
      this.cliente = cliente;
  }

  getProducto() {
      return this.producto;
  }
  setProducto(producto) {
      this.producto = producto;
  }

  getFecha() {
      return this.fecha;
  }
  setFecha(fecha) {
      this.fecha = fecha;
  }
}