import { string, object, ref } from "yup";
export const createUserSchema = object({
  body: object({
    name: string().required("Name is required."),
    password: string()
      .required("Password is required.")
      .min(6, "Length of a password must be atleast 6 character."),
    passwordConfirmation: string().oneOf(
      [ref("password"), null],
      "password must match"
    ),
    email: string()
      .email("Must be valid email!")
      .required("Email field is required!"),
  }),
});


export const createUserSessionSchema = object({
  body: object({
    password: string()
      .required("Password is required")
      .min(6, "Password is too short - should be 6 chars minimum.")
      .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),

    email: string()
      .email("Must be a valid email")
      .required("Email is required"),
  }),
});
