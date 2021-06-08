import { $Auth } from '@/myStore'
import { $Axios, $Process, $Notify } from '@/plugins'


export class Compose {
    // content = ''
    currentMode = 'new-post'
    contentToEdit = null /* if in editing mode */
    featuredImage = {
        postImageSrc: null,
        formData: null
    }

    editorConfig = [

    ]

    setFeaturedImage (data: object) {
        // console.log(data)
        this.featuredImage = data as any
    }

    async newPost (payload: { title: string, slug: string, content: string, contentImages: string[] }) {
        try
        {
            /* returned data will be only the 'id' of the new post */
            const { data } = await $Axios.post("posts/new/" + $Auth.user.id, {
                ...payload
            })
            this.contentToEdit = {
                id: data,
                title: payload.title,
                slug: payload.slug
            }
            this.currentMode = 'edit-post'
            if (this.featuredImage.formData)
            {
                this.uploadImages(this.featuredImage.formData)
            }

            this.featuredImage.formData = null
            $Notify.success('Content Saved.')

            $Process.done()
        }
        catch {
            $Notify.error()
            $Process.abort()
            if (payload.contentImages)
                //remove any image allready uploaded if error occured
                this.removeImages(payload.contentImages)
        }
    }

    /* This fetches posts for editing and update. */
    async fetchForEditing (payload: { slug: string }, preview = false) {
        $Process.add('Fetching content')
        try
        {
            const { data } = await $Axios.get("posts/" + payload.slug + '/' + (preview ? 'preview' : ''))
            if (data)
            {
                this.contentToEdit = data
                this.currentMode = 'edit-post'
                this.featuredImage.postImageSrc = data.img
                return data
            }
        }
        catch {
            $Notify.error()
        }
        finally { $Process.hide() }
    }

    async update (payload: { title: string, slug: string, content: string, contentImages: string[] }) {
        // this.currentPost_id
        try
        {
            const { data } = await $Axios.patch('posts/' + $Auth.user.id, {
                ...payload,
                postsIds: [ this.contentToEdit.id ]
            })
            if (data)
                if (this.featuredImage.formData)
                {
                    this.uploadImages(this.featuredImage.formData)
                }
            $Notify.success('Updated!')
            return data
        }
        catch {
            $Notify.error()
            if (payload.contentImages)
                //remove any image allready uploaded if error occured
                this.removeImages(payload.contentImages)
        }
        finally { $Process.hide() }
    }

    async uploadImages (formData: FormData) {
        try
        {
            const { data } = await $Axios.patch('posts/uploadImages/' + this.contentToEdit.id + '/' + $Auth.user.id,
                formData
            )
            if (data)
            {
                $Notify.success('Uploaded!')
                return data
            }
        }
        catch {
            $Notify.error()
            $Process.hide()
        }
    }

    async removeImages (payload: string[]) {
        try
        {
            const deleted = await
                $Axios.patch('posts/deleteImages/' + $Auth.user.id, {
                    imageUrls: payload
                })
            if (deleted)
                $Notify.success('Deleted!')

        }
        catch {
            $Notify.error()
        }
    }

}
