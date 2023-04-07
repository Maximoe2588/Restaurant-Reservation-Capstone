//function that takes in an arbitrary number of property names as arguments

function ensurePropertiesExists(...properties) {
    return function (req, res, next) {
        const { data = {} } = req.body;
 // try to check that each required property exists in the data object
    try {
// loop through each required property and check if it's missing from the data object
        properties.forEach((property) => {
            if (!data[property]) {
            const error = new Error(`A '${property}' property is required.`);
            error.status = 400;
            throw error;
        }
    });
        next();
        } catch (error) {
        next(error);
        }
    };
}

module.exports = ensurePropertiesExists;