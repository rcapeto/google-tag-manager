export interface ResponseMasterData<T> {
   error: boolean
   status: number
   errorMessage: string
   data: T | undefined | null
}