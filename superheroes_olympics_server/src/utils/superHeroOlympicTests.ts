class Skills {
  agility: number;
  strength: number;
  weight: number;
  endurance: number;
  charisma: number;

  constructor(
    agility: number,
    strength: number,
    weight: number,
    endurance: number,
    charisma: number
  ) {
    this.agility = agility;
    this.strength = strength;
    this.weight = weight;
    this.endurance = endurance;
    this.charisma = charisma;
  }

  getAgility(): number {
    return this.agility;
  }
  getStrength(): number {
    return this.strength;
  }
  getWeight(): number {
    return this.weight;
  }
  getEndurance(): number {
    return this.endurance;
  }
  getCharisma(): number {
    return this.charisma;
  }
}

class SHero {
  name: string;
  public skills: Skills;
  score: number;
  avatar: string;
  _id: string;

  constructor(
    _id: string,
    name: string,
    skills: Skills,
    score: number,
    avatar: string
  ) {
    this.name = name;
    this.skills = skills;
    this.score = score;
    this._id = _id;
    this.avatar = avatar;
  }

  getName(): string {
    return this.name;
  }
  getScore(): number {
    return this.score;
  }

  getSkills(): Skills {
    return this.skills;
  }

  setScore(score: number) {
    this.score = score;
  }
}

