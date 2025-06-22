import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import { assets } from '../assets/assets';
import axios from 'axios';
import Swal from 'sweetalert2';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';

const Navbar = ({ handleOpen }) => {
  const menus = [
    { name: 'Home', link: '/' },
    { name: 'Menu', link: '/menu' },
    { name: 'About', link: '/about' },
  ];

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [profile, setProfile] = useState(null);
  const [toggle, setToggle] = useState(false);

  const { cartItems, setCartItems, token, setToken } = useContext(StoreContext);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('https://food-delivery-4z3h.onrender.com/api/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setProfile(response.data.data);
      } else {
        alert('Error fetching profile');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProfile();
      setToggle(false);
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setCartItems({});
    Swal.fire('Logged Out', 'You have been logged out', 'success');
    navigate('/');
  };

  return (
    <div className="main-container flex justify-between py-5 items-center">
      {/* Logo */}
      <div className="logo cursor-pointer" onClick={() => navigate('/')}>
        <p className="text-3xl font-bold flex items-center gap-1">
          <DinnerDiningIcon className="text-yellow-600" fontSize="large" />
          <span className="text-yellow-600">Spice</span>Inn
        </p>
      </div>

      {/* Menus */}
      <div className="menus hidden md:block">
        <ul className="flex gap-5 text-[#49557e] text-lg">
          {menus.map((menu, index) => (
            <li
              key={index}
              className={`text-lg cursor-pointer ${
                currentPath === menu.link ? 'border-b-2 border-[#49557e]' : ''
              }`}
              onClick={() => navigate(menu.link)}
            >
              {menu.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Section */}
      <div className="navbar-right flex gap-4 items-center">
        {/* Cart */}
        <div className="relative cursor-pointer" onClick={() => navigate('/cart')}>
          <img src={assets.basket_icon} alt="cart" className="h-7" />
          <div
            className={`dot rounded-full bg-[tomato] w-2 absolute top-0 right-0 p-1 ${
              Object.keys(cartItems).length < 1 ? 'hidden' : ''
            }`}
          ></div>
        </div>

        {/* Profile or Sign In */}
        <div>
          {token ? (
            <div className="relative cursor-pointer">
              <img
                src={assets.profile_icon}
                alt="profile"
                className="rounded-full"
                onClick={() => setToggle(!toggle)}
              />
              {toggle && (
                <div className="min-w-[200px] right-0 mt-2 p-3 absolute top-full bg-gray-100 shadow-2xl z-50 rounded-xl flex flex-col items-center gap-2">
                  <p className="font-semibold">{profile?.name}</p>
                  <button onClick={() => navigate('/myorders')}>Orders</button>
                  <button
                    className="bg-black text-white hover:bg-red-500 w-full rounded-2xl"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleOpen}
              className="text-[#49557e] rounded-3xl px-7 hover:bg-[tomato] hover:cursor-pointer hover:text-white text-lg py-1 border-2 border-[tomato]"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
