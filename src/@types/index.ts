export interface IPost {
  createdAt: string;
  tags: string[] & string;
  text: string;
  title: string;
  updatedAt: string;
  imageUrl: string;
  user: IUser2;
  viewsCount: number;
  comments?: IPostDescComment[];
  _id: string;
  isFullPost?: boolean;
  isEditable: boolean;
  children?: React.ReactNode;
}

export interface IPostDescComment {
  CommentText: string;
  user: {
    name: string;
    surname: string;
    _id: string;
    userAvatar?: string;
  };
  _id?: string;
  createdAt: string;
}

export interface IAuth {
  email: string;
  password: string;
  credentials?: IRegister;
  userAvatar?: string;
}

export interface IRegister {
  name: string;
  surname: string;
}

export interface IUser {
  email: string;
  id: string;
  isActivated: boolean;
  name: string;
  surname: string;
  userAvatar: string;
}

export interface IUser2 {
  email: string;
  _id: string;
  isActivated: boolean;
  name: string;
  surname: string;
  userAvatar: string;
}

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface ICreatePost {
  text: string;
  tags: string[];
  imageUrl: string;
  title: string;
}

export interface ITags {
  _id: string;
  tags: string;
}

export interface IComments {
  _id: string;
  user: {
    name: string;
    surname: string;
    userId: string;
    userAvatar?: string;
  };
  comment: IPostDescComment;
}

export interface IErrorResponse {
  message: string;
  errors: {
    value: string;
    msg: string;
    param: string;
    location: string;
  }[];
}
