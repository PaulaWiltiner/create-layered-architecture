// for error handling

export default async function errorHandler(error, req, res, next) {
  if (error.code === "NotFound") {
    return res.status(404).send(error.message);
  }
  if (error.code === "Unathorized") {
    return res.status(401).send(error.message);
  }
  if (error.code === "Conflict") {
    return res.status(409).send(error.message);
  }
  if (error.code === "UnprocessableEntity") {
    return res.status(422).send(error.message);
  }
  console.log(error);
  res.sendStatus(500);
}

// 401 - Unathorized
// 404 - Not Found
// 409 - Conflict
// 422 - Unprocessable Entity - erros semânicos
