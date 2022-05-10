import type { RequestHandler } from '@sveltejs/kit'
import { argon2Verify } from 'hash-wasm'
import { timeout } from './_utils'

interface RequestBody {
  username: string
  password: string
}

const post: RequestHandler = async ({ locals, request }) => {
  const denied = timeout(403)

  const body = await request.json() as RequestBody
  const user = await locals.users.findFirst({ where: { username: body.username } })

  if (!user) {
    return denied
  }

  const match = await argon2Verify({
    hash: user.password,
    password: body.password,
  })

  if (!match) {
    return denied
  }

  return {
    body: {
      user: {
        id: user.id,
        username: user.username,
      },
    },
  }
}

export { post }
