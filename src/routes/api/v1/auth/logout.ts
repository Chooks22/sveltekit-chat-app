import type { RequestHandler } from '@sveltejs/kit'

const response = {
  headers: { 'set-cookie': 'jwt=;HttpOnly;SameSite=Strict;Max-Age=0' },
}

export const post: RequestHandler = () => response
