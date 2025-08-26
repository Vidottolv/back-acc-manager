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

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});
}

export default routes