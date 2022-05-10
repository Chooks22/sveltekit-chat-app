import type { RequestHandlerOutput } from '@sveltejs/kit'
import { setTimeout as sleep } from 'node:timers/promises'

export function timeout(status: number): Promise<RequestHandlerOutput> {
  return sleep(500, { status })
}
