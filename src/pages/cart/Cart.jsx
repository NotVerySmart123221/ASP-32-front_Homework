import { useContext, useEffect, useState } from "react";
import AppContext from "../../features/context/AppContext";

const initCartState = {
  cartItems: []
};

export default function Cart() {
  const [cart, setCart] = useState({});
  const { request, user } = useContext(AppContext);

  useEffect(() => {
    if (user) {
      request("/api/cart")
        .then(setCart)
        .catch(console.error);
    } else {
      setCart(initCartState);
    }
  }, [user]);

  const totalQuantity = cart.cartItems?.reduce((sum, ci) => sum + ci.quantity, 0) || 0;
  const totalPrice = cart.cartItems?.reduce((sum, ci) => sum + ci.price, 0) || 0;
  const totalItems = cart.cartItems?.length || 0;

  return (
    <>
      <h1 className="mb-4">Кошик</h1>

      {!user ? (
        <div className="alert alert-danger" role="alert">
          Кошик можна переглянути лише авторизованим користувачам
        </div>
      ) : (
        <div className="cart-container">
          <div className="row fw-light text-secondary border-bottom pb-2 mb-2">
            <div className="col-5 offset-1">Назва</div>
            <div className="col-1 text-center">Ціна</div>
            <div className="col-2 text-center">Кількість</div>
            <div className="col-2 text-center">Вартість</div>
            <div className="col-1"></div>
          </div>

          {cart.cartItems && cart.cartItems.length > 0 ? (
            <>
              {cart.cartItems.map((ci) => (
                <div
                  key={ci.id}
                  className="row align-items-center border-bottom py-2"
                >
                  <div className="col-5 offset-1 d-flex align-items-center">
                    <img
                      src={ci.product.imageUrl}
                      alt={ci.product.name}
                      height={64}
                      className="me-3"
                    />
                    <div>
                      <div className="fw-bold">{ci.product.name}</div>
                      <div className="text-muted small">{ci.product.description}</div>
                    </div>
                  </div>

                  <div className="col-1 text-center">{ci.product.price}</div>

                  <div className="col-2 text-center">{ci.quantity}</div>

                  <div className="col-2 text-center">{ci.price}</div>

                  <div className="col-1 text-center">
                    <i className="bi bi-x-square cursor-pointer"></i>
                  </div>
                </div>
              ))}

              <div className="row fw-bold border-bottom">
                <div className="col-5 offset-1">Разом</div>
                <div className="col-1 text-center">—</div>
                <div className="col-2 text-center">{totalQuantity}</div>
                <div className="col-2 text-center">{totalPrice}</div>
                <div className="col-1"></div>
              </div>

              <div className="row text-secondary small mt-1">
                <div className="row-1 offset-1">Позицій: {totalItems}</div>
                <div className="row-1 offset-1">Кількість товарів: {totalQuantity}</div>
                <div className="row-1 offset-1">Загальна вартість: {totalPrice}</div>
              </div>
            </>
          ) : (
            <div className="text-center py-4">Кошик порожній</div>
          )}
        </div>
      )}
    </>
  );
}