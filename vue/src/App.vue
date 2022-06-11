<template>
  <router-view></router-view>
</template>

<style>
html::-webkit-scrollbar {
  width: 3px;
  height: 0px;
}

html::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  opacity: 0.1;
  box-shadow: inset 3px 3px 3px rgba(255, 255, 255, 0.2);
  border-radius: 5px;
}

html::-webkit-scrollbar-track {
  display: none;
}
</style>
