<template>
    <div>
        <div class="labelRegistro">CREAR UNA NUEVA TAREA</div>
        <div>
            <div id="descriptionHomeWork"><label class="labelRegistro" for="NameC">Descripcion: </label><input class="inputEst" id="DescriptionC" v-model="description" type="text"/></div>
        </div>

    </div>
</template>

<script>
export default {
    data(){
        return{
            description:''
        }
    }
    
}
</script>
<style>

</style>