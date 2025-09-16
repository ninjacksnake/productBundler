export interface  IUser {
    id: number;
    name: string;
    lastName?: string;
    email?: string;
    password?: string;
    role?: string;
    createdDate?: Date;
    updatedDate?: Date;
    photo?: string;
  }
  