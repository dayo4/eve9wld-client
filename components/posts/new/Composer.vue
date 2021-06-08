<template>
    <div>
        <div class="Post_Title_Container px-5 pt-5 mb-0">
            <div class="t-white bold-4 font-6">TITLE :</div>
            <div
                ref="titleInput"
                @input="setTitle"
                v-on:paste="plainText"
                class="Post_Title bg-white br4 p-3"
                contenteditable="true"
                placeholder="Enter Post Title"
            ></div>

            <div
                v-if="errors && errors['Title']"
                :class="errors && errors['Title'] ? 'vibrate' : ''"
                class="font-3 p-1 bg-white t-red br1 ml-4"
                style="width:95%;"
            >
                Error: {{ showError("Title") }}
            </div>

            <div class="t-white bold-4 font-6">SLUG :</div>
            <div
                ref="slugInput"
                @input="setSlug"
                class="Post_Title bg-white br4 p-3"
                contenteditable="true"
                placeholder="Enter Post Permalink"
            ></div>
        </div>

        <!-- editor -->
        <TextEditor
            @contentUpdated="setContent"
            :initialContent="contentToEdit ? contentToEdit.content : null"
            :config="editorConfig"
            :enableImage="true"
        ></TextEditor>
    </div>
</template>
<script lang="ts">
import { $Auth, $Posts } from '@/myStore'
import { $Process, $Notify, $Obstacl, $Validator, $General } from '@/plugins'

import Vue from "vue"

export default Vue.extend({
    components: {
        TextEditor: () => import(/* webpackChunkName: "txd" */'@/components/GlobalComponents/utils/TextEditor.vue')
    },
    // beforeRouteEnter(to, from, next) {
    // 	next(vm => {
    // 		if (to.query.mode === 'edit')				{
    // 			vm.$data.mode = to.query.mode
    // 		}
    // 	})
    // },

    data () {
        return {
            // initialContent: string = this.contentToEdit.content || '' /* Only useful when editing existing post */
            title: '',
            slug: '',
            content: '',
            errors: null as any /* object */
            // mode: 'compose'
        }
    },

    computed: {
        user: () => $Auth.user,
        editorConfig: () => $Posts.$compose.editorConfig,
        /* These bellow only matter when editing or updating existing posts. Otherwise they'll be null */
        currentMode: () => $Posts.$compose.currentMode,
        contentToEdit: () => $Posts.$compose.contentToEdit,
    },

    methods: {
        setTitle (e: any) {
            this.title = e.target.textContent
            if (this.errors)
            {
                this.errors[ 'Title' ] = ''
            }
        },

        setSlug (e: any) {
            this.slug = e.target.textContent
            if (this.errors)
            {
                this.errors[ 'Slug' ] = ''
            }
        },

        setContent (content: string) {
            this.content = content
        },

        showError (fieldName: string) {
            if (this.errors)
            {
                return this.errors[ 'Title' ]
            }
        },

        validate () {
            const schema = [
                {
                    fieldName: 'Title',
                    data: $Validator.sanitize(this.title),
                    rules: {
                        required: true,
                        min: 10,
                        max: 100
                    },
                },
                {
                    fieldName: 'Slug',
                    data: $Validator.sanitize(this.slug),
                    rules: {
                        required: true,
                        min: 5,
                        max: 100
                    },
                },
                {
                    fieldName: 'Content',
                    data: this.content,
                    rules: {
                        required: true,
                    },
                }
            ]
            return $Validator.validate(schema)
        },

        init () {
            if (this.validate())
            {
                $Obstacl.create('#saveBtn', {
                    action: this.saveContent,
                    // action: this.captureContentImages,
                })

            }
            this.errors = $Validator.getErrors()

            $Process.abort()

            if (this.errors[ 'Content' ])
            {
                $Notify.error(this.errors[ 'Content' ])
            }
            if (this.errors[ 'Slug' ])
            {
                $Notify.error(this.errors[ 'Slug' ])
            }
        },

        saveContent (contentImages?: any) {
            // console.log(contentImages)

            if (this.currentMode != 'edit-post')
            {
                $Posts.$compose.newPost({
                    title: this.title,
                    slug: this.slug.replace(/\s{2,}/g, ' ').split(' ').join('-').toLowerCase(),
                    content: this.content,
                    contentImages
                }).then(() => {
                    $Obstacl.destroy('#saveBtn')
                })
            } else
            {
                $Posts.$compose.update({
                    title: this.title,
                    slug: this.slug.replace(/\s{2,}/g, ' ').split(' ').join('-').toLowerCase(),
                    content: this.content,
                    contentImages
                }).then(() => {
                    $Obstacl.destroy('#saveBtn')
                })
            }

        },
        plainText (e: ClipboardEvent) {
            $General.pasteAsPlainText(e)
        }
    },

    mounted () {
        if (this.contentToEdit)
        {
            this.title = (this.$refs.titleInput as HTMLDivElement).textContent = this.contentToEdit.title
            this.slug = (this.$refs.slugInput as HTMLDivElement).textContent = this.contentToEdit.slug
        }

    }
})

    // $refs!: {
    //     titleInput: any
    //     slugInput: any
    // }

</script>
<style lang="scss">
.Post_Title_Container {
    border-radius: 5px 5px 0 0;
    background-color: $cyan--3;
}
.Post_Title {
    border: solid $cyan--3 4px;
}
</style>