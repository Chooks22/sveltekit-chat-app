import { cookiefyToken } from '$lib/cookies'
import { createToken } from '$lib/jwt'
import type { RequestHandler } from '@sveltejs/kit'
import { argon2id } from 'hash-wasm'
import { randomBytes } from 'node:crypto'
import type { AuthBody, AuthResult } from '../_types'
import { timeout } from './_utils'

// @ts-ignore svelte dumb types
// eslint-disable-next-line @typescript-eslint/ban-types
const post: RequestHandler<{}, AuthResult> = async ({ locals, request }) => {
  const denied = timeout(403)

  const body = await request.json() as AuthBody
  const count = await locals.users.count({
    where: {
      username: body.username,
    },
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

  const payload: App.Session = {
    id: user.id,
    username: user.username,
  }

  const [token, err] = await createToken(payload)
  if (err) {
    console.error('register:', err)
    return { status: 500 }
  }

  return {
    headers: {
      'set-cookie': cookiefyToken(token),
    },
    body: {
      user: payload,
    },
  }
}

export { post }
