export interface AuthResult {
  user: App.Session
}

export interface AuthBody {
  username: string
  password: string
}

export interface MessageBody {
  userId: string
  content: string
}
