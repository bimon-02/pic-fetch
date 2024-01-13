import bcryptjs from "bcryptjs";

export async function hashPassword({
  password,
}: {
  password: string;
}): Promise<string> {
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
}
