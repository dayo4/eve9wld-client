<template>
	<GlobalWrapper :header="false">
		<template #WrapperTitle> Your Profile Details</template>

		<template #WrapperBody>
			<!-- Image -->
			<Section class="mb-5">
				<template #SectHead>
					<span>Your Photo</span>
					<span v-if="changeImage" class="btn bg-trans-3 br4"
						><i class="icon-upload font-4"></i
					></span>
					<span
						@click="changeImage = !changeImage"
						class="btn bg-trans-3 br4"
						><i class="icon-edit mr-1"></i>Edit</span
					>
				</template>
				<template #SectBody>
					<div class="flex j-c-center sm-j-c-start">
						<div class="ImageBorder logo-base logo-static noselect">
							<span>
								<img :src="account.profile_image" />
							</span>
							<span></span>
						</div>
					</div>
					<section>
						<div v-if="changeImage">
							<span v-if="errors.image" class="t-red p-1 my-2">{{
								errors.image
							}}</span>
							<transition name="slide-fade">
								<label class="xs12 md3 mr-1 mb-3"
									>Enter an Image Url</label
								>
								<input
									@input="errors.image = ''"
									class="xs12 md9"
									v-model="imageUrl"
									type="url"
								/>
							</transition>
						</div>
					</section>
				</template>
			</Section>

			<!-- Profile Informations -->
			<Section class="mb-5">
				<template #SectHead>
					<span>Profile Info</span>
					<span class="btn bg-trans-3 br4"
						><i class="icon-edit mr-1"></i>Edit</span
					>
				</template>
				<template #SectBody>
					<UserInfoInput target="AccountInfo" />
				</template>
			</Section>

			<!-- Billing Informations -->
			<Section class="mb-5">
				<template #SectHead>
					<span>Billing Details</span>
					<span class="btn bg-trans-3 br4"
						><i class="icon-edit mr-1"></i>Edit</span
					>
				</template>
				<template #SectBody>
					<UserInfoInput
						:exclude="['url', 'about']"
						target="BilingInfo"
					/>
				</template>
			</Section>

			<!-- Password -->
			<Section>
				<template #SectHead>
					<span>Your Password</span>
					<span
						@click="changePassword = !changePassword"
						class="btn bg-trans-3 br4"
						><i class="icon-edit mr-1"></i>Edit</span
					>
				</template>
				<template #SectBody>
					<section class="pl-2">
						<span v-if="errors.password" class="t-red p-1 my-2">{{
							errors.password
						}}</span>
						<transition name="slide-fade">
							<div class="my-2" v-if="changePassword">
								<label for="old_password" class="mr-5"
									>Old Password</label
								>
								<input
									@input="errors.password = ''"
									name="old_password"
									type="password"
									v-model="oldPassword"
									placeholder="Enter old password"
								/>
							</div>
						</transition>
						<transition name="slide-fade">
							<div class="my-2" v-if="changePassword">
								<label for="new_password" class="mr-5"
									>New Password</label
								>
								<input
									@input="errors.password = ''"
									name="new_password"
									type="password"
									v-model="newPassword"
									placeholder="Enter new password"
								/>
							</div>
						</transition>
						<transition name="slide-fade">
							<button
								v-if="newPassword.length >= 6"
								@click="savePassword"
								class="bg-pink--3 mt-4 btn"
							>
								Save New Password
							</button>
						</transition>
					</section>
				</template>
			</Section>

			<!-- Deactivation -->
			<Section v-if="user && user.pr != 10">
				<template #SectHead>
					<span>Account Status</span>
				</template>
				<template #SectBody>
					<section class="flex j-c-between wrap">
						<button
							@click="deactivateAccount"
							class="btn p-3 shadow-4 my-5"
							style="background-color: #bf360c"
						>
							Deactivate Account
						</button>
						<button
							@click="deleteAccount"
							class="btn bg-red--4 p-3 shadow-4 my-5"
						>
							Delete Account
						</button>
					</section>
				</template>
			</Section>
		</template>
	</GlobalWrapper>
</template>
<script lang="ts">
import Vue from "vue"
import { $Auth, $Account, $Profile } from "@/store"
import { $Confirm, $Validator, $General } from "@/plugins"

