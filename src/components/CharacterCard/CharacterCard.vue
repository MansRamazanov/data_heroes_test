<template>
  <div class="card_container">
    <img :src="props.image" :alt="props.name" class="character_avatar" />
    <div class="info_container">
      <h2 class="character_name">{{ props.name }}</h2>
      <div class="character_race_container">
        <div v-if="props.status === 'Alive'" class="character_status_alive"></div>
        <div v-if="props.status === 'Dead'" class="character_status_dead"></div>
        <div v-if="props.status === 'unknown'" class="character_status"></div>
        <p class="character_race">{{ props.status }} - {{ props.gender }}</p>
      </div>
      <div class="character_location_container">
        <p class="character_location_title">Last known location:</p>
        <p class="character_location">{{ props.location.name }}</p>
      </div>

      <div class="character_first_seen_container">
        <p class="character_first_seen_title">First seen in:</p>
        <p class="character_first_seen">{{ props.episode.name }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  image: String,
  gender: String,
  name: String,
  status: String,
  location: Object,
  origin: Object,
  episode: Object
})
</script>
<style scoped>
.card_container {
  display: flex;
}

.character_avatar {
  max-width: 220px;
  max-height: 230px;
  border-radius: 10px 0 0 10px;
}

.info_container {
  padding: 15px;
  min-width: 340px;
  background-color: rgb(32, 35, 41);
  color: white;
  border-radius: 0 10px 10px 0;
}

.character_name {
  margin: 0;
}

.character_race_container {
  display: flex;
  align-items: baseline;
}

.character_race::first-letter {
  text-transform: uppercase;
}

.character_status {
  width: 10px;
  height: 10px;
  background-color: rgb(158, 158, 158);
  margin-right: 5px;
  border-radius: 50%;
}

.character_status_alive {
  width: 10px;
  height: 10px;
  background-color: rgb(85, 204, 68);
  margin-right: 5px;
  border-radius: 50%;
}

.character_status_dead {
  width: 10px;
  height: 10px;
  background-color: rgb(214, 61, 46);
  margin-right: 5px;
  border-radius: 50%;
}

.character_race {
  padding-top: 3px;
}

.character_location_container {
  padding-top: 10px;
}

.character_location_title {
  font-size: 16px;
  font-weight: 500;
  color: rgb(158, 158, 158);
}
.character_first_seen_container {
  padding-top: 10px;
}

.character_first_seen_title {
  font-size: 16px;
  font-weight: 500;
  color: rgb(158, 158, 158);
}
</style>
