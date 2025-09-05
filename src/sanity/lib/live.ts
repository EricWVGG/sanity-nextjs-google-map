// note: this only works in components that generate user-facing data (pages), due to use of preview/drafts
// for generateStaticParams, use ../client.ts

import { defineLive } from 'next-sanity'
import { client } from './client'
import { token } from '../env'

export const { sanityFetch, SanityLive } = defineLive({
  // @ts-ignore
  client: client.withConfig({
    // Live content is currently only available on the experimental API
    // https://www.sanity.io/docs/api-versioning
    apiVersion: 'vX',
  }),
  serverToken: token,
  browserToken: token,
})
