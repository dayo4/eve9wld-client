<template>
	<article class="FormWrapper">
		<section class="form" @input="resetError">
			<div v-if="!exclude.includes('first_name')">
				<label>First Name <i>*</i></label>
				<input v-model="first_name" type="text" placeholder="John" />
			</div>
			<div v-if="!exclude.includes('last_name')">
				<label>Last Name <i>*</i></label>
				<input v-model="last_name" type="text" placeholder="Doe" />
			</div>
			<div v-if="!exclude.includes('about')">
				<label>About You</label>
				<div
					ref="about"
					@input="setAbout"
					contenteditable="true"
					placeholder="About you.."
				></div>
			</div>
			<div v-if="!exclude.includes('url')">
				<label>Url/Website</label>
				<input
					v-model="url"
					type="url"
					placeholder="e.g - https://mysite.com/etc"
				/>
			</div>
			<div v-if="!exclude.includes('company_name')">
				<label>Company Name</label>
				<div>
					<input
						v-model="company_name"
						type="text"
						placeholder="e.g - Orbrift"
					/>
					<small
						>If you want your invoices addressed to a company. Leave
						blank to use your full name instead.</small
					>
				</div>
			</div>
			<div v-if="!exclude.includes('country')">
				<label>Country <i>*</i></label>
				<select v-model="country">
					<option value="-1" selected>Select Country</option>
					<option v-for="i in countries" :key="i" :value="i">
						{{ i }}
					</option>
				</select>
			</div>
			<div v-if="!exclude.includes('address_1')">
				<label>Address Line 1 <i>*</i></label>
				<input v-model="address_1" type="text" />
			</div>
			<div v-if="!exclude.includes('address_2')">
				<label>Address Line 2</label>
				<input
					v-model="address_2"
					type="text"
					placeholder="e.g - No.60, some street, at some place"
				/>
			</div>
			<div v-if="!exclude.includes('city')">
				<label>City <i>*</i> </label>
				<input v-model="city" type="text" />
			</div>
			<div v-if="!exclude.includes('state')">
				<label>State/Province/Region <i>*</i></label>
				<input v-model="state" type="text" />
			</div>
			<div v-if="!exclude.includes('postcode')">
				<label>Zip / Postal Code <i>*</i></label>
				<input
					v-model="postcode"
					type="text"
					placeholder="e.g - 675322"
				/>
			</div>
			<div v-if="!exclude.includes('company_no')">
				<label>Company No.</label>
				<div>
					<input v-model="company_no" type="text" />
					<small
						>Your Company Number will appear on your invoice if you
						fill this field.</small
					>
				</div>
			</div>
		</section>

		<!-- Errors -->
		<transition name="expand">
			<section v-if="error" class="text-center mt-5">
				<div ref="Error" class="Alert p-3 b1 bg-pink-5 t-red-1">
					{{ error }}
				</div>
			</section>
		</transition>

		<!-- Save Button -->
		<section class="flex j-c-center my-4">
			<button @click="saveAll" class="btn shadow-0">
				<i class="icon-check mr-1"></i>Save Changes
			</button>
		</section>
	</article>
</template>
<script lang="ts">
import Vue from "vue"
import { $Auth, $Profile, $Account } from "@/store"
import { $Validator, $General } from "@/plugins"

