import { getOrders } from './methods/orderplaced'

export async function orderplacedController(context: Context, next: () => Promise<any>) {
   const orderId = context.request.query.orderId as string
   const account = context.vtex.account

   console.log("CONTEXT", { context })

   if(orderId) {
      const response = context.response
      console.log('passou aqui', account)
      const data = await getOrders(account)
      console.log('passou aqui', { data })

      response.body = {
         orders: [],
         data
      }
   } else {

   }

   next()
}