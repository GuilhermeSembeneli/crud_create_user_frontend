import React from "react";
import { useSelector } from "react-redux";
import { RouteProps as ReactDOMRouteProps,   Route as ReactDOMRoute, Redirect } from "react-router-dom";
import { IRedux } from "../interface/Users";
import { getToken } from "../services/Auth";

interface RouteProps extends ReactDOMRouteProps {
    isPrivate?: boolean
    component: React.ComponentType
}

export const Route: React.FC<RouteProps> = ({
    isPrivate = false,
    component: Component,
    ...rest
}) => {
    const selector = useSelector((state: IRedux) => state.data);
    const token = getToken();
    const verify = selector ? selector.token === token : false;
    
    return (
        <ReactDOMRoute
        {...rest}
        render={() => {
            if (isPrivate && !verify) {
                return (
                    <Redirect to={{
                        pathname: '/login'
                    }}/>
                )
            } else {
                return <Component/>
            }
        }}/>
    )
}