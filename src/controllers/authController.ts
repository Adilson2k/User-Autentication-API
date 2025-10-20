import { Request, Response } from 'express';
//import jwt from 'jsonwebtoken';
import User from '../models/User';
import jwt, { Secret, SignOptions } from "jsonwebtoken";

// Gerar JWT Token
const generateToken = (id: string): string => {
  const secret: Secret = process.env.JWT_SECRET as Secret;
  if (!secret) {
    // Falha rápida — evita passar string vazia e corrige erro de tipagem
    throw new Error('JWT_SECRET não está definido no environment');
  }

  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRE as string) || '1h',
  } as SignOptions;

  return jwt.sign({ id }, secret, options);
};



// @desc    Registrar novo usuário
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nome, email, password, genero, telefone, dNasc } = req.body;

    // Verificar se usuário já existe
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({
        success: false,
        message: 'Usuário já cadastrado com este email',
      });
      return;
    }

    // Criar usuário
    const user = await User.create({
      nome,
      email,
      password,
      genero,
      telefone,
      dNasc,
    });

  const token = generateToken(String(user._id));

    res.status(201).json({
      success: true,
      message: 'Usuário registrado com sucesso',
      data: {
        _id: user._id,
        nome: user.nome,
        email: user.email,
        genero: user.genero,
        telefone: user.telefone,
        dNasc: user.dNasc,
        createdAt: user.createdAt,
        token,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Erro ao registrar usuário',
      error: error.message,
    });
  }
};

// @desc    Login de usuário
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validar dados
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Por favor, forneça email e senha',
      });
      return;
    }

    // Buscar usuário (incluindo password)
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Credenciais inválidas',
      });
      return;
    }

    // Verificar senha
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      res.status(401).json({
        success: false,
        message: 'Credenciais inválidas',
      });
      return;
    }

  const token = generateToken(String(user._id));

    res.status(200).json({
      success: true,
      message: 'Login realizado com sucesso',
      data: {
        _id: user._id,
        nome: user.nome,
        email: user.email,
        genero: user.genero,
        telefone: user.telefone,
        dNasc: user.dNasc,
        token,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Erro ao fazer login',
      error: error.message,
    });
  }
};

// @desc    Obter perfil do usuário atual
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user;

    res.status(200).json({
      success: true,
      data: {
        _id: user?._id,
        nome: user?.nome,
        email: user?.email,
        genero: user?.genero,
        telefone: user?.telefone,
        dNasc: user?.dNasc,
        createdAt: user?.createdAt,
        updatedAt: user?.updatedAt,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Erro ao buscar perfil',
      error: error.message,
    });
  }
};

// @desc    Atualizar perfil do usuário
// @route   PUT /api/auth/updateprofile
// @access  Private
export const updateProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { nome, email, genero, telefone, dNasc } = req.body;

    const user = await User.findById(req.user?._id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'Usuário não encontrado',
      });
      return;
    }

    user.nome = nome || user.nome;
    user.email = email || user.email;
    user.genero = genero || user.genero;
    user.telefone = telefone || user.telefone;
    user.dNasc = dNasc || user.dNasc;

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: 'Perfil atualizado com sucesso',
      data: {
        _id: updatedUser._id,
        nome: updatedUser.nome,
        email: updatedUser.email,
        genero: updatedUser.genero,
        telefone: updatedUser.telefone,
        dNasc: updatedUser.dNasc,
        updatedAt: updatedUser.updatedAt,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Erro ao atualizar perfil',
      error: error.message,
    });
  }
};

// @desc    Listar todos os usuários (para teste)
// @route   GET /api/auth/users
// @access  Private
export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await User.find().select('-password');

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Erro ao buscar usuários',
      error: error.message,
    });
  }
};