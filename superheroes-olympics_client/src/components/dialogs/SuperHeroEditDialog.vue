<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-form ref="form">
      <v-card>
        <v-card-title
          >{{
            this.action === ACTION_TYPES.ADD ? "Add" : "Edit"
          }}
          Superhero</v-card-title
        >
        <v-card-text>
          <v-text-field
            v-model="superHeroToEdit.name"
            :rules="['Required']"
            placeholder="Name"
          ></v-text-field>

          <v-file-input
            v-if="this.action === ACTION_TYPES.ADD"
            :rules="['Required']"
            accept="image/png, image/jpeg, image/bmp"
            label="Avatar"
            placeholder="Pick an avatar"
            prepend-icon="mdi-camera"
            @change="handleFileChange"
          ></v-file-input>
          <!-- Agility, Strength, Weigth, Endurance & Charisma -->
          <div class="hero-stat-slider">
            Agility
            <v-slider
              v-model="superHeroToEdit.skills.agility"
              step="1"
              :max="10"
              :min="0"
              thumb-label
            ></v-slider>
          </div>
          <div class="hero-stat-slider">
            Strength
            <v-slider
              v-model="superHeroToEdit.skills.strength"
              step="1"
              :max="10"
              :min="0"
              thumb-label
            ></v-slider>
          </div>
          <div class="hero-stat-slider">
            Weight
            <v-slider
              v-model="superHeroToEdit.skills.weight"
              step="1"
              :max="10"
              :min="0"
              thumb-label
            ></v-slider>
          </div>
          <div class="hero-stat-slider">
            Endurance
            <v-slider
              v-model="superHeroToEdit.skills.endurance"
              step="1"
              :max="10"
              :min="0"
              thumb-label
            ></v-slider>
          </div>
          <div class="hero-stat-slider">
            Charisma
            <v-slider
              v-model="superHeroToEdit.skills.charisma"
              step="1"
              :max="10"
              :min="0"
              thumb-label
            ></v-slider>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cancelEdit">Cancel</v-btn>
          <v-btn
            color="blue darken-1"
            :disable="!formIsValid"
            text
            @click="saveEdit(superHeroToEdit)"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { ref } from "vue";
import { ACTION_TYPES, defaultSuperHero } from "../../models/models.ts";

const dialog = ref(false);
export default {
  props: {
    superhero: Object, // Pass the superhero object as a prop
  },
  data() {
    return {
      dialog,
      superHeroToEdit: {}, // Create a copy of superhero to edit
      action: ACTION_TYPES.NONE,
      ACTION_TYPES,
      isFormValid: false,
      chosenAvatar: {},
    };
  },
  watch: {
    superhero: {
      immediate: true,
      handler(newVal) {
        // Update superHeroToEdit when prop changes
        this.action = newVal.action;
        this.superHeroToEdit =
          this.action === ACTION_TYPES.ADD
            ? defaultSuperHero
            : { ...newVal.hero };

        if (
          Object.keys(this.superHeroToEdit).length &&
          this.action !== ACTION_TYPES.DELETE &&
          this.action !== ACTION_TYPES.NONE
        ) {
          this.chosenAvatar = {};
          dialog.value = true;
        }
      },
    },
  },
  computed: {
    formIsValid() {
      return false;
    },
  },
  methods: {
    cancelEdit() {
      // Reset superHeroToEdit and close dialog
      this.dialog = false;
    },
    saveEdit(heroData) {
      // Emit event with updated superhero and close dialog
      heroData.avatar = this.chosenAvatar;
      this.$emit("hero-updated", heroData);
      this.dialog = false;
    },
    handleFileChange(event) {
      const target = event.target;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          this.chosenAvatar = reader.result;
        };
        reader.readAsDataURL(file);
      }
    },
  },
};
</script>
