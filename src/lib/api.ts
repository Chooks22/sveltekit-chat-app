import type { AuthBody, AuthResult, MessageBody } from 'src/routes/api/v1/_types'

const headers = {
  'content-type': 'application/json',
}

export async function sendMessage(userId: string, content: string): Promise<boolean> {
  const body: MessageBody = {
    userId,
    content,
  }

  const res = await fetch('/api/v1/app/message', {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })

  return res.ok
}

export async function authenticate(type: 'login' | 'register', credentials: AuthBody): Promise<App.Session | null> {
  const res = await fetch(`/api/v1/auth/${type}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(credentials),
  })

  if (!res.ok) {
    return null
  }

  const data = await res.json() as AuthResult
  return data.user
}

export async function logout(): Promise<boolean> {
  const res = await fetch('/api/v1/auth/logout', {
    method: 'POST',
  })

  return res.ok
}
