<template>
  <div class="Tab">
    <h2 class="text-center t-blue-grey--1">Billing Information</h2>

    <article class="BillInf">
      <!-- Billing Details -- on checkout page -->
      <!-- We do not sell your details or share them without your permission. Read more in our privacy policy. -->
      <section class="form">
        <div>
          <label for="fname">First Name</label>
          <input type="text" />
        </div>
        <div>
          <label for="lname">Last Name</label>
          <input type="text" />
        </div>
        <div>
          <label>Company Name</label>
          <div>
            <input type="text" />
            <small
              >If you want your invoices addressed to a company. Leave blank to
              use your full name instead.</small
            >
          </div>
        </div>
        <div>
          <label>Country</label>
          <select name="country">
            <option value="some">Select your country</option>
          </select>
        </div>
        <div>
          <label>Address Line 1</label>
          <input type="text" />
        </div>
        <div>
          <label>Address Line 2</label>
          <input type="text" />
        </div>
        <div>
          <label>City</label>
          <input type="text" />
        </div>
        <div>
          <label>State/Province/Region</label>
          <input type="text" />
        </div>
        <div>
          <label>Zip / Postal Code</label>
          <input type="text" />
        </div>
        <div>
          <label>Company No.</label>
          <div>
            <input type="text" />
            <small
              >Your Company Number will appear on your invoice if you fill this
              field.</small
            >
          </div>
        </div>
      </section>
    </article>
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
.BillInf {
  & .form > div {
    margin: 30px 10px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  & input[type="text"],
  select {
    border: solid 1.5px $blue-grey;
    border-radius: 4px;
    padding: 4px;
    width: 100%;
  }

  & label {
    flex: 1 1 auto;
    margin-bottom: 2px;
    font-weight: bold;
    color: $blue-grey-1;
  }
  & small {
    display: block !important;
    margin-top: 6px;
    font-weight: 500;
  }
}

@media (min-width: 960px) {
  .BillInf {
    & .form > div > *:last-child {
      flex: 0 0 75%;
      max-width: 75%;
    }
    & .form > div > label {
      flex: 0 0 25%;
      max-width: 25%;
    }
  }
}
@media (min-width: 600px) {
  .BillInf {
    & .form > div > *:last-child {
      flex: 0 0 66.66%;
      max-width: 66.66%;
    }
    & .form > div > label {
      flex: 0 0 33.33%;
      max-width: 33.33%;
    }
  }
}
@include xs-only {
  .BillInf {
    & .form > div > label,
    & .form > div > *:last-child {
      flex: 0 0 100%;
      max-width: 100%;
    }
  }
}
</style>
