/* eslint-disable @typescript-eslint/ban-types */
// import exampleHandler from './handlers/exampleHandler'
import { ServiceContext, RecorderState, ClientsConfig } from "@vtex/api"
import { Service, LRUCache } from "@vtex/api"

import { Clients } from './clients'

const TIMEOUT_MS = 2 * 60 * 1000

const memoryCache = new LRUCache<string, any>({ max: 1000 })

metrics.trackCache('status', memoryCache)

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
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
  routes: {}
})

