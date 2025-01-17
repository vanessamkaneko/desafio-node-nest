import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { User as UserEntity } from 'src/core/user/entity/user.entity';
import { UserType } from 'src/core/user/entity/user.entity';

export const UserSchema = new Schema<UserEntity>({
  name: { type: String, required: true },
  cpf: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  user_type: { type: String, required: true, enum: Object.values(UserType) },
});

UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    delete ret.password;
    return ret;
  },
});

export const UserModel = mongoose.model('User', UserSchema);
