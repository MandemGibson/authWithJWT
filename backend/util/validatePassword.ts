import bcrypt from "bcryptjs";

export const validatePassword = async (
  password: string,
  hashedPassword: string
) => {
  try {
    const isValid = await bcrypt.compare(password, hashedPassword);
    return isValid;
  } catch (error: any) {
    console.error(error);
  }
};
