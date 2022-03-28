import { DocumentDefinition, FilterQuery } from "mongoose";
import User, { UserDocument } from "../model/user.model";
import { omit } from "lodash";

export const createUser = async (input: DocumentDefinition<UserDocument>)=> {
  try {
    return await User.create(input);
  } catch (error: any) {
      if(error){
          throw new Error(error)
      }else{
          throw new Error("Internal server error!")
      }
    }

}

export const findUser =async (query: FilterQuery<UserDocument>) => {
  return User.findOne(query).lean()
  
}

export const validatePassword =async ({
  email,
  password,
}: {
  email: UserDocument["email"];
  password: string;
})=>{
  const user = await User.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return false;
  }

  return omit(user, "password");
}