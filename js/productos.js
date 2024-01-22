class Producto {
  constructor(codigo, nombre, precio, imagen) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
  }

  getCodigo() {
    return this.codigo;
  }
  setCodigo(codigo) {
    this.codigo = codigo;
  }

  getNombre() {
    return this.nombre;
  }
  setNombre(nombre) {
    this.nombre = nombre;
  }

  getPrecio() {
    return this.precio;
  }
  setPrecio(precio) {
    this.precio = precio;
  }

  getImagen() {
    return this.imagen;
  }
  setImagen(imagen) {
    this.imagen = imagen;
  }

  getUsuario() {
    return this.usuario;
  }
  setUsuario(usuario) {
    this.usuario = usuario;
  }

  getPassword() {
    return this.password;
  }
  setPassword(password) {
    this.password = password;
  }
}
