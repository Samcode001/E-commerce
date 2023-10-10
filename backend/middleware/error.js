const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //Wrong mongoDb id error
  if (err.name === "CastError") {
    const message = `Resources not sound with this id.. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //Duplicate Key Error
  if (err.code === 11000) {
    const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  //worng jwt Error
  if (err.name === "JsonWebTokenError") {
    const message = `Your Url is Invalid Please try Again later`;
    err = new ErrorHandler(message, 400);
  }

  //jwt Expired
  if(err.name==="TokenExpiredError"){
    const message=`Your Token is Expired Please try again later`
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success:false,
    message:err.message
  })
};
