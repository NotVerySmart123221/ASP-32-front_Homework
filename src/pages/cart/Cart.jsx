import { useContext, useEffect, useState } from "react";
import AppContext from "../../features/context/AppContext";

const initCartState = {
    cartItems: []
};

export default function Cart() {
    const [cart, setCart] = useState(initCartState);
    const {request, user} = useContext(AppContext);

    useEffect(() => {
        if(user) {
            request("/api/cart")
            .then(setCart);
        }
        else {
            setCart(initCartState);
        }
    }, [user]);

    return <>
    <h1>Cart</h1>
    {!user ? <>        
        <div className="alert alert-danger" role="alert">
            Кошик можна переглядати тільки після входу в систему
        </div>
    </> : <>
        <div>
            <div className="row">
                <div className="col col-1 offset-1">Товар</div>
                <div className="col col-4"></div>
                <div className="col col-1">Ціна</div>
                <div className="col col-2">Кількість</div>
                <div className="col col-1">Вартість</div>
                <div className="col col-1"></div>
            </div>
            {cart.cartItems.map(ci => <div key={ci.id} className="row border-bottom py-2 mb-2">
                <div className="col col-1 offset-1"><img className="w-100" src={ci.product.imageUrl}/></div>
                <div className="col col-4">{ci.product.name}</div>
                <div className="col col-1">{ci.product.price}</div>
                <div className="col col-2">{ci.quantity}</div>
                <div className="col col-1">{ci.price}</div>
                <div className="col col-1"><i class="bi bi-x-square"></i></div>                
            </div>)}
        </div>
    </>}
    </>;
}
/*
Д.З. На сторінці кошика додати нижній рядок з підсумками
Разом - позицій, кількість товарів, загальна вартість
*/