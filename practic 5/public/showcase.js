Vue.component('showcase',
    {
        template: `
            <div class="goods-list">
                <card v-for="item of list" :good="item" v-on:cardaction="onAdd" :actionName="Купить"></card>
            </div>
        `,
        props: ['list'],
        methods: {
            onAdd(id) {
                this.$emit('addtocart', id)
            }
        }

    }
)