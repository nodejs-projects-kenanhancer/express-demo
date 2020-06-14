const isNumeric = (value) => {
    if (value.match(/^-{0,1}\d+$/)) {
        //valid integer (positive or negative)
        return true;
    } else if (value.match(/^\d+\.\d+$/)) {
        //valid float
        return true;
    } else {
        //not valid number
        return false;
    }
};

const createError = ({ code, statusCode, message }) => {
    const e = new Error(message);
    Error.captureStackTrace(e);
    e.statusCode = statusCode;
    e.code = code;
    return e;
};

const catchAsync = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(err => next(err));
    };
};

const tryCatch = function (fn) {
    return function () {
        try {
            const result = fn.apply(this, arguments);

            if (result instanceof Promise) {
                return result
            }
        } catch (err) {
            // customErrorHandler(err);
            return err
        }
    }
}


module.exports = {
    isNumeric,
    createError,
    catchAsync,
    tryCatch
};