export default Vue.extend({

	data () {
		return {
			changeImage: false,
			changeAbout: false,
			changePassword: false,

			oldPassword: "",
			newPassword: "",

			imageUrl: '',

			errors: {
				// name: "",
				image: "",
				password: ""
			}
		}
	},

	computed: {
		user: () => $Auth.user,
		userData: () => $Auth.userData,
		account: () => $Account.data
	},

	methods: {
		saveImage () {
			const schema = [
				{
					fieldName: "Image URL",
					data: this.imageUrl,
					rules: {
						required: true,
						string: true,
						pattern: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g
					},
					messages: { pattern: "Please Enter a valid image url" }
				},
			]

			if ($Validator.validate(schema)) {
				$Account.update({ profile_image: this.imageUrl }).then(success => {
					if (success)
						$Account.fetch()
				})
			}
			const error = $Validator.getErrors({ format: "single" })
			this.errors.image = error
		},

		savePassword () {
			const schema = [
				{
					fieldName: "Old Password",
					data: this.oldPassword,
					rules: { required: true, string: true, min: 8, max: 100 }
				},
				{
					fieldName: "New Password",
					data: this.newPassword,
					rules: { required: true, string: true, min: 8, max: 100 }
				}
			]

			if ($Validator.validate(schema)) {
				$Profile.$settings
					.changePassword({
						old_password: this.oldPassword,
						new_password: this.newPassword
					})
					.then(data => {
						if (data) {
							this.oldPassword = ""
							this.newPassword = ""
							this.changePassword = false
						}
					})
			}
			const error = $Validator.getErrors({ format: "single" })
			this.errors.password = error
		},

		deactivateAccount () {
			$Confirm({
				header: "Deactivate Account",
				// message: `Your account will be deactivated for 30days, after which it will be parmanetly deleted.
				// 	<br>
				// 		<i>You can simply login anytime within this period to reactivate your account.</i>
				// 		<br>
				// 		<b>Are you sure you want to do delete your Account?</b>`,
				message: `<b>Are you sure you want to deactivate your Account?</b>`,
				type: "danger",
				onConfirm: function () {
					return $Profile.$settings.deactivateAccount().then(data => {
						if (data) {
							$Auth.$form.logout()
							return data
						}
					})
				}
			})
		},

		deleteAccount () {
			$Confirm({
				header: "Delete Account",
				// message: `Your account will be deactivated for 30days, after which it will be parmanetly deleted.
				// 	<br>
				// 		<i>You can simply login anytime within this period to reactivate your account.</i>
				// 		<br>
				// 		<b>Are you sure you want to do delete your Account?</b>`,
				message: `Your account will be parmanetly deleted.
				<br>
					<b>Are you sure you want to delete your Account?</b>`,
				type: "danger",
				onConfirm: function () {
					return $Profile.$settings.deleteAccount().then(data => {
						if (data) {
							$Auth.$form.logout()
							return data
						}
					})
				}
			})
		},

		// plainText (e: ClipboardEvent) {
		// 	$General.pasteAsPlainText(e)
		// }
	},

	// mounted () {
	// 	(this.first_name = this.userData.first_name),
	// 		(this.last_name = this.userData.last_name),
	// 		((this.$refs
	// 			.about as HTMLDivElement).textContent = this.about = this.userData.about)
	// }
});
</script>
<style lang="scss" scoped>
.Header {
	font-size: 14px;
	color: $blue-grey-1;
	// border-top: solid 1.5px;
	border-bottom: solid 1.5px;
	padding: 5px 10px;
	display: flex;
	align-items: center;
}

div[contenteditable="true"] {
	max-height: 250px;
}
div[contenteditable="true"],
input {
	border: solid 2px rgba(128, 128, 128, 0.591);
	border-radius: 4px;
	padding: 5px;
}

section {
	margin-bottom: 35px;
}

.ImageBorder {
	height: 100px;
	width: 100px;
	& > span:nth-child(1) {
		top: 5%;
		left: 5%;
		width: 90%;
		height: 90%;
		& img {
			width: 100%;
			height: 100%;
		}
	}
}
label {
	color: $blue-grey--1;
}
</style>
