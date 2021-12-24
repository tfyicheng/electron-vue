<template>
    <div class="body">
    <group class="group"></group>
    <chat class="chat"></chat>
    </div>
</template>

<script>
import Chat from './chat.vue'
import group from './group.vue'
export default {
  components: { group, Chat },

}
</script>

<style scoped>
    .body {
        /* float: left; */
        margin-top: 80px;
         /* width: 100%; */
             /* height: 100%; */
    }
    .group {
        width: 440px;
        /* z-index: 999; */
        /* display: inline-block; */
        height: 100%;
        position: fixed;
        top: 0; 
        /* left: 0;  */
        left: 120px; 
    }
    .chat {
         /* display: inline-block; */
         left: 440px;
         position: relative;
        height: 100%;
        width: 500px;
    }
</style>