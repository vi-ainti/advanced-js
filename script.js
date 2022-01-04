function getCounter() {
  let last = 0;

  return () => ++last;
}

const stackIDGenrator = getCounter()


class Good {
  constructor({ id, title, price }) {
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

  getGood() {
    return this.good;
  }

  getCount() {
    return this.count;
  }

  getTitle() {
    return this.good.getTitle();
  }

  getPrice() {
    return this.good.getPrice() * this.count;
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
  constructor() {
    this.list = []

    this.view = new CartView('.modal')
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

    if (idx >= 0) {
      this.list[idx].add()
    } else {
      this.list.push(new GoodStack(good))
    }

    this.view.render(this.list)
  }

  remove(id) {
    const idx = this.list.findIndex((stack) => stack.getGoodId() == id)

    if (idx >= 0) {
      this.list[idx].remove()

      if (this.list[idx].getCount() <= 0) {
        this.list.splice(idx, 1)
      }
    }

    this.view.render(this.list)
  }
}

class Showcase {
  constructor(cart) {
    this.list = [];
    this.cart = cart;

    this.view = new ShowcaseView('.goods-list');
  }

  fetchGoods() {
    this.list = [
      new Good({ id: 1, title: 'Футболка', price: 140 }),
      new Good({ id: 2, title: 'Брюки', price: 320 }),
      new Good({ id: 3, title: 'Галстук', price: 24 })
    ]

    this.view.render(this.list)
  }

  addToCart(id) {
    const idx = this.list.findIndex((good) => id == good.id)

    if (idx >= 0) {
      this.cart.add(this.list[idx])
    }
  }
}

class ShowcaseView {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector)
  }
  render(list) {
    this.container.textContent = '';
    const template = list.map((good) => `
    <div class="card"> 
      <h3>${good.getTitle()}</h3> 
      <p>${good.getPrice()}$</p> 
    </div>`).join('');

    this.container.insertAdjacentHTML('afterbegin', template);
  }
}

class CartView {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.closeBtn = this.container.querySelector('#close-btn');
    this.listContainer = this.container.querySelector('.cart-list')

    this.closeBtn.addEventListener('click', this.close.bind(this))
  }
  open() {
    this.container.style.display = 'block'
  }

  close() {
    this.container.style.display = 'none'
  }

  render(list) {
    this.container.textContent = ' ';
    const template = list.map((good) => `
    <div class= "card"> 
      <h3>${good.getTitle()} x${good.getCount()} </h3> 
      <p>${good.getPrice()}$</p> 
    </div>`).join('');

    this.container.insertAdjacentHTML('afterbegin', template);
  }
}

const cart = new Cart()
const showcase = new Showcase(cart)

const cartBtn = document.querySelector('.cart-button');
cartBtn.addEventListener('click', cart.open.bind(cart))

showcase.fetchGoods();

showcase.addToCart(1)
showcase.addToCart(1)
showcase.addToCart(1)
showcase.addToCart(3)

cart.remove(1)


console.log(showcase, cart)