const errorMessageList = {
  /**
   * Auth Errors
   */
  "auth.missing.fields.error":
    "Error de validación, uno o mas campos no fueron encontrados.",
  "auth.user.password.error": "Usuario o contraseña incorrecta",
  "auth.email.error": "Ingrese un email valido",
  "auth.password.error": "Ingrese un password valido",
  "auth.username.error": "Ingrese un username valido",
  "auth.duplicate.email.error": "La dirección de correo ya existe",
  /**
   * Socket Errors
   */
  "socket.missing.fields.error":
    "Error de validación, uno o mas campos no fueron encontrados.",
  "socket.invalid.token.error": "Token inválido",
  "socket.room.found.error": "Sala no encontrada",
  /**
   * User Errors
   */
  "user.room.found.error": "Sala no encontrada",
  /**
   * Middleware Errors
   */
  "middleware.invalid.token.error": "Token inválido",
};

const getErrorMessage = (code) => {
  return errorMessageList[code] || "Por favor inténtelo más tarde.";
};
export default getErrorMessage;
