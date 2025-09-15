import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default  function Home() {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        fetch("https://localhost:7278/api/group")
        .then(r => r.json())
        .then(setGroups);
    }, []);

    return <>        
        <div className="text-center">
            <h1 className="display-4">Крамниця</h1>
        </div>
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
            {groups.map(group => <div key={group.id} className="col">
                <Link className="nav-link h-100" to="Category" asp-route-id={group.slug}>
                    <div className="card h-100">
                        <img src={"https://localhost:7278/Storage/Item/" + group.imageUrl} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{group.name}</h5>
                            <p className="card-text">{group.description}</p>
                        </div>
                        <div className="card-footer bg-transparent">Товарів: --</div>
                    </div>
                </Link>
            </div>)}
        </div>
    </>;
}
/*
Додати до власного курсового проєкту фронтенд. 
Налаштувати взаємодію з бекендом, зокрема CORS
Імплементувати стартову сторінку. 
Прикласти посилання на репозиторій фронтенду
*/