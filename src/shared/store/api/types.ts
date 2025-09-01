export interface ApiResponseError {
  message: string;
}

// Guys just didn't add any statusCode to error response
// With statusCode I'd create TS Guard...
// but we have what we have.
export type ApiResponse<TSuccess = Record<string, any>> = TSuccess & ApiResponseError;
