export interface IDocumentMDError {
   message: string
   created_at: string 
   orderId: string
}

export class MasterDataErrorController {
   constructor(private acronym: string) {}

   private headers = {
      Accept: 'application/vnd.vtex.ds.v10+json',
      'Content-Type': 'application/json',
   }

   private base_url = `/api/dataentities/${this.acronym}/documents`

   async createDocument({ created_at, message, orderId }: IDocumentMDError) {
      const data = { created_at, message, orderId }
      const options: RequestInit = { 
         headers: this.headers,
         method: 'POST',
         body: JSON.stringify(data),
      }

      await fetch(this.base_url, options)
   }
}