<script setup>
import axios from "axios";

let deck_id = null;
let remaining_cards = null;

const deck = () => {
  axios
    .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")

    .then((res) => {
      console.log(res.data.deck_id);
      deck_id = res.data.deck_id;
      console.log(res.data.remaining);
      remaining_cards = res.data.remaining;
    })

    .catch((res) => {
      console.log(res);
    });
};

const shuffle_cards = () => {
  axios
    .get(`https://deckofcardsapi.com/api/deck/${deck_id}/shuffle/`)

    .then((res) => {
      console.log(res);
    })

    .catch((res) => {
      console.log(res);
    });
};

const draw_card = () => {
  axios
    .get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=2`)

    .then((res) => {
      console.log(res);
    })

    .catch((res) => {
      console.log(res);
    });
};

big();

deck();
</script>

<template>
  <div>
    <h2>HOLA</h2>
    <h2>{{ deck_id }}</h2>
    <h2>{{ remaining_cards }}</h2>
  </div>
</template>

<style scoped></style>
