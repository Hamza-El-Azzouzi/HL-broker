
import { Link } from 'react-router-dom';
export default function VendeurNav(){
    return (
            <div className='VendeurNav'>
                <div className='box f_flex'>
                    <Link to='/HomeVendeur'> <span>Dashboard</span></Link>
                </div>
                <div className='box f_flex'>
                    <Link to='/HomeVendeur/Demande'> <span>Demande</span></Link>
                </div>
                <div className='box f_flex'>
                    <Link to='/HomeVendeur/Article'> <span>Article</span></Link>
                </div>
            </div>
    )
}