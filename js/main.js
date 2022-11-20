const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

// класс отвечает за генерацию отдельных товаров
class ProductList {
  #goods;
 

  constructor(container = '.products') {
    this.container = container; // то куда будем выводить товары
    this.#goods = []; // данные с сервера
    this._allProducts = [] // готовые сгенерированные экземпляры товаров

    this.#getProducts().then((data) => {
      console.log(data);
      this.#goods = [...data];
      this._render()
    })

  }

  // _fetchGoods() {
  //   this._goods = [{
  //       id: 1,
  //       title: 'Notebook',
  //       price: 20000
  //     },
  //     {
  //       id: 2,
  //       title: 'Mouse',
  //       price: 1500
  //     },
  //     {
  //       id: 3,
  //       title: 'Keyboard',
  //       price: 5000
  //     },
  //     {
  //       id: 4,
  //       title: 'Gamepad',
  //       price: 4500
  //     },
  //   ];
  // }

  #getProducts() {
    return fetch(`${API}/catalogData.json`)
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      })
  }

  _render() {
    const block = document.querySelector(this.container)

    for (let product of this.#goods) {
      const productObject = new ProductItem(product);

      this._allProducts.push(productObject);

      block.insertAdjacentHTML('beforeend', productObject.getGoodHtml());
    }
  }
}

// класс самого товара
class ProductItem {
  constructor(product, img = 'https://via.placeholder.com/150') {
    this.title = product.product_name
    this.price = product.price
    this.id = product.product_id
    this.img = img
  }

  getGoodHtml() {
    return `<div class="product-item" data-id="${this.id}">
                  <img src="${this.img}" alt="Some img">
                  <div class="desc">
                      <h3>${this.title}</h3>
                       <p>${this.price} \u20bd</p>
                       <button class="buy-btn">Купить</button>
                   </div>
               </div>`
  }

}

new ProductList();

// const products = [
//   {id: 1, title: 'Notebook', price: 20000},
//   {id: 2, title: 'Mouse', price: 1500},
//   {id: 3, title: 'Keyboard', price: 5000},
//   {id: 4, title: 'Gamepad', price: 4500},
// ];
//
// const renderProduct = (item, img='https://placehold.it/200x150') => `<div class="product-item" data-id="${this.id}">
//               <img src="${img}" alt="Some img">
//               <div class="desc">
//                   <h3>${item.title}</h3>
//                   <p>${item.price} \u20bd</p>
//                   <button class="buy-btn">Купить</button>
//               </div>
//           </div>`;
//
// const renderProducts = list => {
// document.querySelector('.products').insertAdjacentHTML('beforeend', list.map(item => renderProduct(item)).join(''));
// };
//
// renderProducts(products);