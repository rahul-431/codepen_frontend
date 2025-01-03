type Pen = {
  _id: string;
  title: string;
  html?: string;
  css?: string;
  js?: string;
  author?: string;
  accessToken?: string;
};
type CurrentPenRequest = {
  id: string;
  accessToken: string;
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
  user: User;
  token: Token;
};
type User = {
  _id: string;
  name: string;
  email: string;
  pens: [];
  collections: [];
  followers: [];
  following: [];
} | null;
type Token = {
  accessToken: string;
  refreshToken: string;
} | null;

type CurrentUserRequest = {
  accessToken: string;
};

type CollectionCard = {
  data: Collection;
};
type PenResponse = {
  _id: string;
  title: string;
  code?: { html?: string; css?: string; js?: string };
  author?: string;
  createdAt: string;
  updatedAt: string;
  type: string;
  deleted: boolean;
  stats?: {
    views: string[];
    likes: string[];
    comments: string[];
  };
};
type PenCard = Pen & {
  createdAt?: string;
  updatedAt?: string;
  stats?: {
    views: string[];
    likes: string[];
    comments: string[];
  };
};

type ChangeTypeRequest = {
  accessToken: string;
  value: string;
  id: string;
};
type StateDeleteType = {
  id: string;
};
type Collection = {
  _id: string;
  title: string;
  description?: string;
  pens: string[] | PenResponse[];
  author: string | User;
  type: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  stats?: {
    views: string[];
    likes: string[];
    comments: string[];
  };
};
type CurrentCollectionResponse = {
  _id: string;
  title: string;
  description?: string;
  pens: PenResponse[];
  author: User;
  type: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  stats?: {
    views: string[];
    likes: string[];
    comments: string[];
  };
};
type CollectionRequest = {
  id?: string;
  title: string;
  description?: string;
  type?: string;
  accessToken: string;
};
