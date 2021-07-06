<template>
  <div>
    <section v-for="(post, i) in posts" :key="i">
      <!-- <section v-if="!post.isArticle" class="ShortPost br2 mb-3 mr-2 mt-10 px-2">
                    <div
                        class="Name flex nowrap a-i-center j-c-between w-full text-right t-blue-grey bold-5 font-3"
                    >
                        <div>
                            <Dropdown
                                :ownID="post.id"
                                :pos="{type: 'absolute', top: -13, right: 0}"
                                :optPos="{ right: -100}"
                                class="Dropdomn icon-dot-3 btn t-blue-grey font-12"
                            >
                                <template v-slot:default>
                                    <a>
                                        <span class="icon-bookmarks"></span>
                                        <span>Bookmark</span>
                                    </a>
                                    <a
                                        v-if="user && user.username === post.user.username"
                                        @click="editPost(post.id)"
                                    >
                                        <span class="icon-edit"></span>
                                        <span>Edit</span>
                                    </a>
                                    <a
                                        v-if="user && user.username === post.user.username"
                                        @click="deletePost(post.id)"
                                    >
                                        <span class="icon-trash-empty t-red"></span>
                                        <span>Delete</span>
                                    </a>
                                </template>
                            </Dropdown>
                        </div>

                        <div
                            class="bg-grey-5"
                        >{{ post.user.first_name + ' ' + post.user.last_name }}</div>
                    </div>

                    <div class="shadow-4 bg-grey-5 br3">
                        <div class="Title t-blue-grey bold-4 p-3">{{post.title}}</div>

                        <Minimizer :initialHeight="150">
                            <div class="Content p-3" v-html="post.content"></div>
                        </Minimizer>

                        <span class="UserImage br5">
                            <img
                                class="br5 noselect"
                                :src="$userBaseUrl + post.user.profile_image"
                                draggable="false"
                            />
                        </span>

                        <div class="Actions font-3 t-grey bold-3 p-2 noselect">
                            <span @click="showCommentModal(post)" class="icon-reply">Reply</span>
                            <span @click="showCommentModal(post)">{{post.comments}} Replies</span>
                            <span class="icon-thumbs-up-alt"></span>
                            <span style="margin: 4px 0px">58</span>
                            <span class="icon-thumbs-down-alt"></span> |
                            <span class="icon-clock">{{ $moment(post.created_at).fromNow()}}</span>
                        </div>
                    </div>
                </section>-->

      <!-- regular posts(ARTICLE) template-->
      <article class="Article br2 mb-3">
        <section
          class="PostImage xs12 sm6 md5 noselect"
          @click="openPost(post.slug)"
        >
          <img
            :src="post.featured_image || post.images[0]"
            draggable="false"
            class="br2"
          />
        </section>
        <section class="Details  xs12 sm6 md7">
          <div
            @click="openPost(post.slug)"
            class="cursor-pointer flex h-full w-full"
          >
            <img
              :src="post.user.profile_image"
              width="30"
              height="30"
              draggable="false"
              class="noselect"
            />
            <div>
              <h5 class="font-3 my-1 mx-5 t-white">{{ post.title }}</h5>
              <p class="font-2 my-2 mx-5 t-grey-1 bold-3">
                <span class="mr-2 bold-5 t-grey-2">{{
                  post.user.first_name + " " + post.user.last_name
                }}</span>
                -
                {{
                  post.comments_count > 1
                    ? `${post.comments_count} ${
                        post.comments_count > 1 ? "replies" : "reply"
                      }`
                    : ""
                }}
                <span class="icon-clock">{{
                  $moment(post.updated_at).fromNow()
                }}</span>
              </p>
            </div>
          </div>

          <!-- Dropdown component -->
          <Dropdown
            :ownID="post.id"
            :pos="{ type: 'absolute', top: 4, right: 4 }"
            class="icon-ellipsis-vert font-8 bg-trans-2"
            style="width:30px;"
          >
            <!-- slots -->
            <template v-slot:default>
              <router-link :to="{ path: '/posts/' + post.slug }">
                <span class="icon-eye"></span>
                <span>Open</span>
              </router-link>
              <a v-if="user">
                <span class="icon-bookmarks"></span>
                <span>Bookmark</span>
              </a>
              <a
                @click="
                  addToQueue(
                    post.id,
                    post.featured_image,
                    post.title,
                    post.slug
                  )
                "
              >
                <span class="icon-plus-1"></span>
                <span>Add to queue</span>
              </a>
            </template>
          </Dropdown>
        </section>
      </article>
    </section>

    <!-- Pagination -->
    <section class="flex j-c-center">
      <div class="Pagins xs12 sm11 md8">
        <button
          @click="$emit('switchPage', pagin.current - 1)"
          class="btn bg-trans-4"
        >
          <span class="icon-angle-double-left font-6"></span>
          <span class="font-1 mt-1">PREV</span>
        </button>
        <button class="Nums btn bg-white" v-for="i in pagin.pages" :key="i">
          <span
            @click="$emit('switchPage', i)"
            :class="pagin.current === i ? 'active' : ''"
            >{{ i }}</span
          >
        </button>
        <button
          @click="$emit('switchPage', pagin.current + 1)"
          class="btn bg-trans-4"
        >
          <span class="font-1 mt-1">NEXT</span>
          <span class="Icon icon-angle-double-right font-6"></span>
        </button>
      </div>
    </section>
    <!-- Pagination -->

    <!--MAIN COMMENTS COMPONENT -->
    <!-- <Comments
            :showComments="showComments"
            :socket="comment_Socket"
            :post="activePost"
            @dismiss="showComments = false"
        />-->
    <!--MAIN COMMENTS COMPONENT -->
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { $ReadQueue, $Posts, $Auth } from "@/store";
import { $Process } from "@/plugins";

