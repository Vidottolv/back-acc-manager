import express from "express";
import product from "./productRoutes.js"
import sales from "./salesRoutes.js";
import login from "./loginRoutes.js";
import user from "./userRoutes.js";
import preference from "./preferenceRoutes.js";
import customer from "./customerRoutes.js";

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send({titulo: "Curso de node"})
  })

  app.use(
    express.json(),
    login,
    product,
    sales,
    user,
    preference,
    customer
  )
}

export default routes