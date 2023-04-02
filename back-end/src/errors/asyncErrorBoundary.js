// middleware function that catches and handles errors in async functions.
// handles any errors that occur in the delegate function and sends an error response back to the client.
// The defaultStatus argument is used to set the status code of the error response.


function asyncErrorBoundary(delegate, defaultStatus) {
    return (request, response, next) => {
Promise.resolve()
    .then(() => delegate(request, response, next))
    .catch((error = {}) => {
        const { status = defaultStatus, message = error } = error;
        next({
            status,
            message,
            });
        });
    };
}

module.exports = asyncErrorBoundary;