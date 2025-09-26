import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AppContext from "../../features/context/AppContext";

export default function Category() {
    const {slug} = useParams();
    const {request, backUrl} = useContext(AppContext);
    const [group, setGroup] = useState({products:[]});

    useEffect(() => {
        request("/api/group/" + slug)
        .then(setGroup)
        .catch(_ => {});
    }, [slug]);

    const buyClick = e => {
        e.stopPropagation();
        e.preventDefault();
        request("/api/cart/6aebf81f-33f0-4f88-a6ca-43e881e34214",{
            method: 'POST'
        })
        .then(console.log)
        .catch(console.error);
    };

    return <>
        <h1>Розділ {group.name}</h1>
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
            {group.products.map(p => <div key={p.id} className="col" >
                <Link className="nav-link h-100" to={"/product/" + (p.slug || p.id)}>
                    <div className="card h-100">
                        <img src={backUrl + p.imageUrl} className="card-img-top" alt={p.name}/>
                        <div className="card-body">
                            <h5 className="card-title">{p.name}</h5>
                            <p className="card-text">{p.description}</p>
                        </div>
                        <div className="card-footer d-flex justify-content-between align-items-center">
                            <span>
                                <i class="bi bi-eye"></i>
                                &nbsp;
                                {p.feedbackCount}
                            </span>
                            <button className="btn btn-outline-success" onClick={buyClick}>
                                <i className="bi bi-cart-plus"></i>
                            </button>
                        </div>
                    </div>
                </Link>
            </div>)}
        </div>
    </>;
}