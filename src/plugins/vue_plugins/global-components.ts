import Vue from 'vue'

//@ts-ignore
import GlobalWrapper from "@/components/GlobalComponents/utils/GlobalWrapper.vue"
//@ts-ignore
import Section from "@/components/GlobalComponents/utils/Section.vue"
//@ts-ignore
import UserInfoInput from "@/components/GlobalComponents/account_info/UserInfoInput.vue"
//@ts-ignore
Vue.component('Dropdown', () => import("@/components/GlobalComponents/utils/Dropdown.vue"))
Vue.component('UserInfoInput', UserInfoInput)
Vue.component('GlobalWrapper', GlobalWrapper)
Vue.component('Section', Section)
