/* eslint-disable @typescript-eslint/ban-types */
// import exampleHandler from './handlers/exampleHandler'
import type { ServiceContext, RecorderState, ClientsConfig } from "@vtex/api";
import { Service, LRUCache, method } from "@vtex/api"

import { Clients } from './clients'
import { orderplacedController } from './src/orderplacedAPI'

const TIMEOUT_MS = 2000

const memoryCache = new LRUCache<string, any>({ max: 1000 })

metrics.trackCache('status', memoryCache)

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 3,
      timeout: TIMEOUT_MS,
    },
  },
}

declare global {
  type Context = ServiceContext<Clients, State>

  interface State extends RecorderState {
    id: number
  }
}

export default new Service({
  clients,
  graphql: {
    resolvers: {}
  },
  routes: {
    teste: method({
      GET: [orderplacedController]
    })
  }
})