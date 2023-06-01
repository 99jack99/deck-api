<script setup>
import axios from "axios";
import { ref, reactive, onBeforeMount } from "vue";
import { toast } from "vue3-toastify";

const url = "https://deckofcardsapi.com";

let inferno_deck = reactive({
  id: null,
  remaining: null,
});

let owned_cards_inf = ref([]);

const get_inferno_deck = () => {
  axios
    .get(`${url}/api/deck/new/shuffle/?deck_count=3`)

    .then((res) => {
      inferno_deck.id = res.data.deck_id;
      inferno_deck.remaining = res.data.remaining;

      localStorage.setItem("inferno_id", inferno_deck.id);
      localStorage.setItem("inferno_remaining", inferno_deck.remaining);
    })

    .catch((error) => {
      toast.error("Ups, could not get Inferno deck", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      console.log(error);
    });
};

const shuffle_cards = (deck_id) => {
  axios
    .get(`${url}/api/deck/${deck_id}/shuffle/`)
    .then((res) => {
      toast.success("Cards have been shuffled", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      console.log(res);
    })
    .catch((res) => {
      toast.error("Ups, there was a problem shuffling the deck", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      console.log(res);
    });
};

const draw_card = (deck_var, storage_name, deck_id, cards_drawn) => {
  axios
    .get(`${url}/api/deck/${deck_id}/draw/?count=${cards_drawn}`)
    .then((res) => {
      console.log(res.data.cards);
      deck_var.remaining = res.data.remaining;
      localStorage.setItem(`${storage_name}`, deck_var.remaining);
      let data = res.data.cards;
      if (owned_cards_inf.value.length <= 5) {
        for (const cards of data) {
          owned_cards_inf.value.push(cards);
          localStorage.setItem(
            "player_cards_inferno",
            JSON.stringify(owned_cards_inf.value)
          );
        }
      } else {
        toast.error("Only 6 cards allowed in INFERNO LEVEL!", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    })
    .catch((res) => {
      console.log(res);
    });
};

onBeforeMount(() => {
  /* In case player had cads in hand */
  if (localStorage.getItem("player_cards_inferno")) {
    owned_cards_inf = JSON.parse(localStorage.getItem("player_cards_inferno"));
  }

  /* In case we have data in our localstorage we display it */
  if (localStorage.getItem("inferno_id")) {
    inferno_deck.id = localStorage.getItem("inferno_id");
    inferno_deck.remaining = localStorage.getItem("inferno_remaining");
  } else {
    /* In case we dont, we make api calls */
    get_inferno_deck();
  }
});
</script>

<template>
  <div class="board">
    <div class="board__top-mazes">
      <!-- MAZO 1 -->
      <div class="board__top-mazes__deck-box">
        <div class="board__top-mazes__deck-box__deck-data">
          <h1 class="board__top-mazes__deck-box__deck-data__title">
            Inferno Deck
          </h1>
          <p class="board__top-mazes__deck-box__deck-data__id">
            {{ inferno_deck.id }}
          </p>
        </div>

        <div class="board__top-mazes__deck-box__actions">
          <button class="btn-action" @click="shuffle_cards(inferno_deck.id)">
            <span>Shuffle</span>
          </button>
          <button
            class="btn-action"
            @click="
              draw_card(inferno_deck, 'inferno_remaining', inferno_deck.id, 3)
            "
          >
            <span>Draw 3</span>
          </button>
        </div>
        <img
          class="board__top-mazes__deck-box__deck-img"
          src="../assets/imgs/inferno.webp"
        />
        <div class="board__top-mazes__deck-box__stats">
          <label for="">Remaining Cards:</label>
          <span class="board__top-mazes__deck-box__stats__number">{{
            inferno_deck.remaining
          }}</span>
        </div>
      </div>
    </div>

    <div class="board__player-cards">
      <div class="cards" v-for="cards in owned_cards_inf">
        <img class="cards__img" v-bind:src="cards.image" alt="" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/styles/index.scss";
.board {
  margin: 50px;
  background-color: $primary-ocean-blue;
  border-radius: 20px;
  min-height: 600px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 20px 20px 60px #030303, -20px -20px 60px #353535;
  font-family: regular;

  &__top-mazes {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    &__deck-box {
      padding: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: $shade-lt;
      border-radius: 20px;
      margin: 20px;

      &__deck-data {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        &__title {
          color: $primary-rose;
          text-shadow: 3px 3px $black-shade-lgt;
          font-size: 40px;
          margin: 0;
          font-family: prisma;
        }

        &__id {
          margin: 0;
          color: white;
          font-size: 20px;
          margin-bottom: 20px;
        }
      }

      &__actions {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-block: 10px;
        gap: 20px;

        .btn-action {
          background: $primary-rose;
          border: none;
          padding: 10px 20px;
          display: inline-block;
          font-size: 15px;
          font-family: regular;
          font-weight: 600;
          width: 120px;
          text-transform: uppercase;
          cursor: pointer;
          transform: skew(-21deg);
          font-style: normal;

          span {
            display: inline-block;
            transform: skew(21deg);
          }

          &::before {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            right: 100%;
            left: 0;
            background: $cream;
            opacity: 0;
            z-index: -1;
            transition: all 0.5s;
          }

          &:hover {
            color: $black-shade-lgt;
          }

          &:hover::before {
            left: 0;
            right: 0;
            opacity: 1;
          }
        }
      }

      &__deck-img {
        height: 220px;
        width: 180px;
        margin-block: 10px;
      }

      &__stats {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;

        &__number {
          color: $primary-rose;
          text-decoration: underline;
        }
      }
    }
  }

  &__player-cards {
    margin-top: 50px;
    margin-bottom: 10px;
    width: 100%;
    height: 200px;
    background-color: #5957584b;

    display: flex;
    align-items: center;
    justify-content: center;

    .cards {
      &__img {
        height: 200px;
        margin-inline: 5px;

        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }
}
</style>
