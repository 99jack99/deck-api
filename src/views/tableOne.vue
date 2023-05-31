<script setup></script>

<template>
  <div class="board">
    <div class="board__top-mazes">
      <!-- MAZO 1 -->
      <div class="board__top-mazes__deck-box">
        <div class="board__top-mazes__deck-box__deck-data">
          <h1 class="board__top-mazes__deck-box__deck-data__title">
            Golden Deck
          </h1>
          <p class="board__top-mazes__deck-box__deck-data__id">j1238193</p>
        </div>

        <div class="board__top-mazes__deck-box__actions">
          <button class="btn-action"><span>Shuffle</span></button>
          <button class="btn-action"><span>Draw 2</span></button>
        </div>
        <img
          class="board__top-mazes__deck-box__deck-img"
          src="../assets/imgs/golden.png"
        />
        <div class="board__top-mazes__deck-box__stats">
          <label for="">Remaining Cards:</label>
          <span class="board__top-mazes__deck-box__stats__number">56</span>
        </div>
      </div>
      <!-- MAZO 2 -->
      <div class="board__top-mazes__deck-box">
        <div class="board__top-mazes__deck-box__deck-data">
          <h1 class="board__top-mazes__deck-box__deck-data__title">
            Tundra Deck
          </h1>
          <p class="board__top-mazes__deck-box__deck-data__id">j1238193</p>
        </div>

        <div class="board__top-mazes__deck-box__actions">
          <button class="btn-action"><span>Shuffle</span></button>
          <button class="btn-action"><span>Draw 2</span></button>
        </div>
        <img
          class="board__top-mazes__deck-box__deck-img"
          src="../assets/imgs/tundra.png"
        />
        <div class="board__top-mazes__deck-box__stats">
          <label for="">Remaining Cards:</label>
          <span class="board__top-mazes__deck-box__stats__number">56</span>
        </div>
      </div>
    </div>

    <div class="board__player-cards"></div>
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

    .card-img {
      height: 200px;
      width: 150px;
      margin-inline: 10px;
    }
  }
}
</style>
