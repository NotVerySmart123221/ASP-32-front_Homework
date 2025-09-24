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

    return <>
        <h1>Розділ {group.name}</h1>
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
            {group.products.map(p => <div key={p.id} className="col" >
                <Link class="nav-link h-100" to={"/product/" + (p.slug || p.id)}>
                    <div class="card h-100">
                        <img src={backUrl + p.imageUrl} className="card-img-top" alt={p.name}/>
                        <div className="card-body">
                            <h5 className="card-title">{p.name}</h5>
                            <p className="card-text">{p.description}</p>
                        </div>
                        <div className="card-footer">
                            Card footer
                        </div>
                    </div>
                </Link>
            </div>)}
        </div>
    </>;
}