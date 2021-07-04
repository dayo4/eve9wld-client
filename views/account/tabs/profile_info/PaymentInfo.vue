<template>
  <div class="Tab">
    <h2 class="text-center t-blue-grey--1">Billing Information</h2>

    <article class="BillInf">
      <!-- Billing Details -- on checkout page -->
      <!-- We do not sell your details or share them without your permission. Read more in our privacy policy. -->
      <section class="form">
        <div>
          <label for="fname">First Name</label>
          <input v-model="first_name" type="text" />
        </div>
        <div>
          <label for="lname">Last Name</label>
          <input v-model="last_name" type="text" />
        </div>
        <div>
          <label>Company Name</label>
          <div>
            <input v-model="company_name" type="text" />
            <small
              >If you want your invoices addressed to a company. Leave blank to
              use your full name instead.</small
            >
          </div>
        </div>
        <div>
          <label>Country</label>
          <select v-model="country">
            <option selected>
              Select Country
            </option>
            <option v-for="i in countries" :key="i">
              {{ i }}
            </option>
          </select>
        </div>
        <div>
          <label>Address Line 1</label>
          <input v-model="address_1" type="text" />
        </div>
        <div>
          <label>Address Line 2</label>
          <input v-model="address_2" type="text" />
        </div>
        <div>
          <label>City</label>
          <input v-model="city" type="text" />
        </div>
        <div>
          <label>State/Province/Region</label>
          <input v-model="state" type="text" />
        </div>
        <div>
          <label>Zip / Postal Code</label>
          <input v-model="postcode" type="text" />
        </div>
        <div>
          <label>Company No.</label>
          <div>
            <input v-model="company_no" type="text" />
            <small
              >Your Company Number will appear on your invoice if you fill this
              field.</small
            >
          </div>
        </div>
      </section>
      <!-- Errors -->
      <section class="text-center">
        <small v-if="error" class="t-red p-1 my-1">{{ error }}</small>
      </section>
      <!-- Save Button -->
      <section class="flex j-c-center my-4">
        <button @click="saveAll" class="btn shadow-0">
          <i class="icon-check mr-1"></i>Save All Changes
        </button>
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
    return {
      first_name: "",
      last_name: "",
      company_name: "",
      country: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      postcode: "",
      company_no: "",

      /* errors */
      error: ""
    };
  },

  computed: {
    user: () => $Auth.user,
    userData: () => $Auth.userData,
    countries: () => $General.countries
  },
  methods: {
    saveAll() {
      const schema = [
        {
          fieldName: "First Name",
          data: this.first_name,
          rules: {
            required: true,
            string: true,
            min: 2,
            max: 20,
            pattern: /^[a-zA-Z]+$/
          },
          messages: { pattern: "Name may only contain letters" }
        },
        {
          fieldName: "Last Name",
          data: this.last_name,
          rules: {
            required: true,
            string: true,
            min: 2,
            max: 20,
            pattern: /^[a-zA-Z]+$/
          },
          messages: { pattern: "Name may only contain letters" }
        },
        {
          fieldName: "Company Name",
          data: this.company_name,
          rules: {
            string: true,
            pattern: /^[\w\d\s\-_(),.&#]*$/
          },
          messages: { pattern: "No bad/special characters allowed" }
        },
        {
          fieldName: "Address_1",
          data: this.address_1,
          rules: {
            required: true,
            string: true,
            pattern: /^[\w\d\s\-_(),.&#]+$/
          },
          messages: { pattern: "Address_1 - No bad/special characters allowed" }
        },
        {
          fieldName: "Address_2",
          data: this.address_2,
          rules: {
            string: true,
            pattern: /^[\w\d\s\-_(),.&#]*$/
          },
          messages: { pattern: "Address_2 - No bad/special characters allowed" }
        },
        {
          fieldName: "Country",
          data: this.country,
          rules: {
            required: true,
            string: true,
            pattern: /^[\w\d\s\-_(),.&#]+$/
          },
          messages: { pattern: "Country - No bad/special characters allowed" }
        },
        {
          fieldName: "City",
          data: this.city,
          rules: {
            required: true,
            string: true,
            pattern: /^[\w\d\s\-_(),.&#]+$/
          },
          messages: { pattern: "City - No bad/special characters allowed" }
        },
        {
          fieldName: "State",
          data: this.state,
          rules: {
            required: true,
            string: true,
            pattern: /^[\w\d\s\-_(),.&#]+$/
          },
          messages: { pattern: "State - No bad/special characters allowed" }
        },
        {
          fieldName: "Zip/Postal Code",
          data: this.postcode,
          rules: {
            required: true,
            string: true,
            pattern: /^[\d]+$/
          },
          messages: {
            pattern: "Postal Code -  No bad/special characters allowed"
          }
        },
        {
          fieldName: "Company No.",
          data: this.company_no,
          rules: {
            string: true,
            pattern: /^[\d\s\-()]*$/
          },
          messages: { pattern: "No bad/special characters allowed" }
        }
      ];

      if ($Validator.validate(schema)) {
        const data = {
          first_name: this.first_name,
          last_name: this.last_name,
          company_name: this.company_name,
          country: this.country,
          address_1: this.address_1,
          address_2: this.address_2,
          city: this.city,
          state: this.state,
          postcode: this.postcode,
          company_no: this.company_no
        };
        console.log(data);
      } else {
        const error = $Validator.getErrors({ format: "single" });
        this.error = error;
        console.log(error);
      }
    }
  }
  // mounted() {
  // const select = this.$refs.countries as Element;
  // for (let i in this.countries) {
  //   select.innerHTML += `
  //   <option value="${this.countries[i]}">${this.countries[i]}</option>
  //   `;
  // }
  // }
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
