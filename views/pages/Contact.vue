<template>
  <div>
    <h1 class="Head page-head-bg-grad text-center t-blue-grey py-4">
      Let's Get Things Done
    </h1>

    <!-- Contact Component -->
    <Contact></Contact>

    <section>
      <div class="page-head-bg-grad text-center p-5 mt-5 br2 font-5">
        Care for more enquiries? Feel free to contact us. Or if you are ready to
        start your project, use the button below
        <div class="flex j-c-center mt-5 mb-1">
          <button
            @click="$router.push({ path: '/project-enquiry' })"
            class="btn pink-gradient-btn shadow-5 br4 py-3"
          >
            Get a quote
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

// import { $Posts } from "@/store"
// import { $Notify, $Obstacl } from "@/plugins"

import Contact from "@/components/pages/Contact.vue";
import { $General, $Axios } from "@/plugins";
import { $Products } from "@/store";

export default Vue.extend({
  components: {
    Contact
  },
  head() {
    return $General.metaInfo({ title: "Get in touch with us | scavorb" });
  },

  mounted() {
    wp();
    async function wp() {
      // await $Axios.post('wp/v2/users', {

      // }){
      {
        const { data } = await $Axios.get("wp/v2/users?per_page=10");
        console.log(data);
      }
      // {
      //     const { data } = await $Axios.get('')
      //     console.log(data)
      // }
      // {
      //     const { data } = await $Axios.get('wc/store/products')
      //     console.log(data)
      // }
      {
        const data = await $Products.fetchAll();
        console.log(data);
      }
    }
  }
});
</script>
<style lang="scss" scoped>
.Head {
  font-family: "Itim", "Roboto", sans-serif;
  letter-spacing: 1px;
}
</style>
