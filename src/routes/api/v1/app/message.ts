import type { RequestHandler } from '@sveltejs/kit'
import type { MessageBody } from '../_types'

export const post: RequestHandler = async ({ locals, request }) => {
  const body = await request.json() as MessageBody

  const message = await locals.messages.create({
    data: {
      userId: body.userId,
      content: body.content,
    },
    include: {
      user: true,
    },
  })

  void locals.wss.broadcast('message', message)

  return {
    body: {
      message,
    },
  }
}
