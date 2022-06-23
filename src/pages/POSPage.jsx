import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import data from "../data/db.json";
import { toast } from "react-toastify";

function POSPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,
  };

  const fetchProducts = () => {
    setIsLoading(true);
   
    setProducts(data.products);
    setIsLoading(false);
  };

  const addProductToCart = async (product) => {
    let findProductInCart = await cart.find((i) => {
      return i.id === product.id;
    });
    if (findProductInCart) {
      let newCart = [];
      let newItem;

      cart.forEach((cartItem) => {
        if (cartItem.id === product.id) {
          newItem = {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            totalAmount: cartItem.price * (cartItem.quantity + 1),
          };
          newCart.push(newItem);
        } else {
          newCart.push(cartItem);
        }
      });
      setCart(newCart);
      toast("Sepete TL{newItem.name} eklendi", toastOptions);
    } else {
      let addingProduct = {
        ...product,
        quantity: 1,
        totalAmount: product.price,
      };
      setCart([...cart, addingProduct]);
      toast("Sepete TL{product.name} eklendi", toastOptions);
    }
  };
  const removeProduct = async (product) => {
    const newCart = cart.filter((cartItem) => cartItem.id !== product.id);
    setCart(newCart);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let newTotalAmount = 0;
    cart.forEach((icart) => {
      newTotalAmount = newTotalAmount + parseInt(icart.totalAmount);
    });
  });

  return (
    <MainLayout>
      <div className="row" style={{display:"flex",flexDirection:"row"}}>
        <div className="col-lg-8">
          {isLoading ? (
            "Loading"
          ) : (
            <div className="row" >
              {console.log(data.products)}
              {products.map((product, key) => {
                return (
                  <div key={key} className="col-lg-4">
                    <div
                      className="border"
                      style={{display:"flex",flexDirection:"row",justifyContent:"space-evenly"}}
                      onClick={() => addProductToCart(product)}
                    >
                      <p>{product.name}</p>
                      <img
                        src={product.image}
                        className="img-fluid"
                        alt={product.name}
                        style={{width:20,height:20,resize:"cover"}}
                      ></img>
                      <p>TL{product.price}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="col-lg-4">
          <div className="table-responsive bg-dark">
            <table className="table table-responsive table-dark table-hover">
              <thead>
                <tr>
                  <td>#</td>
                  <td>Ürün</td>
                  <td>Adet</td>
                  <td>Fiyat</td>
                  <td>Toplam</td>
                  <td>İşlem</td>
                </tr>
              </thead>
              <tbody>
                {cart
                  ? cart.map((cartProduct, key) => (
                      <tr key={key}>
                        <td>{cartProduct.id}</td>
                        <td>{cartProduct.name}</td>
                        <td>{cartProduct.price}</td>
                        <td>{cartProduct.quantity}</td>
                        <td>{cartProduct.totalAmount}</td>
                        <td>
                          <button className="btn btn-danger btn-sm">Sil</button>
                        </td>
                      </tr>
                    ))
                  : "Sepette Ürün Bulunamadı"}
              </tbody>
            </table>
            <h2 className="px-2 text-white">Toplam Tutar: TL</h2>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default POSPage;