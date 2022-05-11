import { verifyToken } from '$lib/jwt'
import prisma from '@prisma/client'
import type { GetSession, Handle } from '@sveltejs/kit'
import { parse } from 'cookie'

process.env.DATABASE_URL ??= 'postgresql://'
const client = new prisma.PrismaClient()

const getSession: GetSession = async ({ request }) => {
  const cookie = request.headers.get('cookie')
  if (!cookie) {
    return {} as App.Session
  }

  const token = parse(cookie).jwt
  if (!token) {
    return {} as App.Session
  }

  const [payload, err] = await verifyToken(token)
  if (err !== null) {
    return {} as App.Session
  }

  return {
    id: payload.id,
    username: payload.username,
  }
}

const handle: Handle = ({ event, resolve }) => {
  event.locals = {
    prisma: client,
    messages: client.message,
    users: client.user,
  }

  return resolve(event)
}

export { handle, getSession }
