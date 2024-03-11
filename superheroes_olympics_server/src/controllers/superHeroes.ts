import { Request, Response } from "express";
import { SuperHeroModel } from "../dbModels/superHero";
import * as superHeroOlympicTests from "../utils/superHeroOlympicTests";

// Single superheroes CRUD
export const createSuperHero = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let superHeroAttributes = req.body;
    const newsuperHero = new SuperHeroModel(superHeroAttributes);
    const createdsuperHero = await newsuperHero.save();
    console.error(`Created superhero ${newsuperHero.name} `);
    res.status(201).json(createdsuperHero);
  } catch (error) {
    console.error("Error creating superhero:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getSuperHero = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const superHeroId = req.params.superHeroId;
    const foundSuperHero = await SuperHeroModel.findById(superHeroId);
    res.status(201).json(foundSuperHero);
  } catch (error) {
    console.error("Error finding superhero:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateSuperHero = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const superHeroToUpdateId = req.params.superHeroId;
    const superHeroAttributesUpdates = req.body;
    const updatedSuperHero = await SuperHeroModel.findOneAndUpdate(
      { _id: superHeroToUpdateId },
      superHeroAttributesUpdates
    );
    res.status(201).json(updatedSuperHero);
  } catch (error) {
    console.error("Error updating superhero:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteSuperHero = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const superHeroToDeleteId = req.params.superHeroId;
    const deletedSuperHero = await SuperHeroModel.deleteOne({
      _id: superHeroToDeleteId,
    });
    console.log(`SuperHero succesfully deleted`);
    res.status(201).json(deletedSuperHero);
  } catch (error) {
    console.error("Error creating superHero:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Multiple superheroes CRUD

export const getAllSuperHeroes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const foundSuperHeroes = await SuperHeroModel.find();
    res.status(201).json(foundSuperHeroes);
  } catch (error) {
    console.error("Error creating superHero:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const superHeroesPentathlon = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const superHeroesSelectedIds = req.body;

    const superHeroesSelected = await SuperHeroModel.find({
      _id: { $in: superHeroesSelectedIds },
    });

    console.log(
      "SuperHeroes selected for the pentathlon :",
      superHeroesSelected.map((superHero) => superHero.name)
    );
    const result = superHeroOlympicTests.superHeroOlympics(superHeroesSelected);

    res.status(201).json(result);
  } catch (error) {
    console.error("Error during superHeroes pentathlon:", error);
    res.status(500).json({ error: "Server error" });
  }
};
