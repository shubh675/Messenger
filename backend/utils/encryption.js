import bcrypt from "bcrypt";
export async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

export async function matchPassword(password, hashPassword) {
  return await bcrypt.compare(password, hashPassword);
}
