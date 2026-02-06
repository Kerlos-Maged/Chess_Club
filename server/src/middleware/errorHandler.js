export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'ZodError') {
    return res.status(400).json({
      error: 'Validation error',
      details: err.errors.map((e) => ({
        path: e.path.join('.'),
        message: e.message,
      })),
    });
  }

  if (err.name === 'MongoError' || err.code === 11000) {
    return res.status(400).json({
      error: 'Duplicate entry',
      message: 'This entry already exists',
    });
  }

  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
};
