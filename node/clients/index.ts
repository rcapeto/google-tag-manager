import { IOClients } from '@vtex/api'

import { MasterDataController } from './masterDataController';

export class Clients extends IOClients {
  public get masterdataController() {
    return this.getOrSet('masterData', MasterDataController)
  }
}
