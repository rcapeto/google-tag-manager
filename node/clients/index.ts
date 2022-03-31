import { IOClients } from '@vtex/api'

import { OrderPlacedController } from './controllers/OrderPlaced'

export class Clients extends IOClients {
   public get orderplaced() {
      return this.getOrSet('orderplaced', OrderPlacedController)
   }
}