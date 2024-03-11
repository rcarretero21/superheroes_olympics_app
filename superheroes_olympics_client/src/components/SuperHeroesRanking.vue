<template>
  <div class="text-h4 pentathlon-label" v-if="superHeroes.length === 0">
    Select 3 Superheroes for pentathlon!
  </div>
  <div class="superheroes-ranking" v-if="superHeroes.length !== 0">
    <h1 class="text-h4">Pentathlon ranking:</h1>

    <v-list class="superheroes-v-list">
      <v-list-item
        class="hero-details"
        v-for="(hero, index) in superHeroes"
        :key="hero._id"
      >
        <v-list-item-content>
          <div class="ranking-hero-details">
            <div
              class="ranking-position-circle"
              :style="{ 'background-color': this.rankingColors[index] }"
            >
              <div class="ranking-position-text">
                <div class="text-h5">{{ index + 1 }}º</div>
              </div>
            </div>
            <v-list-item-avatar class="superhero-avatar">
              <v-img
                :width="128"
                :heigth="128"
                aspect-ratio="16/9"
                cover
                :src="hero.avatar"
              ></v-img
            ></v-list-item-avatar>
            <div>
              <v-list-item-title>
                {{ hero.name }}
              </v-list-item-title>
              <div class="text-h10">Score: {{ hero.score }}</div>
            </div>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  props: {
    superHeroes: [], // Pass the superhero object as a prop
  },
  superHeroes: {
    immediate: true,
    handler(newVal) {
      // Update superHeroToEdit when prop changes
      console.log(newVal);
    },
  },
  data: function () {
    return {
      rankingColors: ["#FFD700", "#C0C0C0", "#CD7F32"],
    };
  },
};
</script>

<style scoped>
.superheroes-ranking {
  display: flex;
  flex-direction: column;
  padding: 20px;
}
.superhero-title {
  display: flex;
  flex-direction: row;
}
.superheroes-v-list {
  max-height: 87vh;
}
.superhero-avatar {
  margin-left: 10px;
  margin-right: 10px;
}
.pentathlon-label {
  padding: 10px;
}
.ranking-position-circle {
  display: inline-block;
  line-height: 0px;
  border-radius: 50%;
  font-size: 32px;
  background-color: green;
  color: white;
  margin-right: 10px;
  max-height: 40px;
}
.ranking-position-text {
  padding: 5px 10px 5px;
  color: black;
}

.ranking-hero-details {
  display: flex;
  margin-bottom: 20px;
  align-items: center;
}
</style>
