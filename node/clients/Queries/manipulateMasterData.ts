import { InstanceOptions, IOContext, ExternalClient } from "@vtex/api";

export class ManipulateMasterData extends ExternalClient {
    public constructor(ctx: IOContext, options?: InstanceOptions) {
        super("http://licensemanager.vtex.com.br/api/pvt/accounts", ctx, {
            ...options,
            headers: {
               // 'X-VTEX-API-AppKey': 'vtexappkey-brmotorolanew-TSKDFR',
               // 'X-VTEX-API-AppToken': 'RIENUZAYFONEVTFVBCIPNNQHIGQBWWYXNCXSTCRKOKVAYPBBPECSDLIERXEOJZBIPQQSWNCYLXBCSQITFOMSUFTCUTAWXDBPJMKIZIFCBEHFKFMBOLJUNJOJXOYDMGAI',
                ...(options && options.headers),
                ...(ctx.adminUserAuthToken
                    ? { VtexIdclientAutCookie: ctx.adminUserAuthToken }
                    : null)
            },
        });
    }

   public async createMasterData() {
      // const url = `https://brmotorolanew.vtexcommercestable.com.br/api/catalog/pvt/stockkeepingunit/${skuId}/complement/5`;
      // const { data } = await this.http.getRaw(url, {
      //    headers: { 
      //       'Content-Type': 'application/json',
      //       'Accept': 'application/json',
      //       'X-VTEX-API-AppKey': `vtexappkey-${this.context.account}-TSKDFR`,
      //       'X-VTEX-API-AppToken': 'RIENUZAYFONEVTFVBCIPNNQHIGQBWWYXNCXSTCRKOKVAYPBBPECSDLIERXEOJZBIPQQSWNCYLXBCSQITFOMSUFTCUTAWXDBPJMKIZIFCBEHFKFMBOLJUNJOJXOYDMGAI'
      //    }
      // });
      // return data;
      console.log('teste')
   }
}