export const superHeroOlympics = (selectedSuperHeroes: any[]): any[] => {
  class ScoredSHero {
    name: string;
    score: number;

    constructor(name: string, score: number) {
      this.name = name;
      this.score = score;
    }
  }

  class TestsResults {
    climbSkyScraper: ScoredSHero[];
    tellAJoke: ScoredSHero[];
    shotTheVillain: ScoredSHero[];
    run200km: ScoredSHero[];
    rescueCats: ScoredSHero[];

    constructor() {
      this.climbSkyScraper = [];
      this.tellAJoke = [];
      this.shotTheVillain = [];
      this.run200km = [];
      this.rescueCats = [];
    }

    setClimbSkyScraperResults(climbSkyScraper: ScoredSHero[]) {
      this.climbSkyScraper = climbSkyScraper;
    }
    setTellAJokeResults(tellAJoke: ScoredSHero[]) {
      this.tellAJoke = tellAJoke;
    }
    setShotTheVillainResults(shotTheVillain: ScoredSHero[]) {
      this.shotTheVillain = shotTheVillain;
    }
    setRun200kmResults(run200km: ScoredSHero[]) {
      this.run200km = run200km;
    }
    setRescueCatsResults(rescueCats: ScoredSHero[]) {
      this.rescueCats = rescueCats;
    }

    getClimbSkyScraperResults(): ScoredSHero[] {
      return this.climbSkyScraper;
    }
    getTellAJokeResults(): ScoredSHero[] {
      return this.tellAJoke;
    }
    getShotTheVillainResults(): ScoredSHero[] {
      return this.shotTheVillain;
    }
    getRun200KmResults(): ScoredSHero[] {
      return this.run200km;
    }
    getRescueCatsResults(): ScoredSHero[] {
      return this.rescueCats;
    }

    getFirstInCategory(category: ScoredSHero[]): string {
      return category[0].name;
    }

    hasWonOlympicCategory(name: string, category: ScoredSHero[]): Boolean {
      return this.getFirstInCategory(category) === name;
    }
  }

  const testResults = new TestsResults();

  const sortCategoryByScore = (category: ScoredSHero[]) => {
    return category.sort((a: ScoredSHero, b: ScoredSHero) => b.score - a.score);
  };

  const climbSkyScraper = function (superHeroes: SHero[]) {
    const climbSkyScraperResults = superHeroes.map((superHero) => {
      const sHeroSkills = superHero.getSkills();
      const climbSkyScraperScore =
        sHeroSkills.getStrength() * 4 - sHeroSkills.getWeight() * 2;
      console.log(
        `Climb SkyScraper score for ${superHero.name} is ${climbSkyScraperScore}`
      );
      superHero.setScore(superHero.getScore() + climbSkyScraperScore);
      return new ScoredSHero(superHero.name, climbSkyScraperScore);
    });
    testResults.setClimbSkyScraperResults(
      sortCategoryByScore(climbSkyScraperResults)
    );
  };
  // FIX check
  const tellAJoke = function (superHeroes: SHero[]) {
    const tellAJokeResults = superHeroes.map((superHero) => {
      const sHeroSkills = superHero.getSkills();
      const tellAJokeScore =
        Math.pow(sHeroSkills.getStrength(), 2) -
        superHeroes
          .filter((sHero) => sHero._id !== superHero._id)
          .map((filteredSHero) => filteredSHero.skills.charisma)
          .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

      superHero.setScore(superHero.getScore() + tellAJokeScore);
      console.log(
        `Telling a joke score for ${superHero.name} is ${tellAJokeScore}`
      );
      return new ScoredSHero(superHero.name, tellAJokeScore);
    });
    testResults.setTellAJokeResults(sortCategoryByScore(tellAJokeResults));
  };

  const shotTheVillain = function (superHeroes: SHero[]) {
    const shotTheVillainResults = superHeroes.map((superHero) => {
      const sHeroSkills = superHero.getSkills();
      const currentScores = superHeroes.map((sHero) => sHero.getScore());
      const isLastInCurrentRanking =
        superHero.score === Math.min(...currentScores);
      const shotTheVillainScore =
        sHeroSkills.getStrength() +
        sHeroSkills.getWeight() +
        (isLastInCurrentRanking ? 5 : 0);

      superHero.setScore(superHero.getScore() + shotTheVillainScore);
      console.log(
        `Shot the villain score for ${superHero.name} is ${shotTheVillainScore}`
      );
      return new ScoredSHero(superHero.name, shotTheVillainScore);
    });
    testResults.setShotTheVillainResults(
      sortCategoryByScore(shotTheVillainResults)
    );
  };
  const run200km = function (superHeroes: SHero[]) {
    const run200kmResults = superHeroes.map((superHero) => {
      const sHeroSkills = superHero.getSkills();
      const isFirstInPreviousTest =
        testResults.getShotTheVillainResults()[0].name === superHero.getName();
      const run200kmScore =
        sHeroSkills.getAgility() * 4 +
        sHeroSkills.getEndurance() * 2 +
        (isFirstInPreviousTest ? 10 : -1);

      superHero.setScore(superHero.getScore() + run200kmScore);
      console.log(`Run 200 km score for ${superHero.name} is ${run200kmScore}`);
      return new ScoredSHero(superHero.name, run200kmScore);
    });
    testResults.setRun200kmResults(sortCategoryByScore(run200kmResults));
  };
  const rescueCats = function (superHeroes: SHero[]) {
    const rescueCatsResults = superHeroes.map((superHero) => {
      const sHeroSkills = superHero.getSkills();
      const hasWinTwoOlympicTests =
        [
          testResults.hasWonOlympicCategory(
            superHero.getName(),
            testResults.getClimbSkyScraperResults()
          ),
          testResults.hasWonOlympicCategory(
            superHero.getName(),
            testResults.getTellAJokeResults()
          ),
          testResults.hasWonOlympicCategory(
            superHero.getName(),
            testResults.getShotTheVillainResults()
          ),
          testResults.hasWonOlympicCategory(
            superHero.getName(),
            testResults.getRun200KmResults()
          ),
        ].filter((result) => result).length >= 2;
      const rescueCatsScore =
        sHeroSkills.getAgility() * 2 + (hasWinTwoOlympicTests ? 5 : 0);

      superHero.setScore(superHero.getScore() + rescueCatsScore);
      console.log(
        `Rescue cats score for ${superHero.name} is ${rescueCatsScore}`
      );
      return new ScoredSHero(superHero.name, rescueCatsScore);
    });

    testResults.setRescueCatsResults(sortCategoryByScore(rescueCatsResults));
  };

  selectedSuperHeroes = selectedSuperHeroes.map((selectedSuperHero) => {
    const sHeroSkills = selectedSuperHero.skills;
    const selectedSuperHeroSkills = new Skills(
      sHeroSkills.agility,
      sHeroSkills.strength,
      sHeroSkills.weight,
      sHeroSkills.endurance,
      sHeroSkills.charisma
    );
    return new SHero(
      selectedSuperHero._id,
      selectedSuperHero.name,
      selectedSuperHeroSkills,
      selectedSuperHero.score,
      selectedSuperHero.avatar
    );
  });
  climbSkyScraper(selectedSuperHeroes);
  tellAJoke(selectedSuperHeroes);
  shotTheVillain(selectedSuperHeroes);
  run200km(selectedSuperHeroes);
  rescueCats(selectedSuperHeroes);
  //Order by score
  return selectedSuperHeroes.sort((heroA, heroB) => heroB.score - heroA.score);
};
