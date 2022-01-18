const API_URL = 'http://localhost:3000/api/v1'

new Vue({
    el: "#app",
    data: {
        showcase: [],
        cart: [],
        isCartVisible: false
    },
    methods: {
        onCartOpen() {
            this.isCartVisible = !this.isCartVisible
        },
        onAddToCart() {
            const product = this.showcase.find((good) => good.id == id)
            fetch(`${API_URL}/cart`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(product)
            })
                .then(() => {
                    this.cart.push(product)
                })
        },
        onRemoveFromCart(id) {
            const product_id = this.cart.findIndex((good) => good.id == id)
            fetch(`${API_URL}/cart`, {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.cart[product_id])
            })
                .then(() => {
                    this.cart.splice(product_id, 1)
                })
        }
    },
    mounted() {
        fetch(`${API_URL}/showcase`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                this.showcase = data
            })

        fetch(`${API_URL}/cart`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                this.cart = data
            })
    }
})