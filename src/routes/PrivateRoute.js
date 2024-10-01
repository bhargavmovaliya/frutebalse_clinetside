import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { checkAuth } from '../redux/slice/AuthForm.slice';

function PrivateRoute(props) {
    const { isAuthentication } = useSelector((state) => state.auth);

    const [loding, setLoding] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const checkAuthState = async () => {
            try {
             await dispatch(checkAuth())
            } catch (error) {
                 navigate('/authform')
            } finally {
                setLoding(false)
            }
        }
        checkAuthState()
    }, [dispatch, navigate])

    // return (
    //     isAuthentication ? <Outlet /> : <Navigate to={"/AuthForm"} replace/>
    // );
}

export default PrivateRoute;