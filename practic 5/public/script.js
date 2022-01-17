const API_URL = 'http://localhost:3000/api/v1'


function getCounter() {
  let last = 0;

  return () => ++last;
}

const stackIDGenrator = getCounter()


class Good {
  constructor({id, title, price}) {
    this.id = id;
    this.title = title;
    this.price = price;
  }

  getId() {
    return this.id;
  }

  getPrice() {
    return this.price;
  }

  getTitle() {
    return this.title;
  }
}

class GoodStack {
  constructor(good) {
    this.id = stackIDGenrator();
    this.good = good;
    this.count = 1;
  }

  getGoodId() {
    return this.good.id
  }

  getGood(){
    return this.good;
  }

  getCount() {
    return this.count;
  }

  getTitle() {
    return this.good.getTitle()
  }

  getPrice() {
    return this.good.getPrice() * this.count
  }

  add() {
    this.count++;
    return this.count;
  }

  remove() {
    this.count--;
    return this.count;
  }
}

class Cart {
  constructor(){
    this.list = []

    this.view = new CartView('.modal')
    this.view.setRemoveClickHandler(this.remove.bind(this))
  }

  fetchGoods() {
    fetch(`${API_URL}/cart`)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        data.map((item) => this.add(new Good(item)));
      })
  }

  open() {
    this.view.render(this.list)
    this.view.open()
  }

  close() {
    this.view.close()
  }

  add(good) {
    const idx = this.list.findIndex((stack) => stack.getGoodId() == good.id)

    if(idx >= 0) {
      this.list[idx].add()
    } else {
      this.list.push(new GoodStack(good))
    }

    this.view.render(this.list)
  }

  remove(id) {
    const idx = this.list.findIndex((stack) => stack.getGoodId() == id)

    if(idx >= 0) {
      fetch(`${API_URL}/cart`, {
        method: "DELETE",
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(this.list[idx].getGood())
      })
      .then((res) => {

          console.log(this.list[idx])

          this.list[idx].remove()

          if(this.list[idx].getCount() <= 0) {
            this.list.splice(idx, 1)
          }

          this.view.render(this.list)

      }) 
    } 

    this.view.render(this.list)

  }
}

class Showcase {
  constructor(cart){

    this.list = [];
    this.filtered = [];
    this.cart = cart;

    this.view = new ShowcaseView('.goods-list')

    this.searchInput = document.querySelector('#search-input')
    this.searchButton = document.querySelector('#search-btn')

    this.searchButton.addEventListener('click', this.filter)

    this.view.setBuyClickHandler(this.addToCart.bind(this))
  }

  filter() {
    const search = new RegExp(this.searchInput.value, 'i')
    this.filtered = this.list.filter((good) => search.test(good.title))

    this.view.render(this.filtered)
  }

  fetchGoods() {
    fetch(`${API_URL}/showcase`)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        this.list = data.map((item) => new Good(item));
        this.filtered = this.list

        this.view.render(this.filtered)
      })
  }

  addToCart(id) {
    const idx = this.list.findIndex((good) => id == good.id)

    if(idx >= 0) {
      fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(this.list[idx])
      })
      .then((res) => {
        if(res.status === 201) {
          this.cart.add(this.list[idx])
        }
      }) 
    }
  }
}

class ShowcaseView {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector)
  }

  setBuyClickHandler(callback) {
    this.container.addEventListener('click', (e) => {
      if(e.target.tagName === "BUTTON") {
        const id = e.target.dataset.id;

        callback(id);
      }
    })
  }

  render(list) {
    this.container.textContent = '';

    const template = list.map((good) => `
      <div class="card">
        <h3>${good.getTitle()}</h3>
        <p>${good.getPrice()} $</p>
        <button data-id="${good.id}">Купить</button>
      </div>
    `).join('');

    this.container.insertAdjacentHTML('afterbegin', template);
  }
}

class CartView {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector)
    this.closeBtn = this.container.querySelector('#close-btn')
    this.listContainer = this.container.querySelector('.cart-list')

    this.closeBtn.addEventListener('click', this.close.bind(this))
  }

  open() {
    this.container.style.display = 'block'
  }

  close() {
    this.container.style.display = 'none'
  }

  setRemoveClickHandler(callback) {
    this.container.addEventListener('click', (e) => {
      console.log(e.target)
      if(e.target.tagName === "BUTTON") {
        console.log(e.target.dataset.id)
        const id = e.target.dataset.id;

        callback(id);
      }
    })
  }

  render(list) {
    this.listContainer.textContent = '';

    const template = list.map((good) => `
      <div class="card">
        <h3>${good.getTitle()} x${good.getCount()}</h3>
        <p>${good.getPrice()} $</p>
        <button data-id="${good.id}">Удалить</button>
      </div>
    `).join('');

    this.listContainer.insertAdjacentHTML('afterbegin', template);
  }
}


const cart = new Cart()
const showcase = new Showcase(cart)

const cartBtn = document.querySelector('.cart-button')

cartBtn.addEventListener('click', cart.open.bind(cart))

cart.fetchGoods();
showcase.fetchGoods();

