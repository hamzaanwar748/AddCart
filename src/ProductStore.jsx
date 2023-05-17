import { types, flow } from "mobx-state-tree";
import axios from "axios";

const Product = types.model("data", {
  id: types.number,
  title: types.string,
  price: types.number,
  description: types.string,
  image: types.string,
  quantity: types.number,
});

const RootStore = types
  .model("fetched", {
    products: types.array(Product),
  })
  .actions((self) => ({
    HandleData: flow(function* HandleData() {
      const response = yield axios.get("http://localhost:3009/Api");
      let data = response.data;
      if (!self.products.length) {
        data.map((item) => {
          self.products.push({
            id: item.id,
            title: item.title,
            price: item.price,
            description: item.description,
            image: item.image,
            quantity: item.quantity,
          });
        });
      }
    }),
    quantityIncre(a) {
      self.products = self.products.map((i) => {
        if (i.id == a) {
          i.quantity++;
        }
        return i;
      });
    },
    quantityDicre(a) {
      self.products.map((i) => {
        if (i.id == a) {
          if (i.quantity > 1) {
            i.quantity--;
          }
        }

        return i.quantity;
      });
    },
    HandleQuantity(productID) {
      self.products.map((i) => {
        if (i.id == productID) {
          i.quantity = 1;
        }
        return i;
      });
    },
  }));

const Cart = types
  .model("cart", {
    Addcart: types.array(Product),
  })
  .views((self) => ({
    get totalPrice() {
      let price = 0;
      self.Addcart.map(
        (product) => (price += product.price * product.quantity)
      );
      return price;
    },
  }))

  .actions((self) => ({
    addToCart(i) {
      const res = self.Addcart.find((a) => a.id === i.id);
      if (!res) {
        self.Addcart.push({
          id: i.id,
          title: i.title,
          price: i.price,
          description: i.description,
          image: i.image,
          quantity: i.quantity,
        });
      }
    },
    quantityIncre1(a) {
      self.Addcart = self.Addcart.map((i) => {
        if (i.id === a) {
          i.quantity++;
        }
        return i;
      });
    },
    quantityDicre1(a) {
      self.Addcart.map((i) => {
        if (i.id == a) {
          if (i.quantity > 1) {
            i.quantity--;
          }
        }
        return i.quantity;
      });
    },
    removeProduct(val) {
      self.Addcart.remove(val);
    },
  }));

export const Store = RootStore.create({
  products: [],
});

export const addCartStore = Cart.create({
  Addcart: [],
});
