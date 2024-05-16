<template>
    <i :class="`material-icons ${clase}`" :style="estilo" >{{i}}</i>
</template>
<script>
export default {
    data()
    {
        return {
        };
    },
    props:  [    
        'icono',
        'left',
        'right',
        'down',
        'up',
        'clase',
        'estilo',
    ],
    computed:{
        i(){
            if(this.left) return 'keyboard_arrow_left';
            if(this.right) return 'keyboard_arrow_right';
            if(this.down) return 'keyboard_arrow_down';
            if(this.up) return 'keyboard_arrow_up';
            if(!this.icono) return 'add';
            return this.icono;
        }
    },
    created() {
    },
    methods:{
    },
}
</script>