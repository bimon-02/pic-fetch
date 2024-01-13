// /src/app/utils/bcrypt.js
import bcrypt from 'bcrypt';

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const comparePassword = async (enteredPassword, hashedPassword) => {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};

export { hashPassword, comparePassword };
