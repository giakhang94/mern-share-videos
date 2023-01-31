import CustomErrorAPI from "./CustomErrorAPI.js";
class BadRequestError extends CustomErrorAPI {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}
export default BadRequestError;
