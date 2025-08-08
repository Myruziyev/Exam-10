import "../App.css";
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.clear();
    
    navigate('/login');
    console.log('User logged out successfully');
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <a href="/home">X store</a>
          </div>
          <nav>
            <ul className="nav-links">
              <li><a href="/home">Home</a></li>
              <li><a href="/about">About us</a></li>
              <li>
                <button 
                  className="logout-btn" 
                  onClick={handleLogout}
                  aria-label="Log out"
                >
                  Log out
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;