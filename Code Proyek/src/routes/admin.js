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

  const middleware = require('../middlleware/middlleware');

  router.post("/menu_set",menuSet);
  router.post("/diet",diet);
  router.delete("/menu_set/:id_menu_set", [middleware],deleteMenu);
  router.delete("/diet/:id_diet", [middleware],deleteDiet);
  router.get("/menu", [middleware],getMenu);
  router.get("/menu_set", [middleware],getSet);
  router.put("/menu_set/:id_menu_set", [middleware],updateSet);
  router.put("/diet/:id_diet", [middleware],updateDiet);

  module.exports = router;