class Cliente {
  constructor(codigo, nombre, apellidos, email, usuario, password) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.email = email;
    this.usuario = usuario; // Usuario es único
    this.password = password;
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

  getApellidos() {
    return this.apellidos;
  }
  setApellidos(apellidos) {
    this.apellidos = apellidos;
  }

  getEmail() {
    return this.email;
  }
  setEmail(email) {
    this.email = email;
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
