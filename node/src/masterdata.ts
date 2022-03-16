export async function handleGetDoc(context: Context, next: () => Promise<any>) {
   const masterData = context.clients.masterdataController
   const { query } = context.request
   const orderId = query.orderId as string
   const response = context.response

   if(orderId) {
      try {
         const data = await masterData.getDoc(orderId)
         response.body = data
      } catch(err) {
         response.body = err
      }
   }

   next()
};