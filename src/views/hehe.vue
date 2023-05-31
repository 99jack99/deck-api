<script setup>
import axios from "axios";
import { ref, reactive } from "vue";

const url = "https://deckofcardsapi.com";

let deck_one = reactive({
  id: null,
  remaining: null,
});

let cards_have = reactive([]);

/* let deck_id = ref(null);
let remaining_cards = ref(null); */

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

const shuffle_cards = () => {
  axios
    .get(`${url}/api/deck/${deck_one.id}/shuffle/`)

    .then((res) => {
      console.log(res);
    })

    .catch((res) => {
      console.log(res);
    });
};

const draw_card = () => {
  axios
    .get(`${url}/api/deck/${deck_one.id}/draw/?count=2`)

    .then((res) => {
      console.log(res);
      deck_one.remaining = res.data.remaining;
      /* cards_have.push(res.data.cards); */
      cards_have = res.data.cards;
      console.log(cards_have);
    })

    .catch((res) => {
      console.log(res);
    });
};

deck();
</script>

<template>
  <div class="board">
    <div class="board__deck">
      <h1 class="board__deck__title">Mazo Primero</h1>
      <div class="board__deck__actions">
        <button @click="shuffle_cards()">barajar</button>
        <button @click="draw_card()">Coger 1</button>
      </div>
      <img src="./assets/imgs/decky.png" class="board__deck__deck-img" />
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

    <div class="board__player">
      <div v-for="card in cards_have">
        <img class="card-img" v-bind:src="card.image" alt="" />
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
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__deck {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &__title {
      color: white;
    }

    &__actions {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-block: 10px;
    }

    &__deck-img {
      height: 200px;
      width: 200px;
      margin-block: 10px;
    }

    &__stats {
      margin-top: 20px;
      background-color: lightgreen;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 10px;

      &__data-box {
        padding-inline: 10px;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        /*  width: 100%; */

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

  &__player {
    margin: 20px;
    margin-top: 10%;
    width: 100%;
    height: 100px;
    background-color: rosybrown;

    display: flex;

    align-items: center;
    justify-content: center;

    .card-img {
      height: 200px;
      width: 150px;
      margin-inline: 10px;
    }
  }
}
</style>
