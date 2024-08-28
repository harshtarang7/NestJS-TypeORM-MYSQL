export class SuccessResponse<T> {
  constructor(
    public data: T,
    public message: string = 'Data fetched successfully.',
    public error_status: boolean = false,
  ) {}
}
