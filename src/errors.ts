export class HTTPError extends Error {
  public statusCode: number;
  public body: string;

  constructor(status: number, body: string) {
    super(body);
    this.body = body;
    this.statusCode = status;
  }
}
