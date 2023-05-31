<script setup></script>

<template>
  <div class="header">
    <router-link to="/" class="header__items" href="">BOARD 1</router-link>
    <router-link to="/table2" class="header__items" href=""
      >BOARD 2</router-link
    >
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/styles/index.scss";
.header {
  height: 10vh;
  width: 100%;

  background-color: $blue;

  display: flex;
  align-items: center;
  justify-content: center;

  color: black;
  font-weight: 500;

  &__items {
    margin-inline: 20px;
    text-decoration: none;
    /* background-color: white;
    padding: 7px 14px;
    border-radius: 4px; */

    align-items: center;
    background-color: transparent;
    color: #fff;
    cursor: pointer;
    display: flex;
    font-family: ui-sans-serif, system-ui, -apple-system, system-ui, "Segoe UI",
      Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji";
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.5;
    text-decoration: none;
    text-transform: uppercase;
    outline: 0;
    border: 0;
    padding: 1rem;

    &:before {
      background-color: #fff;
      content: "";
      display: inline-block;
      height: 1px;
      margin-right: 10px;
      transition: all 0.42s cubic-bezier(0.25, 0.8, 0.25, 1);
      width: 0;
    }
    &:hover:before {
      background-color: #fff;
      width: 3rem;
    }
  }
}
</style>
