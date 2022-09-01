// for schema validation

export function validateSchema(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      throw {
        code: "UnprocessableEntity",
        massage: error.details.map((detail) =>
          detail.message.replace(/[\\"()]/g, "")
        ),
      };
    }

    next();
  };
}
