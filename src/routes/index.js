import express from "express";
import product from "./productRoutes.js"
import sales from "./salesRoutes.js";

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send({titulo: "Curso de node"})
  })

  app.use(
    express.json(),
    product,
    sales
  )
}

export default routes