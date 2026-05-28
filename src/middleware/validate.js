const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(422).json({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: error.message,
          details: error.details,
        },
      });
    }
    req.body = value;
    next();
  };
};

//instead of schema here add like
// const createProjectSchema = Joi.object({ name: Joi.string().required() });
// app.post('/api/projects', validate(createProjectSchema), createProjectHandler);
