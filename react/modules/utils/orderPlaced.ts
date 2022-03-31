export class OrderPlaced {
   private route = '/v1/orderplaced'

   private getRouteWithOrderId(orderId: string): string {
      return `${this.route}?orderId=${orderId}`
   }

   public async connectBack(): Promise<{ hasOrder?: boolean, error: boolean }> {
      const url = new URL(window.location.href)
      const orderId = url.searchParams.get('og')

      if(!orderId) {
         return {
            error: true,
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
   
         return data
      } catch(err) {
         return {
            error: true,
         }
      }
   }
}