<script setup>
import axios from "axios";
import { ref, reactive } from "vue";

const url = "https://deckofcardsapi.com";

let deck_one = reactive({
  id: null,
  remaining: null,
});

let deck_id = ref(null);
let remaining_cards = ref(null);

const deck = () => {
  axios
    .get(`${url}/api/deck/new/shuffle/?deck_count=1`)

    .then((res) => {
      console.log(res);
      deck_one.id = res.data.deck_id;
      deck_one.remaining = res.data.remaining;
    })

    .catch((error) => {
      console.log(error);
    });
};

/* const shuffle_cards = () => {
  axios
    .get(`https://deckofcardsapi.com/api/deck/${deck_id}/shuffle/`)

    .then((res) => {
      console.log(res);
    })

    .catch((res) => {
      console.log(res);
    });
}; */

/* const draw_card = () => {
  axios
    .get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=2`)

    .then((res) => {
      console.log(res);
    })

    .catch((res) => {
      console.log(res);
    });
}; */

deck();
</script>

<template>
  <div class="board">
    <div class="board__deck">
      <h1 class="board__deck__title">Mazo Primero</h1>
      <div class="board__deck__actions">
        <button>barajar</button>
        <button>Coger 1</button>
      </div>
      <div class="board__deck__deck-img">IMAGEN</div>
      <div class="board__deck__stats">
        <div class="board__deck__stats__data-box">
          <p class="board__deck__stats__data-box__title">ID mazo:</p>
          <p class="board__deck__stats__data-box__data">{{ deck_one.id }}</p>
        </div>
        <div class="board__deck__stats__data-box">
          <p class="board__deck__stats__data-box__title">Cartas restantes:</p>
          <p class="board__deck__stats__data-box__data">
            {{ deck_one.remaining }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.board {
  margin: 10%;
  background-color: black;
  border-radius: 10px;
  min-height: 600px;
  color: white;

  display: flex;
  align-items: center;

  &__deck {
    background-color: lightblue;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &__title {
      color: black;
    }

    &__actions {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-block: 10px;
    }

    &__deck-img {
      height: 50px;
      width: 45px;
      background-color: purple;
      margin-block: 10px;
    }

    &__stats {
      background-color: lightgreen;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      &__data-box {
        padding-inline: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;

        &__title {
          font-weight: bold;
          margin-right: 10px;
        }

        &__data {
          color: black;
        }
      }
    }
  }
}
</style>
