import {ApiResponse} from "../../common/api.response.model";

export class ProjectApiResponse extends ApiResponse {

  constructor(private apiName: string,
              success: boolean,
              message: string,
              data: any,
              code: number) {
    super(success, message, data, code);
  }
}
