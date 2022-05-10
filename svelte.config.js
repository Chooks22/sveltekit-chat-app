import adapter from '@sveltejs/adapter-node'
import { resolve } from 'node:path'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),
  kit: {
    adapter: adapter({ out: 'dist' }),
    vite: {
      resolve: {
        alias: [
          {
            find: '@components',
            replacement: resolve('./src/components'),
          },
        ],
      },
    },
  },
}

export default config
