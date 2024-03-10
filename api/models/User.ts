import { Model, Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
  email: string;
  password: string;
}

interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  email: {
    type: String,
    maxlength: 50,
  },
  password: {
    type: String,
    minlength: 5,
  },
});

userSchema.pre("save", async function (next) {
  let user = this;

  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  }
  next();
});

userSchema.method(
  "comparePassword",
  async function (plainPassword: string): Promise<boolean> {
    const match = await bcrypt.compare(plainPassword, this.password);

    return match;
  }
);

const User = model<IUser, UserModel>("User", userSchema);

export { User };
