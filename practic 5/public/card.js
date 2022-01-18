Vue.component('card',
    {
        template: `
            <div class="card">
                <h3>{{good.title}}</h3>
                <p>{{good.price}}</p>
                <button v-on:click="onClick">{{actionName}}</button>
            </div>
            `,
        props: ['good', 'actionName'],
        methods: {
            onClick() {
                this.$emit('cardaction', this.good.id)
            }
        }
    })