import express, { Router, Request, Response } from "express";
import * as superHeroesMiddleware from "../middlewares/superHeroes";
import * as superHeroesController from "../controllers/superHeroes";

const router: Router = express.Router();

router.route("/").get(superHeroesController.getAllSuperHeroes);

router
  .route("/:superHeroId")
  .get(superHeroesMiddleware.isValidId, superHeroesController.getSuperHero)
  .put(superHeroesMiddleware.isValidId, superHeroesController.updateSuperHero)
  .delete(
    superHeroesMiddleware.isValidId,
    superHeroesController.deleteSuperHero
  );

router.route("/create").post(superHeroesController.createSuperHero);

router.route("/pentathlon").post(superHeroesController.superHeroesPentathlon);

export default router;
