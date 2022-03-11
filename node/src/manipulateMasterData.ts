export async function manipulateMasterData(context: Context, next: () => Promise<any>) {
   // const data = await context.clients.manipulateMasterData;
   context.response.status = 200;
   context.response.body = { message: 'Response Here' };

   next();
};