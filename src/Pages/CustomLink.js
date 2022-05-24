import React from 'react';
import { useMatch, useResolvedPath } from 'react-router';
import { Link } from 'react-router-dom';


function CustomLink({ children, to, ...props }) {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
        <div>
            <Link
                style={{ color: match ? "#1eb854" : "white", padding: '2.5px 20px', transition: '.2s' }}
                to={to}
                {...props}
            >
                {children}
            </Link>


        </div >
    );
}

export default CustomLink;