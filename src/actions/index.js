export const validateEmail = (email) => {
  const reg = /\S+@\S+\.\S+/;
  return reg.test(email);
}