const express = require("express");
const router = express.Router();
const {
    menuSet,
    diet,
    deleteMenu,
    deleteDiet,
    getMenu,
    getSet,
    updateSet,
    updateDiet
  } = require("../controllers/admin");

  router.post("/menu_set",menuSet);
  router.post("/diet",diet);
  router.delete("/menu_set/:id_menu_set",deleteMenu);
  router.delete("/diet/:id_diet",deleteDiet);
  router.get("/menu",getMenu);
  router.get("/menu_set",getSet);
  router.update("/menu_set/:id_menu_set",updateSet);
  router.update("/diet/:id_diet",updateDiet);

  module.exports = router;