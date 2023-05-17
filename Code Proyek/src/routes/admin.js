const express = require("express");
const router = express.Router();
const {
    menuSet,
    diet,
    deleteMenu,
    deleteDiet,
    getMenu,
    getSet,
    updateDiet,
    updateSet,
  } = require("../controllers/admin");

  router.post("/menu_set",menuSet);
  router.post("/diet",diet);
  router.delete("/menu_set/:id_menu_set",deleteMenu);
  router.delete("/diet/:id_diet",deleteDiet);
  router.get("/menu",getMenu);
  router.get("/menu_set",getSet);
  router.put("/menu_set/:id_menu_set",updateSet);
  router.put("/diet/:id_diet",updateDiet);

  module.exports = router;