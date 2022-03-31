import axios from 'axios'

const masterDataName = 'orderplaced'
const baseURL = {
   get: (account: string) => `https://${account}.vtexcommercestable.com.br/api/dataentities/${masterDataName}/search/?_fields=orderId&_v=${Date.now()}`,
   put: (account: string) => `https://${account}.vtexcommercestable.com.br/api/dataentities/${masterDataName}/documents`
}

const getHeaders = (account: string) => ({
   accept: "application/vnd.vtex.ds.v10+json",
   "Content-Type": "application/json",
   'X-VTEX-Use-Https': true,
   'X-VTEX-API-AppKey': `vtexappkey-${account}-TSKDFR`,
   'X-VTEX-API-AppToken': 'RIENUZAYFONEVTFVBCIPNNQHIGQBWWYXNCXSTCRKOKVAYPBBPECSDLIERXEOJZBIPQQSWNCYLXBCSQITFOMSUFTCUTAWXDBPJMKIZIFCBEHFKFMBOLJUNJOJXOYDMGAI'
})

export const getOrders = async (account: string): Promise<{ orderId: string}[]> => {
   const { data } = await axios.get<{ orderId: string}[]>(baseURL.get(account), { 
      headers: getHeaders(account),
   })

   return data
}