<template>
    <!-- editor -->
    <div>
        <section id="toolbar-container"></section>
        <section id="decoupled-ck-editor"></section>
    </div>
</template>
<script lang="ts">
// import { $Auth, $Posts } from '@/myStore'
// import { $Process, $Notify, $Obstacl, $Validator } from '@/plugins'

import Vue from "vue"
// import CustomCkDocumentEditor from '@ckeditor/ckeditor5-build-decoupled-document'
import CustomCkDocumentEditor from '@/plugins/utils/ckeditor'

import { $Axios } from '@/plugins'
import { $Auth } from "@/myStore"

export default Vue.extend({
    // components: {
    // },
    props: {
        initialContent: { required: false, type: String },
        config: { required: false, type: Array },
        enableImage: { required: false, default: false, type: Boolean },
    },
    data () {
        return {
            editor: null,
            editorConfig: {
                plugins: [ /* resizeImage *//* ImageInsert */, /* AutoImage */ ],
            }
        }
    },
    // watch: {
    //     content (val: string) {
    //         this.$emit('content-updated', val)
    //     }
    // },
    computed: {

    },
    methods: {

    },
    mounted () {

        // this.content = this.initialContent
        // const editor: HTMLElement = document.getElementsByClassName('ql-editor')[ 0 ] as any
        // editor.addEventListener('paste', $General.pasteAsPlainText, false)
        let _this = this
        // let CkDocumentEditor

        class MyUploadAdapter {
            loader

            constructor (loader) {
                this.loader = loader
            }

            upload () {
                return this.loader.file.then(async (file) => {
                    console.log(this.loader)
                    const formData = new FormData()
                    formData.append('contentImages', file)

                    try
                    {

                        const { data } = await $Axios.patch('posts/uploadImages/' + 4 + '/' + $Auth.user.id, formData, {
                            onUploadProgress: (progressEvent) => {
                                // setInterval(() => {
                                //     let uploaded = Math.round((progressEvent.loaded / progressEvent.total) * 100)
                                console.log(`${progressEvent.loaded}/${progressEvent.total}`)
                                // }, 20)
                            }
                        })
                        console.log(data)
                        return { default: _this.$postBaseUrl + data.imageUrl }
                    }
                    catch (e)
                    {
                        console.log('errr', e)
                    }
                })

            }
            abort () {
                console.log('abooooooort')
            }
        }

        // if (!CkDocumentEditor)
        // {
        //     CkDocumentEditor = CustomCkDocumentEditor.create(document.querySelector('#decoupled-ck-editor'), {

        //         toolbar: {
        //             items: [
        //                 'heading',
        //                 '|',
        //                 'fontSize',
        //                 'fontFamily',
        //                 '|',
        //                 'fontColor',
        //                 'fontBackgroundColor',
        //                 '|',
        //                 'bold',
        //                 'italic',
        //                 'underline',
        //                 'strikethrough',
        //                 '|',
        //                 'alignment',
        //                 '|',
        //                 'numberedList',
        //                 'bulletedList',
        //                 '|',
        //                 'outdent',
        //                 'indent',
        //                 '|',
        //                 'todoList',
        //                 'link',
        //                 'blockQuote',
        //                 'imageInsert',
        //                 'insertTable',
        //                 'mediaEmbed',
        //                 '|',
        //                 'undo',
        //                 'redo',
        //                 'code',
        //                 'codeBlock',
        //                 'subscript',
        //                 'superscript',
        //                 'horizontalLine'
        //             ]
        //         },
        //         language: 'en',
        //         image: {
        //             // resizeOptions: [
        //             // {
        //             //     name: 'resizeImage:original',
        //             //     label: 'Original',
        //             //     value: null
        //             // },
        //             // {
        //             //     name: 'resizeImage:100%',
        //             //     label: '100%',
        //             //     value: 100
        //             // },
        //             // {
        //             //     name: 'resizeImage:90%',
        //             //     label: '90%',
        //             //     value: 90
        //             // },
        //             // {
        //             //     name: 'resizeImage:75',
        //             //     label: '75%',
        //             //     value: 75
        //             // },
        //             // {
        //             //     name: 'resizeImage:50',
        //             //     label: '50%',
        //             //     value: 50
        //             // },
        //             // {
        //             //     name: 'resizeImage:25%',
        //             //     label: '25%',
        //             //     value: 25
        //             // },

        //             // ],

        //             toolbar: [
        //                 'imageTextAlternative',
        //                 'imageStyle:full',
        //                 'imageStyle:side',
        //                 'linkImage',
        //                 '|', 'resizeImage:original', 'resizeImage:75', 'resizeImage:50'
        //             ]
        //         },
        //         table: {
        //             contentToolbar: [
        //                 'tableColumn',
        //                 'tableRow',
        //                 'mergeTableCells',
        //                 'tableCellProperties',
        //                 'tableProperties'
        //             ]
        //         },
        //         licenseKey: '',


        //     })
        //         .then(editor => {

        //             _this.editor = editor
        //             editor.model.document.on('change:data', () => {
        //                 _this.$emit('contentUpdated', editor.getData())
        //             })

        //             if (_this.initialContent)
        //             {
        //                 editor.setData(_this.initialContent)
        //                 _this.$emit('contentUpdated', editor.getData())
        //             }

        //             const toolbarContainer = document.querySelector('#toolbar-container')
        //             toolbarContainer.appendChild(editor.ui.view.toolbar.element)

        //             editor.plugins.get('FileRepository').createUploadAdapter = function (loader) {
        //                 return new MyUploadAdapter(loader)
        //             }

        //         })
        //         .catch(e => {
        //             console.log('editor error', e)
        //         })
        // }

    }
})

</script>
