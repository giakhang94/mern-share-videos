import CustomAPIError from "./CustomErrorAPI.js";
class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}
// {"error":{"errors":{"name":{"name":"ValidatorError","message":"Path `name` (`111111111111111111111111111`) is longer than the maximum allowed length (20).","properties":{"message":"Path `name` (`111111111111111111111111111`) is longer than the maximum allowed length (20).","type":"maxlength","maxlength":20,"path":"name","value":"111111111111111111111111111"},"kind":"maxlength","path":"name","value":"111111111111111111111111111"},"password":{"name":"ValidatorError","message":"Path `password` (`1`) is shorter than the minimum allowed length (6).","properties":{"message":"Path `password` (`1`) is shorter than the minimum allowed length (6).","type":"minlength","minlength":6,"path":"password","value":"1"},"kind":"minlength","path":"password","value":"1"}},"_message":"User validation failed","name":"ValidationError","message":"User validation failed: name: Path `name` (`111111111111111111111111111`) is longer than the maximum allowed length (20)., password: Path `password` (`1`) is shorter than the minimum allowed length (6)."},"msg":"Path `name` (`111111111111111111111111111`) is longer than the maximum allowed length (20).,Path `password` (`1`) is shorter than the minimum allowed length (6)."}
export default NotFoundError;
