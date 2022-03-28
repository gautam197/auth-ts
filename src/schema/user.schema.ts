import {string, object, ref} from "yup"
export const createUserSchema = object({
    body: object({
        name: string().required("Name is required."),
        password: string().required("Password is required.").min(6, "Length of a password must be atleast 6 character."),
        passwordConfirmation: string().oneOf([ref("password"), null], "password must match"),
        email: string().email("Must be valid email!").required("Email field is required!")
    })
})