import React from "react";
import { Link } from "react-router-dom";

export const Menu: React.FC = () => {
    return (
        <>
            <Link to={`single`}>Single player</Link>
            <Link to={`duel/new`}>Two player</Link>
        </>
    )
}