<script setup>
import axios from "axios";
import { ref, reactive, onBeforeMount } from "vue";
import { toast } from "vue3-toastify";

const url = "https://deckofcardsapi.com";

let golden_deck = reactive({
  id: null,
  remaining: null,
});

let tundra_deck = reactive({
  id: null,
  remaining: null,
});

let owned_cards = ref([]);

const get_golden_deck = () => {
  axios
    .get(`${url}/api/deck/new/shuffle/?deck_count=1`)

    .then((res) => {
      golden_deck.id = res.data.deck_id;
      golden_deck.remaining = res.data.remaining;

      localStorage.setItem("golden_id", golden_deck.id);
      localStorage.setItem("golden_remaining", golden_deck.remaining);
    })

    .catch((error) => {
      toast.error("Ups, could not get Golden deck", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      console.log(error);
    });
};

const get_tundra_deck = () => {
  axios
    .get(`${url}/api/deck/new/shuffle/?deck_count=1`)

    .then((res) => {
      tundra_deck.id = res.data.deck_id;
      tundra_deck.remaining = res.data.remaining;

      localStorage.setItem("tundra_id", tundra_deck.id);
      localStorage.setItem("tundra_remaining", tundra_deck.remaining);
    })

    .catch((error) => {
      toast.error("Ups, could not get Tundra deck", {
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
      if (owned_cards.value.length <= 9) {
        for (const cards of data) {
          owned_cards.value.push(cards);
          localStorage.setItem(
            "player_cards",
            JSON.stringify(owned_cards.value)
          );
        }
      } else {
        toast.error("Only 10 cards allowed!", {
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
  if (localStorage.getItem("player_cards")) {
    owned_cards = JSON.parse(localStorage.getItem("player_cards"));
  }

  /* In case we have data in our localstorage we display it */
  if (localStorage.getItem("golden_id") && localStorage.getItem("tundra_id")) {
    golden_deck.id = localStorage.getItem("golden_id");
    golden_deck.remaining = localStorage.getItem("golden_remaining");
    tundra_deck.id = localStorage.getItem("tundra_id");
    tundra_deck.remaining = localStorage.getItem("tundra_remaining");
  } else {
    /* In case we dont, we make api calls */
    get_golden_deck();
    get_tundra_deck();
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
            Golden Deck
          </h1>
          <p class="board__top-mazes__deck-box__deck-data__id">
            {{ golden_deck.id }}
          </p>
        </div>

        <div class="board__top-mazes__deck-box__actions">
          <button class="btn-action" @click="shuffle_cards(golden_deck.id)">
            <span>Shuffle</span>
          </button>
          <button
            class="btn-action"
            @click="
              draw_card(golden_deck, 'golden_remaining', golden_deck.id, 1)
            "
          >
            <span>Draw 1</span>
          </button>
        </div>
        <img
          class="board__top-mazes__deck-box__deck-img"
          src="../assets/imgs/golden.png"
        />
        <div class="board__top-mazes__deck-box__stats">
          <label for="">Remaining Cards:</label>
          <span class="board__top-mazes__deck-box__stats__number">{{
            golden_deck.remaining
          }}</span>
        </div>
      </div>
      <!-- MAZO 2 -->
      <div class="board__top-mazes__deck-box">
        <div class="board__top-mazes__deck-box__deck-data">
          <h1 class="board__top-mazes__deck-box__deck-data__title">
            Tundra Deck
          </h1>
          <p class="board__top-mazes__deck-box__deck-data__id">
            {{ tundra_deck.id }}
          </p>
        </div>

        <div class="board__top-mazes__deck-box__actions">
          <button class="btn-action" @click="shuffle_cards(tundra_deck.id)">
            <span>Shuffle</span>
          </button>
          <button
            class="btn-action"
            @click="
              draw_card(tundra_deck, 'tundra_remaining', tundra_deck.id, 2)
            "
          >
            <span>Draw 2</span>
          </button>
        </div>
        <img
          class="board__top-mazes__deck-box__deck-img"
          src="../assets/imgs/tundra.png"
        />
        <div class="board__top-mazes__deck-box__stats">
          <label for="">Remaining Cards:</label>
          <span class="board__top-mazes__deck-box__stats__number">{{
            tundra_deck.remaining
          }}</span>
        </div>
      </div>
    </div>

    <div class="board__player-cards">
      <div class="cards" v-for="cards in owned_cards">
        <img class="cards__img" v-bind:src="cards.image" alt="" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/styles/index.scss";
.board {
  margin: 50px;
  background-color: $primary-rose;
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
          color: $primary-ocean-blue;
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
          background: $primary-ocean-blue;
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
          color: $primary-ocean-blue;
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
