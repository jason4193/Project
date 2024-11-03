import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const location = useLocation();
    const username = location.state?.username;
    const id = location.state?.id;
    const [flag, setFlag] = React.useState('');
  
    const handleLogout = () => {
      navigate('/');
    };

    
    useEffect(() => {
        const fetchTheFlag = async () => {
            const response = await fetch(`http://localhost:3001/flag/${id}`);
            if (response.ok) {
                let data = await response.text();
                setFlag(data);
            }
        }
        fetchTheFlag();
      }, [id]);

    return (
      <div className="App">
        <h2>Welcome, {username}</h2>
        <p>{flag}</p>
        <div className='logout'>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    );
  }
export default Home;