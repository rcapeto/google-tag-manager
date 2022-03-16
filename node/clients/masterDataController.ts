import { InstanceOptions, IOContext, ExternalClient } from "@vtex/api"

// import { errorsMessage, masterDataName, status } from '../config'

export class MasterDataController extends ExternalClient {
    
   private baseUrl: string = `https://${this.context.account}.myvtex.com/api/oms/pvt/orders`
    public constructor(ctx: IOContext, options?: InstanceOptions) {
        super("http://licensemanager.vtex.com.br/api/pvt/accounts", ctx, {
            ...options,
            headers: {
                ...(options && options.headers),
                ...(ctx.adminUserAuthToken
                    ? { VtexIdclientAutCookie: ctx.adminUserAuthToken }
                    : null)
            },
        })
    }

    public async getDoc(orderId: string) {
        const url = `${this.baseUrl}/${orderId}`

        console.log('URL', url)

        try { 
            const data = await this.http.get(url, { 
                headers: {
                    "X-VTEX-Use-Https": true,
                    "Proxy-Authorization": this.context.authToken,
                    'Content-Type': 'application/json',
                    'X-VTEX-API-AppKey': `vtexappkey-${this.context.account}-TSKDFR`,
                    'X-VTEX-API-AppToken': 'RIENUZAYFONEVTFVBCIPNNQHIGQBWWYXNCXSTCRKOKVAYPBBPECSDLIERXEOJZBIPQQSWNCYLXBCSQITFOMSUFTCUTAWXDBPJMKIZIFCBEHFKFMBOLJUNJOJXOYDMGAI'
                }
            })

            console.log(data, 'data')

        } catch(err) {
            console.log(err)
            return err
        }
    }
}