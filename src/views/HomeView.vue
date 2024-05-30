<template>
  <div>
    <header class="header">
      <div class="search">
        <img src="../assets/img/search-icon.svg" alt="иконка поиска" class="search-icon" />
        <input
          class="search-input"
          type="text"
          placeholder="Имя персонажа"
          v-model="searchString"
        />
        <label for="status" class="search_label">Status</label>
        <select class="search-select" name="status" id="status" v-model="selectValue">
          <option class="search-select-option" v-bind="{ status: all }"></option>
          <option class="search-select-option" v-bind="{ status: Alive }">Alive</option>
          <option class="search-select-option" v-bind="{ status: Dead }">Dead</option>
          <option class="search-select-option" v-bind="{ status: Unknown }">unknown</option>
        </select>
      </div>
    </header>
    <div class="body">
      <CharacterCard
        v-for="character in characterList"
        :key="character.id"
        :image="character.image"
        :gender="character.gender"
        :name="character.name"
        :status="character.status"
        :location="character.location"
        :origin="character.origin"
        :episode="character.episodes[0]"
        class="character_card"
      />
    </div>
    <div class="pagination_container">
      <button @click="prevPage" class="button-9">Пред. страница</button>
      <div class="pagination_page_counter">Страница {{ currentPage }} of 42</div>
      <button @click="nextPage" class="button-9">След. страница</button>
    </div>
  </div>
</template>
<script setup>
import { useCharacterListStore } from '../stores/characterList'
import { onMounted, ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { CharacterCard } from '../components/CharacterCard'

const characterListStore = useCharacterListStore()
const { characters } = storeToRefs(characterListStore)
const { getCharactersInfo } = characterListStore

console.log(characterListStore)

const currentPage = ref(1)

const nextPage = () => {
  if (currentPage.value < 42) {
    currentPage.value++
    getCharactersInfo(currentPage.value)
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    getCharactersInfo(currentPage.value)
  }
}

onMounted(async () => {
  console.log(characters.value)
  await getCharactersInfo(1)
  console.log(characters.value)
})

const searchString = ref('')
const selectValue = ref()
console.log(selectValue)
console.log(searchString)

let characterList = computed(() => {
  console.log(characters.value)
  if (!searchString.value && selectValue.value === 'Status') {
    return characters.value
  } else if (!searchString.value && selectValue.value) {
    return characters.value.filter(
      (character) =>
        character.status.toLowerCase().includes(selectValue.value.toLowerCase()) && character.name
    )
  } else if (searchString.value && !selectValue.value) {
    return characters.value.filter((character) =>
      character.name.toLowerCase().includes(searchString.value.trim().toLowerCase())
    )
  } else if (searchString.value && selectValue.value) {
    return characters.value.filter(
      (character) =>
        character.name.toLowerCase().includes(searchString.value.trim().toLowerCase()) &&
        character.status.toLowerCase().includes(selectValue.value.toLowerCase())
    )
  }
})

function onChangeSelected() {
  characterList = computed(() => {
    console.log(characters.value)
    if (!searchString.value && !selectValue.value) {
      return characters.value
    } else if (!searchString.value && selectValue.value) {
      return characters.value.filter(
        (character) =>
          character.status.toLowerCase().includes(selectValue.value.toLowerCase()) && character.name
      )
    } else if (searchString.value && !selectValue.value) {
      return characters.value.filter((character) =>
        character.name.toLowerCase().includes(searchString.value.trim().toLowerCase())
      )
    } else if (searchString.value && selectValue.value) {
      return characters.value.filter(
        (character) =>
          character.name.toLowerCase().includes(searchString.value.trim().toLowerCase()) &&
          character.status.toLowerCase().includes(selectValue.value.toLowerCase())
      )
    }
  })
}

onChangeSelected()
</script>
<style scoped>
.search-input {
  margin-left: 10px;
  background: transparent;
  border: none;
  border-bottom: 1px solid #444;
  color: white;
}

.search-select {
  margin-left: 10px;
  background: transparent;
  border: none;
  border-bottom: 1px solid #444;
  color: white;
}

.search-select-option {
  color: black;
}

.search_label {
  margin-top: 5px;
  margin-left: 15px;
}

.search-container {
  display: inline-block;
  position: fixed;
  top: 65px;
}

.search-icon {
  max-width: 30px;
}

.search {
  display: flex;
  align-items: stretch;
}

.header {
  padding: 30px;
  display: flex;
}

.body {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  max-width: 100vw;
  justify-content: center;
}

.character_card {
  border: 1px solid transparent;
  border-radius: 10px;
}

.pagination_container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination_page_counter {
  color: wheat;
  margin: 5px 20px 0 20px;
}

/* CSS */
.button-9 {
  appearance: button;
  backface-visibility: hidden;
  background-color: #405cf5;
  border-radius: 6px;
  border-width: 0;
  box-shadow:
    rgba(50, 50, 93, 0.1) 0 0 0 1px inset,
    rgba(50, 50, 93, 0.1) 0 2px 5px 0,
    rgba(0, 0, 0, 0.07) 0 1px 1px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  font-family: -apple-system, system-ui, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif;
  font-size: 100%;
  height: 44px;
  line-height: 1.15;
  margin: 12px 0 0;
  outline: none;
  overflow: hidden;
  padding: 0 25px;
  position: relative;
  text-align: center;
  text-transform: none;
  transform: translateZ(0);
  transition:
    all 0.2s,
    box-shadow 0.08s ease-in;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 150px;
}

.button-9:disabled {
  cursor: default;
}

.button-9:focus {
  box-shadow:
    rgba(50, 50, 93, 0.1) 0 0 0 1px inset,
    rgba(50, 50, 93, 0.2) 0 6px 15px 0,
    rgba(0, 0, 0, 0.1) 0 2px 2px 0,
    rgba(50, 151, 211, 0.3) 0 0 0 4px;
}
</style>
