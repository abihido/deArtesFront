<template>
    <div>
        <div id="publicacionesCartelera">
        <publicacion class="publicacionx" v-bind:rol="1"></publicacion>
        <div id="newPubButtom" v-if="this.$store.state.rol=='adm'" v-on:click="edit()">Modificar Publicaciones</div> 
        </div>
    </div>
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
import Publicacion from './publicacion.vue';
export default {
    methods:{
        edit(){
            this.$store.commit('setPage',5);
        }
    },
    components:{
        Publicacion
    }
}
</script>

<style>
    #publicacionesCartelera{
        display: flex;
        flex-flow: column;
        margin-bottom:2vw;
        margin-top: 2vw;
        align-items: center;
    }
    .publicacionx{
        width: 20vw;
        height: 30vw;

    }
    #newPubButtom{
    border: 2px solid white;
    border-radius: 10px;
    background-color: #49006E;
    color: white;
    font-family: "Arista 2.0";
    font-size: 1.5vw;
    height: 2.5vw;
    width: 23vw;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-self: center;
    margin-top: 1vw;
}
</style>