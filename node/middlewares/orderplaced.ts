export async function orderplacedController(context: Context) {
   const orderId = context.request.query.orderId as string
   const orderplaced = context.clients.orderplaced
   const response = context.response

   if(orderId) {
      try {
         const hasOrder = await orderplaced.hasOrder(orderId)

         response.status = 200
         response.body = {
            hasOrder,
            error: false
         }

      } catch(err) {
         response.status = 408 //timeout
         response.body = {
            error: true,
            errorMessage: (err as any).message
         }
      }
      
   } else {
      response.status = 400
      response.body = {
         errorMessage: 'orderId params is required',
         error: true
      }
   }
}