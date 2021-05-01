<template>
    <div></div>
<!--     <vue-instagram token="IGQVJWM3FaTlg4ZAjllUzJjOXRwdEhPenVpUTVMYkYyRExKUG1jS3JvWXRmakhwaEozVHRzV0JBQThGS1hCcDB5N2pBU0Q5UWJ0djFPWWVaaGxTZAUwzVzhGX0hhRFdla3NQMkFPa1V6UnllWjBVQjc2XwZDZD" :count="5" :tags="[]" mediaType="image">
        <template v-slot:loading="props">
            <h1 v-if="props.loading" class="fancy-loading">Loading, please wait...</h1>
        </template>
        <template v-slot:feeds="props">
            <li class="fancy-list"> {{ props.feed.link }} </li>
        </template>
        <template v-slot:error="props">
            <div class="fancy-alert"> {{ props.error.error_message }} </div>
        </template>
    </vue-instagram> -->
</template>
<script>
    import * as userInstagram from 'user-instagram';
export default {
    components:{
    },
    mounted(){


        // Gets informations about a user
        userInstagram('edouard_courty') // Same as getUserData()
        .then(console.log)
        .catch(console.error);

        // Gets information about a post
        userInstagram.getPostData('CD9EMe5sHP5')
        .then(console.log)
        .catch(console.error)
    }
}
</script>

<style>

</style>