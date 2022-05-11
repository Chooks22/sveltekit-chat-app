import { cookiefyToken } from '$lib/cookies'
import { createToken } from '$lib/jwt'
import type { RequestHandler } from '@sveltejs/kit'
import { argon2Verify } from 'hash-wasm'
import type { AuthBody, AuthResult } from '../_types'
import { timeout } from './_utils'

// @ts-ignore svelte dumb types
// eslint-disable-next-line @typescript-eslint/ban-types
const post: RequestHandler<{}, AuthResult> = async ({ locals, request }) => {
  const denied = timeout(403)

  const body = await request.json() as AuthBody
  const user = await locals.users.findFirst({
    where: {
      username: body.username,
    },
    select: {
      id: true,
      username: true,
      password: true,
    },
  })

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

  const payload: App.Session = {
    id: user.id,
    username: user.username,
  }

  const [token, err] = await createToken(payload)
  if (err) {
    console.error('login:', err)
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
