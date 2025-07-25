import mongoose from "mongoose";

function errorManipulate (err, req, res, next) {
  if (err instanceof mongoose.Error.CastError) {
    res.status(400).send({message: "one or more errors has occurred."});
  } else if (err instanceof mongoose.Error.ValidationError) {
    const errorMsg = Object.values(err.errors)
        .map(err => err.message)
        .join("; ");
    res.status(400).send({message: errorMsg})
  }  else {
    res.status(500).send({message: "Internal server error"})
  }
}

export default errorManipulate;