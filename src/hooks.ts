import prisma from '@prisma/client'
import type { Handle } from '@sveltejs/kit'

const client = new prisma.PrismaClient()

const handle: Handle = ({ event, resolve }) => {
  event.locals = {
    prisma: client,
    messages: client.message,
    users: client.user,
  }

  return resolve(event)
}

export { handle }
