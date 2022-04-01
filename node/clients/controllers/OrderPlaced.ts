import { InstanceOptions, IOContext, ExternalClient } from "@vtex/api"
import { Order } from "../../types/orders"

export class OrderPlacedController extends ExternalClient {
   private masterDataName = 'orderplacedv2'
   private schemaName = 'orders'

   private headers = {
      "Proxy-Authorization": this.context.authToken,
      "Content-Type": "application/json",
      'X-VTEX-Use-Https': "true",
      'X-VTEX-API-AppKey': `vtexappkey-${this.context.account}-TSKDFR`,
      'X-VTEX-API-AppToken': 'RIENUZAYFONEVTFVBCIPNNQHIGQBWWYXNCXSTCRKOKVAYPBBPECSDLIERXEOJZBIPQQSWNCYLXBCSQITFOMSUFTCUTAWXDBPJMKIZIFCBEHFKFMBOLJUNJOJXOYDMGAI'
   }

   private base_url = {
      getSchema: `http://${this.context.account}.vtexcommercestable.com.br/api/dataentities/${this.masterDataName}/schemas`,
      indexSchema: `http://${this.context.account}.vtexcommercestable.com.br/api/dataentities/${this.masterDataName}/indices`,
      putSchema: `http://${this.context.account}.vtexcommercestable.com.br/api/dataentities/${this.masterDataName}/schemas/${this.schemaName}`,
      put: `http://${this.context.account}.vtexcommercestable.com.br/api/dataentities/${this.masterDataName}/documents?_schema=${this.schemaName}`,
      get: (orderId: string) => `http://${this.context.account}.vtexcommercestable.com.br/api/dataentities/${this.masterDataName}/search?_fields=orderId&_where=(orderId=${orderId})&_schema=${this.schemaName}&_v=${Date.now()}`,
   }

	public constructor(ctx: IOContext, options?: InstanceOptions) {
		super("http://licensemanager.vtex.com.br/api/pvt/accounts", ctx, {
			...options,
			headers: {
				...(options && options.headers),
				...(ctx.adminUserAuthToken
					? { VtexIdclientAutCookie: ctx.adminUserAuthToken }
					: null),
			},
		})
	}

   public async hasOrder(orderId: string): Promise<boolean> {
      await this.manipulateSchema()

      const order = await this.getOrder(orderId)
      
      if(order && Array.isArray(order)) {
         const hasOrder = order.length > 0

         if(!hasOrder) {
            await this.putOrder(orderId)
         }

         return hasOrder
      } else {
         return false
      }
   }

   private async putOrder(orderId: string) {
      await this.http.putRaw(this.base_url.put, { orderId: orderId }, { 
         headers: this.headers
      })
   }

   private async getOrder(orderId: string): Promise<Order[]> {
      const { data } = await this.http.getRaw<Order[]>(this.base_url.get(orderId), { 
         headers: this.headers

      })
      return data
   }

   private async putSchema() {
      await this.http.putRaw(this.base_url.putSchema, { 
         properties: { orderId: {type: 'string' } }
      }, {
         headers: this.headers
      })
   }

   private async indexSchema() {
      await this.http.putRaw(this.base_url.indexSchema, {
         name: 'orders', multiple: false, fields: 'orderId'
      }, { 
         headers: this.headers
      })
   }

   private async manipulateSchema() {
      const { data } = await this.http.getRaw<{ name: string }[]>(this.base_url.getSchema, { 
         headers: this.headers
      })

      const hasSchema = data.find(item => item.name == this.schemaName)

      if(!hasSchema) {
         await this.putSchema()
         await this.indexSchema()
      }
   }
}