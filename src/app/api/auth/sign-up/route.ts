import { NextRequest } from "next/server";
import { APIMessages, APIRES, HttpStatus } from "../../_lib";
import { CreateUserSchema } from "@/models/create-user-schema";
import { createUserUsingEmailAndPassword } from "./_lib/create-user-with-email-and-password";
import { db } from "@/config/firebase";
import { addDoc, collection } from "firebase/firestore";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    
    const isValidBody = await CreateUserSchema.safeParseAsync(reqBody);
    if (!isValidBody.success) {
      return APIRES({
        status: HttpStatus.BadRequest,
        message: APIMessages[HttpStatus.BadRequest],
        error: isValidBody.error.issues[0],
      });
    }
    const data = isValidBody.data;
    if (!data.email || !data.password) {
      return APIRES({
        status: HttpStatus.BadRequest,
        message: APIMessages[HttpStatus.BadRequest],
        error: "Email and password are required",
      });
    }
    
    const user = await createUserUsingEmailAndPassword({
      email: data.email,
      password: data.password,
    });
    console.log(data);

    if (!user) {
      return APIRES({
        status: HttpStatus.InternalServerError,
        message: APIMessages[HttpStatus.InternalServerError],
        error: "Something went wrong",
      });
    }

    const docRef = await addDoc(collection(db, "users"), {
      email: data.email,
      uid: user.user.uid,
    });
    if (!docRef) {
      return APIRES({
        status: HttpStatus.InternalServerError,
        message: APIMessages[HttpStatus.InternalServerError],
        error: "Something went wrong",
      });
    }
    return APIRES({
      status: HttpStatus.OK,
      message: APIMessages[HttpStatus.OK],
      data: {
        uid: user.user.uid,
        email: user.user.email,
      },
    });
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      return APIRES({
        status: HttpStatus.NotAcceptable,
        message: 'Email already exists, Please login',
        error: error
      });
    }
console.log(error);

    return APIRES({
      status: HttpStatus.InternalServerError,
      message: APIMessages[HttpStatus.InternalServerError],
      error: error,
    });
  }
}
