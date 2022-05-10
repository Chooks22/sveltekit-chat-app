import type { RequestHandler } from '@sveltejs/kit'
import { argon2id } from 'hash-wasm'
import { randomBytes } from 'node:crypto'
import { timeout } from './_utils'

interface RequestBody {
  username: string
  password: string
}

const post: RequestHandler = async ({ locals, request }) => {
  const denied = timeout(403)

  const body = await request.json() as RequestBody
  const count = await locals.users.count({
    where: { username: body.username },
  })

  if (count > 0) {
    return denied
  }

  const hash = await argon2id({
    password: body.password,
    salt: randomBytes(16),
    parallelism: 1,
    iterations: 1,
    memorySize: 37 * 1024,
    hashLength: 32,
    outputType: 'encoded',
  })

  const user = await locals.users.create({
    data: {
      username: body.username,
      password: hash,
    },
    select: {
      id: true,
      username: true,
    },
  })

  return {
    body: {
      user,
    },
  }
}

export { post }
