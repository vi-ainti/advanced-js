Vue.component('cart',
    {
        template: `
            <div class="modal">
                <button v-on:click="onClick">close</button>
                <div class="cart-list">
                <card v-for="item of list" :good="item" v-on:cardaction="onRemove" :actionName="Удалить"></card>
                </div>
            </div>
        `,
        props: ['list'],
        methods: {
            onclick() {
                this.$emit('cart-close')
            },
            onRemove(id) {
                this.$emit('removeFromCart', id)
            }
        }

    }
)