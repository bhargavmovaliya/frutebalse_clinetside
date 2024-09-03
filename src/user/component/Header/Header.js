import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../../Context/ThemeContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { getData } from '../../../redux/action/category.action';
import { getProducts } from '../../../redux/action/products.action';
import { getSubData } from '../../../redux/slice/subCategory.slice';
import { logout } from '../../../redux/slice/AuthForm.slice';

function Header(props) {
    const cart = useSelector(state => state.cart);
    console.log(cart);

    const dispatch = useDispatch();
    const [subcat, setSubcat] = useState([]);

    // Ensure initialization of state as empty arrays
    const categories = useSelector((state) => state.categories.categories || []);
    const subcategories = useSelector((state) => state.subcategories.subcategories || []);
    const products = useSelector((state) => state.products.products || []);

    const { isAuthentication, user } = useSelector((state) => state.auth);

    const hendlelogout = () => {
        dispatch(logout(user._id))
    }
    const totalQtyData = cart.cart.reduce((acc, v) => acc + v.qty, 0);

    const themeContext = useContext(ThemeContext);
    console.log(themeContext);

    const handleTheme = () => {
        themeContext.toggleTheme(themeContext.theme);
    };

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getData());
        dispatch(getProducts());
        dispatch(getSubData());
    }, [dispatch]);

    const handleCategory = (category_id) => {
        console.log(category_id);
        const subdata = subcategories.filter((v) => v.category_id === category_id);
        setSubcat(subdata);
    };

    const handleDisplay = (subcategory_id) => {
        console.log(subcategory_id);
        const pdata = products.filter((v) => v.subcategory_id === subcategory_id);
        console.log(pdata);
        navigate('/Shop', { state: { subcategory_id } });
    };

    return (
        <div>
            {/* Navbar start */}
            <div className={`container-fluid fixed-top ${themeContext.theme}`}>
                <div className="container topbar bg-primary d-none d-lg-block">
                    <div className="d-flex justify-content-between">
                        <div className="top-info ps-2">
                            <small className="me-3">
                                <i className="fas fa-map-marker-alt me-2 text-secondary" />
                                <a href="#" className="text-white">123 Street, New York</a>
                            </small>
                            <small className="me-3">
                                <i className="fas fa-envelope me-2 text-secondary" />
                                <a href="#" className="text-white">Email@Example.com</a>
                            </small>
                        </div>
                        <div className="top-link pe-2">
                            <a href="#" className="text-white">
                                <small className="text-white mx-2">Privacy Policy</small>/
                            </a>
                            <a href="#" className="text-white">
                                <small className="text-white mx-2">Terms of Use</small>/
                            </a>
                            <a href="#" className="text-white">
                                <small className="text-white ms-2">Sales and Refunds</small>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="container px-0">
                    <nav className="navbar navbar-expand-xl">
                        <a href="index.html" className="navbar-brand">
                            <h1 className="text-primary display-6">Fruitables</h1>
                        </a>
                        <button className="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                            <span className="fa fa-bars text-primary" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <div className="navbar-nav mx-auto">
                                <NavLink to='/' className="nav-item nav-link active">Home</NavLink>
                                <NavLink to='/Shop' className="nav-item nav-link">Shop</NavLink>
                                <NavLink to='/chart' className="nav-item nav-link">Chart</NavLink>
                                <NavLink to='/Shop_Detail' className="nav-item nav-link">Shop Detail</NavLink>
                                <div className="nav-item dropdown">
                                    <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                                    <div className="dropdown-menu m-0 bg-secondary rounded-0">
                                        <NavLink to='/Cart' className="dropdown-item">Cart</NavLink>
                                        <NavLink to='/Review' className="dropdown-item">Review</NavLink>
                                        <NavLink to='/Chackout' className="dropdown-item">Chackout</NavLink>
                                        <NavLink to='/Testimonial' className="dropdown-item">Testimonial</NavLink>
                                        <NavLink to='/Page' className="dropdown-item">404 Page</NavLink>
                                    </div>
                                </div>
                                <div className="nav-item dropdown main">
                                    <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Products</a>
                                    <div className="dropdown-menu m-0 bg-secondary rounded-0">
                                        {categories.length > 0 ? categories.map((v) => (
                                            <a href="#" key={v._id} onMouseMove={() => handleCategory(v._id)} onClick={() => handleCategory(v._id)} className="dropdown-item">{v.name}</a>
                                        )) : <div>No categories available</div>}
                                    </div>
                                    <div className="dropdown-menu m-0 bg-secondary rounded-0">
                                        {subcat.length > 0 ? subcat.map((v) => (
                                            <a href="#" key={v._id} onClick={() => handleDisplay(v._id)} className="dropdown-item">{v.name}</a>
                                        )) : <div>No subcategories available</div>}
                                    </div>
                                </div>
                                <NavLink to='/Contact' className="nav-item nav-link">Contact</NavLink>
                            </div>
                            <div className="d-flex m-3 me-0">
                                <button className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4" data-bs-toggle="modal" data-bs-target="#searchModal">
                                    <i className="fas fa-search text-primary" />
                                </button>
                                <NavLink to='/Cart' className="position-relative me-4 my-auto">
                                    <i className="fa fa-shopping-bag fa-2x" />
                                    <span
                                        className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                                        style={{ top: '-5px', left: 15, height: 20, minWidth: 20 }}
                                    >
                                        {totalQtyData}
                                    </span>
                                </NavLink>
                                {
                                    isAuthentication ? <button onClick={hendlelogout}>logout</button> : <NavLink to={`/AuthForm`} className="fas fa-user fa-2x" />

                                }



                            </div>
                            {themeContext.theme === 'light' ? <LightModeIcon onClick={handleTheme} /> : <DarkModeIcon onClick={handleTheme} />}
                        </div>
                    </nav>
                </div>
            </div>
            {/* Navbar End */}
            {/* Modal Search Start */}
            <div className="modal fade" id="searchModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content rounded-0">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Search by keyword</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body d-flex align-items-center">
                            <div className="input-group w-75 mx-auto d-flex">
                                <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                                <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search" /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal Search End */}
        </div>
    );
}

export default Header;
