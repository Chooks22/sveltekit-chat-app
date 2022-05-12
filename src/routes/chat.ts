import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler = async ({ locals }) => {
  const messages = await locals.messages.findMany({
    take: 50,
    orderBy: {
      createdAt: 'asc',
    },
  })

  const userIds = new Set(messages.map(msg => msg.userId))

  const users = await locals.users.findMany({
    where: {
      id: {
        in: [...userIds],
      },
    },
    select: {
      id: true,
      username: true,
    },
  })

  return {
    body: {
      messages,
      users,
    },
  }
}
