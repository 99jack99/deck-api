<script setup></script>

<template>
  <div class="board">
    <div class="board__top-mazes">
      <div class="board__top-mazes__deck-box">
        <div class="board__top-mazes__deck-box__deck-data">
          <h1 class="board__top-mazes__deck-box__deck-data__title">
            Mazo Primero
          </h1>
          <p class="board__top-mazes__deck-box__deck-data__id">j1238193</p>
        </div>

        <div class="board__top-mazes__deck-box__actions">
          <button class="btn-action"><span>Barajar</span></button>
          <button class="btn-action">Coger 1</button>
        </div>
        <img
          class="board__top-mazes__deck-box__deck-img"
          src="../assets/imgs/1.png"
        />
        <div class="board__top-mazes__deck-box__stats">
          <label for="">Remaining Cards:</label>
          <span>56</span>
        </div>
      </div>
    </div>

    <div class="board__player-cards"></div>
  </div>
</template>

<style lang="scss" scoped>
.board {
  margin: 50px;
  background-color: #da4167;
  border-radius: 10px;
  min-height: 600px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__top-mazes {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    /*  background-color: white; */

    &__deck-box {
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      &__deck-data {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        &__title {
          color: white;
          margin: 0;
        }

        &__id {
          margin: 0;
          color: white;
          font-weight: 200;
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
          background: #fff;
          border: none;
          padding: 10px 20px;
          display: inline-block;
          font-size: 15px;
          font-weight: 600;
          width: 120px;
          text-transform: uppercase;
          cursor: pointer;
          transform: skew(-21deg);

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
            background: rgb(20, 20, 20);
            opacity: 0;
            z-index: -1;
            transition: all 0.5s;
          }

          &:hover {
            color: #fff;
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
        width: 190px;
        margin-block: 10px;
      }

      &__stats {
        font-weight: 200;
      }
    }
  }

  &__player-cards {
    margin-top: 50px;
    margin-bottom: 10px;
    width: 100%;
    height: 200px;
    background-color: yellow;
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
