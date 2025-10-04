import { useContext, useEffect, useState } from "react";
import AppContext from "../../features/context/AppContext";

const initCartState = { cartItems: [] };

export default function Cart() {
  const { request, updateCart, user } = useContext(AppContext);
  const [cart, setCart] = useState(initCartState);
  const [confirmItem, setConfirmItem] = useState();
  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(() => {
    if (user) {
      request("/api/cart")
        .then(data => setCart(data || initCartState))
        .catch(console.error);
    } else {
      setCart(initCartState);
    }
  }, [user]);

  const performDelete = (cartItemId) => {
    if (!cartItemId) return;
    request("/api/cart/" + cartItemId, { method: "DELETE" })
      .then(data => {
        if (data) updateCart();
        else alert("Помилка видалення");
      })
      .catch(console.error)
      .finally(() => setConfirmItem(null));
  };

  const changeQuantity = (cartItemId, delta) => {
    request("/api/cart/" + cartItemId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(delta),
    })
      .then(result => {
        if (result) updateCart();
        else alert("Не вдалося змінити кількість");
      })
      .catch(console.error);
  };

  const performCartAction = () => {
    if (!confirmAction) return;
    if (confirmAction.type === "clear") {
      request("/api/cart/clear", { method: "DELETE" })
        .then(data => {
          if (data) setCart(initCartState);
        })
        .catch(console.error)
        .finally(() => setConfirmAction(null));
    }
    if (confirmAction.type === "buy") {
      request("/api/cart/buy", { method: "DELETE" })
        .then(data => {
          if (data) setCart(initCartState);
        })
        .catch(console.error)
        .finally(() => setConfirmAction(null));
    }
  };

  const totalQuantity = cart.cartItems?.reduce((sum, ci) => sum + ci.quantity, 0) || 0;
  const totalPrice = cart.cartItems?.reduce((sum, ci) => sum + ci.price, 0) || 0;
  const totalItems = cart.cartItems?.length || 0;

  return (
    <>
      <h1 style={{ marginBottom: "1rem" }}>Кошик</h1>
      {!user ? (
        <div style={{ padding: "1rem", backgroundColor: "#f8d7da", color: "#721c24" }}>
          Кошик можна переглянути лише авторизованим користувачам
        </div>
      ) : (
        <div>
          <div style={{ display: "flex", fontWeight: "500", color: "#6c757d", borderBottom: "1px solid #dee2e6", paddingBottom: "0.5rem", marginBottom: "0.5rem" }}>
            <div style={{ flex: 5 }}>Назва</div>
            <div style={{ flex: 1, textAlign: "center" }}>Ціна</div>
            <div style={{ flex: 2, textAlign: "center" }}>Кількість</div>
            <div style={{ flex: 2, textAlign: "center" }}>Вартість</div>
            <div style={{ flex: 1 }}></div>
          </div>

          {cart.cartItems && cart.cartItems.length > 0 ? (
            <>
              {cart.cartItems.map(ci => (
                <div key={ci.id} style={{ display: "flex", alignItems: "center", borderBottom: "1px solid #dee2e6", padding: "0.5rem 0" }}>
                  <div style={{ flex: 5, display: "flex", alignItems: "center" }}>
                    <img src={ci.product.imageUrl} alt={ci.product.name} height={64} style={{ marginRight: "0.5rem" }} />
                    <div>
                      <div style={{ fontWeight: "600" }}>{ci.product.name}</div>
                      <div style={{ fontSize: "0.8rem", color: "#6c757d" }}>{ci.product.description}</div>
                    </div>
                  </div>
                  <div style={{ flex: 1, textAlign: "center" }}>{ci.product.price}</div>
                  <div style={{ flex: 2, textAlign: "center" }}>
                    <button onClick={() => changeQuantity(ci.id, -1)}>-</button>
                    <span style={{ margin: "0 0.5rem" }}>{ci.quantity}</span>
                    <button onClick={() => changeQuantity(ci.id, 1)}>+</button>
                  </div>
                  <div style={{ flex: 2, textAlign: "center" }}>{ci.price}</div>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <button onClick={() => setConfirmItem(ci)}>X</button>
                  </div>
                </div>
              ))}

              <div style={{ display: "flex", fontWeight: "600", borderTop: "2px solid #000", paddingTop: "0.5rem", marginTop: "0.5rem" }}>
                <div style={{ flex: 5 }}>Разом</div>
                <div style={{ flex: 1, textAlign: "center" }}>—</div>
                <div style={{ flex: 2, textAlign: "center" }}>{totalQuantity}</div>
                <div style={{ flex: 2, textAlign: "center" }}>{totalPrice}</div>
                <div style={{ flex: 1 }}></div>
              </div>

              <div style={{ fontSize: "0.8rem", color: "#6c757d", marginTop: "0.5rem" }}>
                <div>Позицій: {totalItems}</div>
                <div>Кількість товарів: {totalQuantity}</div>
                <div>Загальна вартість: {totalPrice}</div>
              </div>

              <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
                <button onClick={() => setConfirmAction({ type: "buy", message: "Ви підтверджуєте покупку всього кошика?" })}
                  style={{ background: "#28a745", color: "#fff", padding: "0.5rem 1rem", border: "none", borderRadius: "4px" }}>
                  Придбати
                </button>
                <button onClick={() => setConfirmAction({ type: "clear", message: "Ви підтверджуєте скасування всього кошика?" })}
                  style={{ background: "#dc3545", color: "#fff", padding: "0.5rem 1rem", border: "none", borderRadius: "4px" }}>
                  Скасувати
                </button>
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "1rem" }}>Кошик порожній</div>
          )}
        </div>
      )}

      {confirmItem && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.2)", display: "flex",
          alignItems: "center", justifyContent: "center"
        }}>
          <div style={{ background: "#fff", padding: "1.5rem", borderRadius: "8px", maxWidth: "400px" }}>
            <h3 style={{ marginBottom: "1rem" }}>Підтвердження</h3>
            <p>Ви підтверджуєте видалення <b>{confirmItem.product.name}</b> з кошику?</p>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
              <button onClick={() => setConfirmItem(null)} style={{ marginRight: "0.5rem" }}>Скасувати</button>
              <button onClick={() => performDelete(confirmItem.id)} style={{ background: "red", color: "white" }}>Видалити</button>
            </div>
          </div>
        </div>
      )}

      {confirmAction && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.2)", display: "flex",
          alignItems: "center", justifyContent: "center"
        }}>
          <div style={{ background: "#fff", padding: "1.5rem", borderRadius: "8px", maxWidth: "400px" }}>
            <h3 style={{ marginBottom: "1rem" }}>Підтвердження</h3>
            <p>{confirmAction.message}</p>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
              <button onClick={() => setConfirmAction(null)} style={{ marginRight: "0.5rem" }}>Скасувати</button>
              <button onClick={performCartAction} style={{ background: "red", color: "white" }}>Підтвердити</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}