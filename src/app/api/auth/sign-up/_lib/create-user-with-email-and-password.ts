import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../../../config/firebase";
import { CreateUserType } from "@/models/create-user-schema";

export async function createUserUsingEmailAndPassword({
  email,
  password,
}: CreateUserType) {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
}
