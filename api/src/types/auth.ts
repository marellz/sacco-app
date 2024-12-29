import { Request } from "express";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  name: string;
}

export interface LoginRequest extends Request {
  body: LoginPayload;
}

export interface RegisterRequest extends Request {
  body: RegisterPayload;
}

export interface User {
    _id: string;
    name: string;
    email: string;
    avatar: string;
}