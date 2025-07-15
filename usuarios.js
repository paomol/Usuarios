let usuarios = [];

function addusuario(id, nombre, correo, contraseña) {
  usuarios.push({ id, nombre, correo, contraseña });
}

function buscarxcorreo(correo) {
  return usuarios.find((usuario) => usuario.correo === correo);
}

module.exports = {
  addusuario,
  buscarxcorreo,
};
