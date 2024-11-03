import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';

function Navi() {
    const isLogin = Cookie.get('session') !== undefined;
    const navigate = useNavigate();

  const handleLogout = () => {
    Cookie.remove('session');
    navigate('/');
  };

    return (
        <div>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <div>
                        {isLogin && <li><a href="/AddBlog">Add Blog</a></li>}
                        {!isLogin && <li><a href="/login">Login</a></li>}
                        {isLogin && <li><button onClick={handleLogout}>Logout</button></li>}
                    </div>
                </ul>
            </nav>
        </div>  
    )
}

export default Navi;