import { Outlet } from "react-router-dom";
import './ui/Layout.css';

export default function Layout() {
    return <>
    <header> 
        <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
            <div className="container-fluid">
                <a className="navbar-brand" asp-area="" asp-controller="Home" asp-action="Index">ASP_32</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                    <ul className="navbar-nav flex-grow-1">
                        <li className="nav-item">
                            <a className="nav-link text-dark" asp-area="" asp-controller="Home" asp-action="Index">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark" asp-area="" asp-controller="Home" asp-action="Privacy">Privacy</a>
                        </li>
                    </ul>
                    
                        <div>
                            
                            <button type="button" className="btn btn-outline-secondary"
                                    data-bs-toggle="modal" data-bs-target="#authModal">
                                <i className="bi bi-box-arrow-in-right"></i>
                            </button>
                        </div>       

                </div>
            </div>
        </nav>
    </header>

    <main className="container">
        <Outlet/>
    </main>

    <footer className="border-top footer text-muted py-2">
        <div className="container">
            &copy; 2025 - ASP_32 - Frontend
        </div>
    </footer>

    <div className="modal fade" id="authModal" tabIndex="-1" aria-labelledby="authModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="authModalLabel">Вхід у систему</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form id="auth-form">
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="user-login"><i className="bi bi-key"></i></span>
                            <input name="user-login" type="text" className="form-control" placeholder="Логін" 
                                aria-label="User Login" aria-describedby="user-login"/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="user-password"><i className="bi bi-lock"></i></span>
                            <input name="user-password" type="password" className="form-control" placeholder="Пароль"
                                aria-label="User Password" aria-describedby="user-password"/>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Скасувати</button>
                    <button type="submit" form="auth-form" className="btn btn-primary">Вхід</button>
                </div>
            </div>
        </div>
    </div>
    </>;
}