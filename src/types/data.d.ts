type Pen = {
  _id: string;
  title: string;
  html?: string;
  css?: string;
  js?: string;
  author?: string;
};
type CurrentPenRequest = {
  id: string;
};
type RegisterForm = {
  name: string;
  email: string;
  password: string;
  cPassword: string;
};
type LoginForm = {
  email: string;
  password: string;
};
type AuthSlice = {
  user: {
    _id: string;
    name: string;
    email: string;
    pens: [];
  } | null;
  token: {
    accessToken: string;
    refreshToken: string;
  } | null;
};
type User = {
  _id: string;
  name: string;
  email: string;
  pens: [];
} | null;
type Token = {
  accessToken: string;
  refreshToken: string;
} | null;

type CurrentUserRequest = {
  accessToken: string;
};
