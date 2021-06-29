<template>
  <div class="Tab">
    <h2 class="text-center t-blue-grey--1">My Downloads</h2>

    <div class="px-3 mb-6" v-for="(item, i) in 5" :key="i">
      <article class="Tiles">
        <section class="Img">
          <img
            title="item.name"
            alt="Item Image"
            src="/defaults/pgs/scavorb_gallery.jpg"
            draggable="false"
          />
        </section>
        <section class="my-1 mx-2 t-blue-grey--1">
          <div class="t-blue font-3 mb-2">
            <h3>
              The name of theamazing item concerned The name of theamazing item
              concerned
            </h3>
          </div>

          <div>
            <h5>
              Paid - $45
            </h5>
            <h5>
              Date - May 29, 2021
            </h5>
          </div>
        </section>
      </article>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { $Auth, $Profile } from "@/store";
import { $Confirm, $Validator, $General } from "@/plugins";

export default Vue.extend({
  // components: {},

  data() {
    return {};
  },

  computed: {
    user: () => $Auth.user,
    userData: () => $Auth.userData
  },

  mounted() {}
});
</script>
<style lang="scss" scoped>
.Tiles {
  overflow: hidden;
  background-color: white;
  border-radius: 15px;
  // margin: 0px 15px 30px 15px;
  border-bottom: solid 3px $cyan;

  & > .Img {
    height: 200px;
    // padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
    & img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
