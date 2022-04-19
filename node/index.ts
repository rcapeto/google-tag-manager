/* eslint-disable @typescript-eslint/ban-types */
// import exampleHandler from './handlers/exampleHandler'
import type { ServiceContext, RecorderState, ClientsConfig } from "@vtex/api";
import { Service, LRUCache } from "@vtex/api"

import { Clients } from './clients'
import { orderplacedController } from './middlewares/orderplaced'

const TIMEOUT_MS = 60000

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

const createHandler = (callback: Function) => {
  return async function handler(ctx: Context) {
    ctx.response.set('Content-Type', 'application/json')
    ctx.response.set('Cache-Control', 'no-cache')
    ctx.response.set('Access-Control-Allow-Origin', '*')

    try {
      await callback(ctx)
    } catch (e) {
      const errorMessage = `Error processing ${e.message}`

      ctx.response.status = (e.response && e.response.status) || 500
      ctx.response.body = {
        error: (e.response && e.response.data) || e.message,
      }
      console.log(errorMessage, e)
    }
  }
}

export default new Service({
  clients,
  graphql: {
    resolvers: {}
  },
  routes: {
    orderplaced: createHandler(orderplacedController)
  }
})