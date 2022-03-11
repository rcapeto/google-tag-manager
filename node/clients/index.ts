import { IOClients } from '@vtex/api'
import { ManipulateMasterData } from './Queries/manipulateMasterData'

export class Clients extends IOClients {
  public get manipulateMasterData() {
    return this.getOrSet('manipulateMasterData', ManipulateMasterData)
  }
}
