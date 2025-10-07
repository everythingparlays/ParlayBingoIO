export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500
}

/**************** Generic API Responses (Building Blocks) *******************/
export interface BaseApiResponse {
  success: boolean;
}

export interface ApiSuccessResponse<T = any> extends BaseApiResponse {
  success: true;
  data?: T;
  message?: string;
}

export interface ApiErrorResponse extends BaseApiResponse {
  success: false;
  errors: Record<string, string[]> | string[];
  message?: string;
  data?: any;
}

export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse;


/************* CRUD Responses (use or extend these when possible) *******************/
//Fields Update API Response
export interface FieldUpdateSuccessResponse<T = any> extends ApiSuccessResponse<T> {
  updatedFields: string[];
}

export interface FieldUpdateErrorResponse extends ApiErrorResponse {
  errors: Record<string, string[]>; // Keyed by field names with validation errors for each respective field
}

export type FieldUpdateApiResponse<T = any> = FieldUpdateSuccessResponse<T> | ApiErrorResponse;

export interface ValidationResponse extends BaseApiResponse {
  isValid: boolean;
  errors?: string[];
}
/******************All API Response Types ******************/

//Add new API response types to this to ensure all responses are compatible with the buildResponse function
export type AllApiResponseTypes = ApiResponse<any> | FieldUpdateApiResponse<any>;


/*************** Lambda Function API Build Response *************/
export interface APIGatewayProxyResultCopy {
  statusCode: HttpStatus;
  headers?:
      | {
          [header: string]: boolean | number | string;
      }
      | undefined;
  multiValueHeaders?:
      | {
          [header: string]: Array<boolean | number | string>;
      }
      | undefined;
  body: string;
  isBase64Encoded?: boolean | undefined;
}

// buildResponse function to create a standardized API response for lambda functions
export function buildResponse<Tbody = AllApiResponseTypes>(statusCode: number, body: Tbody): APIGatewayProxyResultCopy {
    return {
      statusCode: statusCode,
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
      },
      body: JSON.stringify(body)
    }
}