export default Vue.extend({
  components: {
    Dropdown: () => import("@/components/GlobalComponents/utils/Dropdown.vue")
    // Comments: () => import('@/components/posts/comment/Comments.vue')
  },

  props: {
    posts: { required: true, type: Array },
    pagin: { required: true, type: Object }
  },

  computed: {
    user: () => $Auth.user
  },

  methods: {
    openPost(slug: string) {
      /* let route = */ this.$router.push({ path: "/posts/" + slug });
      // window.open(route.href, '_blank')
    },

    addToQueue(post_id, post_image: File, post_title: string, slug: string) {
      $ReadQueue.add({
        id: post_id,
        //@ts-ignore
        image: post_image.featured_image || post_image.images[0],
        title: post_title,
        slug: slug
      });
    }
  }
});
// activePost: object = null
// showComments: boolean = false
// comment_Socket: SocketIOClient.Socket = null

// showCommentModal (post) {
//     $Process.add('Setting up comments')

//     this.comment_Socket = WS('/comments/fetch-' + post.id)
//     this.activePost = post
//     $Comments.fetchAll(this.comment_Socket, post.id, {}, true).then((data) => {
//         if (data)
//         {
//             this.showComments = true

//         }
//     }).finally(() => $Process.hide())
// }
</script>
<style lang="scss" scoped>
.Pagins {
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
  padding: 5px;
  // height: 40px;
  width: 100%;
  border-bottom: rgb(45, 45, 45) solid 2px;
  border-top: rgb(45, 45, 45) solid 2px;
  border-radius: 10px;
  & button {
    box-shadow: none;
  }
  & .Nums {
    padding: 0;
    box-shadow: none;
    text-align: center;
    // justify-content: center !important;
    & span {
      border-radius: 4px;
      border-top: $grey solid 1px;
      border-bottom: $grey solid 1px;
      color: $blue-grey--2;
      padding: 5px 8px;
      margin: 0 5px;
      &:hover {
        background-color: $grey-3;
      }
      &.active {
        background-color: $grey-2;
      }
    }
  }
}

.Article {
  display: flex;
  background-color: rgb(45, 45, 45);

  & .PostImage {
    // position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    // // min-height: 200px;
    // // height: 100%;
    // overflow: hidden;
    // padding-top: 56.25%;
    // min-width: 50%;
    // width: 50%;
    & img {
      // position: absolute;
      // top: 0;
      // max-width: 100%;
      // max-height: 100%;
    }
  }
  & .Details {
    width: 100%;
    position: relative;
    padding: 8px;
    margin: 3px 2px;
    & img {
      min-width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
}

@include xs-only {
  .Article {
    // min-height: 330px;
    flex-wrap: wrap;

    & .PostImage {
      // height: 250px;
      // width: 100%;
      // margin: auto;
      // background-size: cover;
    }
    & .Details {
      // min-height: 80px;
      // margin: 0;
    }
  }
}

// .ShortPost {
//     position: relative;
//     & .Name {
//         & > div:first-child {
//             position: relative;
//             margin-left: 4px;
//             width: 12%;
//             & .Dropdomn {
//                 width: 100%;
//                 border-top: solid currentColor 0.5px;
//                 border-radius: 50px 50px 5px 5px;
//                 background-color: transparent;
//                 box-shadow: none;
//                 transition: 0.3s;
//                 &:active {
//                     background-color: rgba(173, 216, 230, 0.35);
//                 }
//             }
//         }
//         & > div:last-child {
//             padding: 4px 50px 4px 4px;
//             margin-right: 2px;
//             width: 84%;
//             border-top: solid currentColor 0.5px;
//             border-radius: 50px 0 0 0;
//         }
//     }
//     & .UserImage {
//         position: absolute;
//         right: -4px;
//         top: -18px;
//         border: solid 3px rgba(128, 128, 128, 0.476);
//         height: 50px;
//         width: 50px;

//         & img {
//             width: 100%;
//             height: 100%;
//         }
//     }
//     & .Actions {
//         & > span:not(:last-child) {
//             border-radius: 5px;
//             color: rgb(92, 189, 221);
//             padding: 4px;
//             margin: 4px;
//             cursor: pointer;
//             transition: 0.3s;

//             &:active {
//                 background-color: rgb(173, 216, 230);
//             }
//         }
//     }
// }
</style>
