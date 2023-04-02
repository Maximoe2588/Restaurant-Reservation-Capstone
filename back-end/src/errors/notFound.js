/**
 * Express API "Not found" handler.
 */

//handles cases where req is made to route that doesn't exist

function notFound(req, res, next) {
  next({ status: 404, message: `Path not found: ${req.originalUrl}` });
}

module.exports = notFound;
