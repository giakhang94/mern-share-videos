import CustomErrorAPI from "./CustomErrorAPI.js";
class UnauthenticatedError extends CustomErrorAPI {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

export default UnauthenticatedError;
