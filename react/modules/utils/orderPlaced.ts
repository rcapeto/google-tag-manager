import { OrderMD } from '../../typings/orderplaced'
const masterDataName = 'orderplaced'

const baseURL = {
   get: `/api/dataentities/${masterDataName}/search/?_fields=orderId&_v=${Date.now()}`,
   put: `/api/dataentities/${masterDataName}/documents`
}

export const postOrder = async (orderId: string) => {
   await fetch(baseURL.put, { 
      method: 'PUT',
      body: JSON.stringify({ orderId: `${orderId}-01` }),
      headers: {
         'Content-Type': 'application/json'
      }
   })
}

export const checkHasOrderInMD = async () => {
   const url = new URL(window.location.href)
   const orderId = url.searchParams.get('og')

   if(orderId) {
      try {
         const response = await fetch(baseURL.get)
         const data = await response.json() as OrderMD[]

         const hasOrder = data.find(order => order.orderId === `${orderId}-01`)

         console.log('O pedido no master data', hasOrder)

         if(!(!!hasOrder)) {
            console.log('iniciando put no master data')
            await postOrder(orderId)
            console.log('finalizando put no master data')
         }

         return !!hasOrder

      } catch(err) {
         console.error('Api error', { message: err.message })
         return true
      }
   }

   return false
}