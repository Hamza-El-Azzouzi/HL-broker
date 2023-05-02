import NavBar from "../includes/NavBar";
import './HomeVendeur.css'
import ShowArticle from "./comp/ShowArticle";
import { Button } from 'antd';




export default function HomeVendeur() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <NavBar />
            </nav>

            <div className="table">
            
            <Button type="primary" shape="round" size="large"><a href="/AddArticle" className="bi bi-plus-circle"> Primary Button</a></Button>
                <ShowArticle />
            </div>

        </>
    )
}