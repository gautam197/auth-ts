import mongoose from "mongoose";
import { model, Document, Schema } from "mongoose";
import config from "config";
import bcrypt from "bcrypt";

export interface UserDocument extends Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

UserSchema.pre("save",  async function(next){
  let user = this;
  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));

  const hash = await bcrypt.hashSync(user.password, salt);
  user.password = hash

  return next();
});
UserSchema.methods.comparePassword = async function (
    candidatePassword: string
  ) {
    const user = this as UserDocument;
  
    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
  };


const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;