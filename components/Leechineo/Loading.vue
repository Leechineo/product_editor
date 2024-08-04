<template>
  <span class="dBoxContainer">
    <div class="dBox dBox1 primary" />
    <div class="dBox dBox2 primary" />
    <div class="dBox dBox3 primary" />
    <div class="dBox dBox4 primary" />
    <div class="dBox dBox5 primary" />
  </span>
</template>

<script>
export default {

}
</script>

<style scoped>
@keyframes quiet {
  25%{
    transform: scaleY(.6);
  }
  50%{
    transform: scaleY(.4);
  }
  75%{
    transform: scaleY(.8);
  }
}

@keyframes normal {
  25%{
    transform: scaleY(1);
  }
  50%{
    transform: scaleY(.4);
  }
  75%{
    transform: scaleY(.6);
  }
}
@keyframes loud {
  25%{
    transform: scaleY(1);
  }
  50%{
    transform: scaleY(.4);
  }
  75%{
    transform: scaleY(1.2);
  }
}

.dBoxContainer{
  display: flex;
  justify-content: space-between;
  height: 64px;
  --boxSize: 8px;
  --gutter: 4px;
  width: calc((var(--boxSize) + var(--gutter)) * 5);
}

.dBox{
  transform: scaleY(.4);
  height: 100%;
  width: var(--boxSize);
  animation-duration: 1.2s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  border-radius: 8px;
}

.dBox1{
  animation-name: quiet;
}

.dBox2{
  animation-name: normal;
}

.dBox3{
  animation-name: quiet;
}

.dBox4{
  animation-name: loud;
}

.dBox5{
  animation-name: quiet;
}
</style>
