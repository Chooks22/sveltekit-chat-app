export interface Chat {
  id: string
  content: string
  user: App.Session
  userId: string
  createdAt: Date
}

export interface GroupedChats {
  chats: Chat[]
}
