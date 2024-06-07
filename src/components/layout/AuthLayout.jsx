import React, {useEffect} from 'react';
import {Outlet} from "react-router-dom";
import {LS} from "../../helpers/security";

const AuthLayout = () => {

const isLogged = LS.get('token');

    useEffect(() => {
        if (!isLogged) {
            window.location.href = '/login';
        }
    }, []);
    return (
        <div>

            <Outlet/>
        </div>
    );
};

export default AuthLayout;