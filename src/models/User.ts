import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  nome: string;
  email: string;
  password: string;
  genero: 'Masculino' | 'Feminino';
  telefone: string;
  dNasc: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    nome: {
      type: String,
      required: [true, 'Por favor, informe o nome'],
      trim: true,
      minlength: [3, 'Nome deve ter no mínimo 3 caracteres'],
      maxlength: [100, 'Nome deve ter no máximo 100 caracteres'],
    },
    email: {
      type: String,
      required: [true, 'Por favor, informe o email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Por favor, informe um email válido',
      ],
    },
    password: {
      type: String,
      required: [true, 'Por favor, informe a senha'],
      minlength: [6, 'Senha deve ter no mínimo 6 caracteres'],
      select: false,
    },
    genero: {
      type: String,
      enum: ['Masculino', 'Feminino'],
      required: [true, 'Por favor, informe o gênero'],
    },
    telefone: {
      type: String,
      required: [true, 'Por favor, informe o telefone'],
      match: [
        /^[0-9]{9,15}$/,
        'Por favor, informe um telefone válido (apenas números)',
      ],
    },
    dNasc: {
      type: Date,
      required: [true, 'Por favor, informe a data de nascimento'],
      validate: {
        validator: function(value: Date) {
          const today = new Date();
          const birthDate = new Date(value);
          const age = today.getFullYear() - birthDate.getFullYear();
          return age >= 18 && age <= 150;
        },
        message: 'Usuário deve ter entre 18 e 150 anos',
      },
    },
  },
  {
    timestamps: true,
  }
);

// Hash da senha antes de salvar
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Método para comparar senhas
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', userSchema);