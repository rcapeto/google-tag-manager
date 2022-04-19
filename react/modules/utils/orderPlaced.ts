import { MasterDataErrorController } from "./masterDataError"

interface IResponse {
   hasOrder?: boolean
   error: boolean
   errorMessage?: string
   hasOrderId?: boolean
   orderId?: string
}

interface ITryConnectResponse {
   data: IResponse
   tentative: number
}

export class OrderPlaced {
   private route = '/v1/orderplaced'
   static maxTentatives: number = 3

   constructor(private masterDataErrorController: MasterDataErrorController) {}

   async tryConnectBack(tentatives: number): Promise<ITryConnectResponse> {
      const response: ITryConnectResponse = {
         data: { error: false },
         tentative: 0
      }

      for(let tentative = 0; tentative < tentatives; tentative++) {
         const data = await this.connectBack()
   
         response.data = data 
         response.tentative += 1

         if(!data.error) break
      }

      if(response.data.error && response.data.hasOrderId) {
         const { errorMessage, orderId } = response.data
         const date = new Date()
         const created_at = `${date.toLocaleDateString()}-${date.toLocaleTimeString()}`

         this.masterDataErrorController.createDocument({ 
            message: errorMessage ?? 'Server Error',
            created_at,
            orderId: orderId ?? '',
         })
      }

      return response
   }

   private getRouteWithOrderId(orderId: string): string {
      return `${this.route}?orderId=${orderId}`
   }

   public async connectBack(): Promise<IResponse> {
      const url = new URL(window.location.href)
      const orderId = url.searchParams.get('og')

      if(!orderId) {
         return {
            error: true,
            errorMessage: 'orderId params is required',
            hasOrderId: false,
         }
      }

      try {
         const url = this.getRouteWithOrderId(orderId)
         const response = await fetch(url, { 
            headers: {
               'Content-Type': 'application/json'
            }
         })
         const data = await response.json()
         
         return { ...data, hasOrderId: true, orderId }

      } catch(err) {
         return {
            error: true,
            errorMessage: err.message,
            hasOrderId: true,
            orderId
         }
      }
   }
}