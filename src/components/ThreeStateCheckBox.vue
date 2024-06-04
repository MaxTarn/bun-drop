<template>
    <input type="checkbox" :class="{ 'checked': isChecked, 'crossed': isCrossed }" @click="toggleState">
  </template>
  
  <script>
  export default {
    data() {
      return {
        isChecked: false,
        isCrossed: false
      };
    },
    methods: {
      toggleState() {
        if (this.isCrossed) {
          this.isCrossed = false;
        } else if (this.isChecked) {
          this.isCrossed = true;
        } else {
          this.isChecked = true;
        }
      }
    },
    computed: {
      value() {
        if (this.isChecked) {
          return 'checked';
        } else if (this.isCrossed) {
          return 'crossed';
        } else {
          return 'unchecked';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .checked {
    background-color: green;
  }
  
  .crossed {
    text-decoration: line-through;
    color: red;
  }
  </style>
  