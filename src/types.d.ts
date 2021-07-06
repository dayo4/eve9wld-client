import Vue from 'vue'

// import type SocketIOClient from "socket.io-client"
// 2. Specify a file with the types you want to augment
//    Vue has the constructor type in types/vue.d.ts
declare module 'vue/types/vue' {
    // 3. Declare augmentation for Vue
    interface Vue {
        $moment: any
        $baseUrl: string
    }


}
export default interface Query {//Api data fetch Query
    limit?: number
    offset?: number
    sort?: string[]
    filter?: object
}