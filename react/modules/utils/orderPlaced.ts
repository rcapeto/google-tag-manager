const baseURL = '/v1/masterdatacontroller';

export const checkHasOrderInMD = async () => {
   const url = new URL(window.location.href)
   const orderId = url.searchParams.get('og')

   if(orderId) {
      const masterDataUrl = `${baseURL}/?orderId=${orderId}-01`
      const response = await fetch(masterDataUrl)
      const data = await response.json()

      console.log('DATA FRONTEND', data)
      
      return true
   }

   return false
}