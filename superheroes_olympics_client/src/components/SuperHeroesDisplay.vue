<template>
  <v-app-bar :elevation="2" color="primary">
    <v-app-bar-title> {{ headerMsg }}</v-app-bar-title>
  </v-app-bar>
  <div class="superheroes-layout">
    <div class="superheroes-crud-bar">
      <v-list
        class="superheroes-v-list justify-space-between"
        v-if="superHeroes.length !== 0"
      >
        <v-list-item
          @mouseover="isHovering = index"
          @mouseleave="isHovering = -1"
          v-for="(hero, index) in superHeroes"
          :key="hero._id"
        >
          <v-list-item-content>
            <div class="hero-left-panel-list">
              <div class="checkbox-label-item">
                <v-checkbox
                  v-model="hero.selected"
                  class="d-flex justify-center"
                ></v-checkbox>
                <v-list-item-title class="align-center">
                  {{ hero.name }}
                </v-list-item-title>
              </div>

              <div v-if="isHovering === index">
                <v-btn
                  @click="handleHeroAction(index, ACTION_TYPES.EDIT)"
                  variant="plain"
                  icon="$edit"
                ></v-btn>
                <v-btn
                  @click="handleHeroAction(index, ACTION_TYPES.DELETE)"
                  variant="plain"
                  icon="$delete"
                >
                </v-btn>
              </div>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <div class="action-buttons justify-center">
        <v-btn color="primary" @click="handleHeroAction(-1, ACTION_TYPES.ADD)"
          >Add hero<v-icon icon="mdi-plus"></v-icon
        ></v-btn>
        <v-btn
          color="primary"
          :disabled="
            this.superHeroes.filter((shero) => shero.selected).length !== 3
          "
          @click="simulateOlympics()"
          >Start olympics!<v-icon icon="mdi-play"></v-icon
        ></v-btn>
      </div>
    </div>
    <v-divider vertical></v-divider>
    <SuperHeroesRanking :superHeroes="superHeroesRanking"></SuperHeroesRanking>
  </div>
  <v-snackbar v-model="snackbar" :timeout="3000" multi-line>
    Pentathlon finished! Winner: {{ superHeroesRanking[0].name }}

    <template v-slot:actions>
      <v-btn color="red" variant="text" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>

  <SuperHeroEditDialog
    :superhero="heroSelected"
    @hero-updated="onHeroUpdated"
  ></SuperHeroEditDialog>
</template>

<script>
import SuperHeroEditDialog from "./dialogs/SuperHeroEditDialog.vue";
import SuperHeroesRanking from "./SuperHeroesRanking.vue";
import { ref } from "vue";
import axios from "axios";
import { ACTION_TYPES, defaultSuperHero } from "../models/models.ts";
let heroSelected = ref({});
export default {
  name: "SuperHeroesDisplay",
  components: {
    SuperHeroEditDialog,
    SuperHeroesRanking,
  },
  methods: {
    async handleHeroAction(heroIndex, action) {
      heroSelected.value = {
        hero: heroIndex != -1 ? this.superHeroes[heroIndex] : defaultSuperHero,
        action: action,
      };
      if (heroSelected.value.action === ACTION_TYPES.DELETE) {
        await this.deleteSuperHero(heroSelected.value.hero);
        await this.fetchSuperheroes();
      }
    },
    async simulateOlympics() {
      console.log("Starting olympics!");
      this.superHeroesRanking = [];
      try {
        const result = await axios.post(
          `http://localhost:3000/api/superheroes/pentathlon`,
          this.superHeroes
            .filter((shero) => shero.selected)
            .map((selectedshero) => selectedshero._id)
        );
        this.snackbar = true;
        this.superHeroes.forEach((shero) => (shero.selected = false));
        this.superHeroesRanking = result.data;
      } catch (error) {
        console.error(`Error during pentathlon simulation`, error);
      }
    },
    async createSuperHero(heroToCreate) {
      try {
        await axios.post(
          `http://localhost:3000/api/superheroes/create`,
          heroToCreate
        );
      } catch (error) {
        console.error(`Error creating superhero ${heroToCreate.name}`, error);
      }
    },
    async fetchSuperheroes() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/superheroes"
        );

        const superHeroesResult = response.data;
        superHeroesResult.forEach((sHero) => (sHero.selected = false));
        this.superHeroes = superHeroesResult;
      } catch (error) {
        console.error("Error fetching superheroes:", error);
      }
    },
    async updateSuperHero(heroToUpdate) {
      try {
        await axios.put(
          `http://localhost:3000/api/superheroes/${heroToUpdate._id}`,
          heroToUpdate
        );
      } catch (error) {
        console.error(`Error updating superhero ${heroToUpdate.name}: `, error);
      }
    },
    async deleteSuperHero(heroToDelete) {
      try {
        await axios.delete(
          `http://localhost:3000/api/superheroes/${heroToDelete._id}`
        );
      } catch (error) {
        console.error(`Error deleting superhero ${heroToDelete.name}: `, error);
      }
    },
    async onHeroUpdated(heroToUpdate) {
      if (heroSelected.value.action === ACTION_TYPES.ADD) {
        await this.createSuperHero(heroToUpdate);
      } else {
        await this.updateSuperHero(heroToUpdate);
      }
      await this.fetchSuperheroes();
    },
  },
  props: {
    headerMsg: String,
  },
  data: function () {
    return {
      superHeroes: [],
      superHeroesRanking: [],
      isHovering: false,
      heroSelected,
      ACTION_TYPES,
      snackbar: false,
    };
  },
  mounted() {
    this.fetchSuperheroes();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
hero-avatar {
  max-width: 128px;
  min-width: 128px;
}
hero-details {
  display: flex;
  align-items: center;
}

.hero-left-panel-list {
  justify-content: space-between;
  display: flex;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  width: 14vw;

  .v-btn {
    width: 9vw;
  }
}

.checkbox-label-item {
  display: flex;
  align-items: center;
  max-width: 11vw;
}

.hero-skills {
  display: flex;
  flex-direction: column;
  margin-left: 5px;
}

.superheroes-layout {
  display: flex;
  flex-direction: row;
}
.superheroes-crud-bar {
  width: 20%;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