export default Vue.extend({
	// components: {},
	props: {
		target: { required: true, type: String },//A text describing where is is used
		exclude: {
			required: false,
			type: Array,
			default: () => [ "country", "address_1", "address_2", "city", "state", "postcode", "company_no", "company_name" ]
		},//an array of fields not to be present in the component. Default is
		required: {
			required: false,
			type: Array,
			default: () => [ 'first_name', 'last_name' ]
		},//an array of fields not to be present in the component. Default is
	},
	data () {
		return {
			first_name: "",
			last_name: "",
			url: "",
			company_name: "",
			country: "",
			address_1: "",
			address_2: "",
			city: "",
			state: "",
			postcode: "",
			company_no: "",
			about: "",

			/* errors */
			error: "",

			/* needed data */
			neededData: []
		}
	},

	computed: {
		user: () => $Auth.user,
		userData: () => $Auth.userData,
		countries: () => $General.countries
	},
	methods: {
		setAbout (e: any) {
			this.about = e.target.textContent
		},
		saveAll () {
			const data = this.getData()
			console.log(data)
			$Account.update(data).then(success => {
				if (success)
					$Account.fetch().then(done => {
						if (done)
							this.setData()
					})
			})
			// this.$emit('ready', data)
		},
		getSchema (include: string[]) {
			const repText = "Please enter a valid "
			const schema = {
				first_name: {
					fieldName: "First Name",
					data: this.first_name,
					rules: {
						required: this.required.includes(this.first_name),
						string: true,
						min: 2,
						max: 20,
						pattern: /^[a-zA-Z]+$/
					},
					messages: { pattern: repText + "First Name" }
				},
				last_name: {
					fieldName: "Last Name",
					data: this.last_name,
					rules: {
						required: this.required.includes(this.last_name),
						string: true,
						min: 2,
						max: 20,
						pattern: /^[a-zA-Z]+$/
					},
					messages: { pattern: repText + "Last Name" }
				},
				about: {
					fieldName: "About",
					data: this.about,
					rules: { string: true, max: 1000 }
				},
				url: {
					fieldName: "URL",
					data: this.url,
					rules: {
						pattern: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g
					},
					messages: { pattern: repText + "Website Url" }
				},
				company_name: {
					fieldName: "Company Name",
					data: this.company_name,
					rules: {
						string: true,
						pattern: /^[\w\d\s\-_(),.&#]*$/
					},
					messages: { pattern: repText + "Company Name" }
				},
				address_1: {
					fieldName: "Address_1",
					data: this.address_1,
					rules: {
						required: true,
						string: true,
						pattern: /^[\w\d\s\-_(),.&#]+$/
					},
					messages: { pattern: repText + "address for Address_1" }
				},
				address_2: {
					fieldName: "Address_2",
					data: this.address_2,
					rules: {
						string: true,
						pattern: /^[\w\d\s\-_(),.&#]*$/
					},
					messages: { pattern: repText + "address for Address_2" }
				},
				country: {
					fieldName: "Country",
					data: this.country,
					rules: {
						required: true,
						string: true,
						pattern: /^[\w\d\s\-_(),.&;#]+$/
					},
					messages: { pattern: repText + "Country" }
				},
				city: {
					fieldName: "City",
					data: this.city,
					rules: {
						required: true,
						string: true,
						pattern: /^[\w\d\s\-_(),.&#]+$/
					},
					messages: { pattern: repText + "City" }
				},
				state: {
					fieldName: "State",
					data: this.state,
					rules: {
						required: true,
						string: true,
						pattern: /^[\w\d\s\-_(),.&#]+$/
					},
					messages: { pattern: repText + "State" }
				},
				postcode: {
					fieldName: "Zip/Postal Code",
					data: this.postcode,
					rules: {
						required: true,
						number: true,
						pattern: /^[\d]+$/
					},
					messages: {
						pattern: "Postal Code - Expects Only Numbers." + repText + "value"
					}
				},
				company_no: {
					fieldName: "Company No.",
					data: this.company_no,
					rules: {
						string: true,
						pattern: /^[\d\s\-()]*$/
					},
					messages: { pattern: repText + "Company No" }
				}
			}

			const needed = []
			for (let i in include) {
				needed.push(schema[ include[ i ] ])
			}

			return needed
		},
		getData () {
			if ($Validator.validate(this.getSchema(this.neededData))) {

				const data = {}
				for (let i in this.neededData) {
					data[ this.neededData[ i ] ] = this.$data[ this.neededData[ i ] ]
				}
				if (this.target === 'BillingInfo') data[ 'target' ] = 'BillingInfo'

				return data
			}
			else {
				this.error = $Validator.getErrors({ format: "single" })
			}
		},
		setData () {
			const potentialData = [
				"first_name",
				"last_name",
				"url",
				"company_name",
				"country",
				"address_1",
				"address_2",
				"city",
				"state",
				"postcode",
				"company_no",
				"about",
			]

			for (let data in this.$data) {
				if (!this.exclude.includes(data) && data != 'error' && data != 'neededData') {
					this.neededData.push(data)
					if (this.target === 'BillingInfo' && typeof $Account.data.billing_info[ data ] != 'undefined') {
						this.$data[ data ] = $Account.data.billing_info[ data ]
					}
					else if (this.target === 'AccountInfo') {
						this.$data[ data ] = $Account.data[ data ]
						if (data === 'about') {
							(this.$refs.about as HTMLDivElement).textContent = $Account.data[ data ]
						}
					}
					else {
						this.$data[ data ] = ''
					}
				}
			}
		},
		resetError () {
			if (this.error)
				this.error = ''
		}
	},

	mounted () {
		this.setData()
	}
});
</script>
<style lang="scss" scoped>
.FormWrapper {
	& .form > div {
		margin:/*  30px  */ 10px;
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
		& i {
			color: red;
		}
	}
	& small {
		display: block !important;
		margin-top: 6px;
		font-weight: 500;
	}
}
.Alert {
	// font-family: cursive;
	font-family: "Courier New", Courier, monospace;
	font-weight: 600;
	letter-spacing: 1px;
	min-height: 50px;
	max-height: 100px;
	border-left: none;
	border-right: none;
	border-radius: 3px;
	overflow-x: hidden;
	overflow-y: auto;
}
@media (min-width: 960px) {
	.FormWrapper {
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
	.FormWrapper {
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
	.FormWrapper {
		& .form > div > label,
		& .form > div > *:last-child {
			flex: 0 0 100%;
			max-width: 100%;
		}
	}
}
</style>
