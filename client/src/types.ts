export interface Note {
  id: number;
  title: string;
  image?: string;
  note: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}
