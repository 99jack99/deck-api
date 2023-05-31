<script setup></script>

<template>
  <div class="header">
    <router-link to="/" class="header__items">BOARD nº 1</router-link>
    <router-link to="/table2" class="header__items">BOARD nº 2</router-link>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/styles/index.scss";
.header {
  height: 10vh;
  width: 100%;
  background-color: $black-shade;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border-bottom: 2px solid $light-blue;
  font-family: regular;

  &__items {
    margin-inline: 20px;
    text-decoration: none;
    align-items: center;
    background-color: transparent;
    color: $light-blue;
    cursor: pointer;
    display: flex;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.5;
    text-decoration: none;
    text-transform: uppercase;
    outline: 0;
    border: 0;
    padding: 1rem;

    &:before {
      background-color: $light-blue;
      content: "";
      display: inline-block;
      height: 1px;
      margin-right: 10px;
      transition: all 0.42s cubic-bezier(0.25, 0.8, 0.25, 1);
      width: 0;
    }

    &:hover:before {
      background-color: $light-blue;
      width: 3rem;
    }
  }
}
</style>
