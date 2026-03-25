/**
 * Datos de prueba centralizados
 * Esto facilita el mantenimiento y reutilización de datos
 */

export const validUsers = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  // Puedes agregar más usuarios válidos aquí
};

export const invalidUsers = {
  wrongUsername: {
    username: 'invalid_user',
    password: 'wrong_password',
  },
  wrongPassword: {
    username: 'standard_user',
    password: 'wrong_password',
  },
  emptyCredentials: {
    username: '',
    password: '',
  },
};

export const errorMessages = {
  invalidCredentials: 'Epic sadface: Username and password do not match any user in this service',
  usernameRequired: 'Epic sadface: Username is required',
  passwordRequired: 'Epic sadface: Password is required',
};
