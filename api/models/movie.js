import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 2,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Введите корректный email.');
      }
    }
  }
});