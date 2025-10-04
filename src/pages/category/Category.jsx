import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import AppContext from "../../features/context/AppContext";

export default function Category() {
    const { slug } = useParams();
    const { cart, request, backUrl, updateCart } = useContext(AppContext);
    const [group, setGroup] = useState({ products: [] });
    const navigate = useNavigate();

    useEffect(() => {
        request("/api/group/" + slug)
            .then(setGroup)
            .catch(_ => {});
    }, [slug]);

    const buyClick = product => {
        // 1. локально обновляем корзину
        if (!cart.cartItems.some(ci => ci.product.id === product.id)) {
            cart.cartItems.push({ product, quantity: 1 });
        } else {
            const ci = cart.cartItems.find(ci => ci.product.id === product.id);
            ci.quantity++;
        }

        // триггерим обновление из контекста
        updateCart();

        // 2. отправляем запрос на сервер
        request("/api/cart/" + product.id, { method: "POST" })
            .then(() => updateCart()) // подтянуть актуальную корзину с сервера
            .catch(console.error);
    };

    return (
        <>
            <h1>Розділ {group.name}</h1>
            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
                {group.products.map(p => (
                    <div key={p.id} className="col">
                        <Link className="nav-link h-100" to={"/product/" + (p.slug || p.id)}>
                            <div className="card h-100">
                                <img src={backUrl + p.imageUrl} className="card-img-top" alt={p.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description}</p>
                                </div>
                                <div className="card-footer d-flex justify-content-between align-items-center">
                                    <span>
                                        <i className="bi bi-eye"></i>
                                        &nbsp;{p.feedbackCount}
                                    </span>

                                    {cart?.cartItems?.some(ci => ci.product.id === p.id) ? (
                                        <button
                                            className="btn btn-success"
                                            onClick={e => {
                                                e.preventDefault();
                                                navigate("/cart");
                                            }}
                                        >
                                            <i className="bi bi-cart-check"></i>
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-outline-success"
                                            onClick={e => {
                                                e.preventDefault();
                                                buyClick(p);
                                            }}
                                        >
                                            <i className="bi bi-cart-plus"></i>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}
