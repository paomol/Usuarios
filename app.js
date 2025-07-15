const express = require("express");
const app = express();
const port = 3000;

const { addusuario, buscarxcorreo } = require("./usuarios.js");
app.use(express.json());

app.post("/registro", (req, res) => {
  const { id, nombre, correo, contraseña } = req.body;

  if (!id || !nombre || !correo || !contraseña) {
    return res
      .status(400)
      .json({ mensaje: "Todos los campos son obligatorios" });
  }

  const usuarioExistente = buscarxcorreo(correo);
  if (usuarioExistente) {
    return res.status(400).json({ mensaje: "El correo ya está registrado" });
  }

  addusuario(id, nombre, correo, contraseña);
  res.status(201).json({ mensaje: "Usuario registrado exitosamente" });
});

app.post("/login", (req, res) => {
  const { correo, contraseña } = req.body;

  const usuario = buscarxcorreo(correo);
  if (!usuario || usuario.contraseña !== contraseña) {
    return res.status(401).json({ mensaje: "Correo o contraseña incorrectos" });
  }

  res.json({ mensaje: "Inicio de sesión exitoso", usuario });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Bienvenido a la API de usuarios");
});
