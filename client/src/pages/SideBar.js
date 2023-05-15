import {React, useContext, useState} from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { GlobalContext } from '../Global';
import './SideBar.css';

const SideBar = () => {
  const { globalloggedIn, setglobalLoggedIn, globalemail, setglobalEmail, globalType, setGlobalType, globalSubtype, setGlobalSubtype } = useContext(GlobalContext);

  const navigate = useNavigate();
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [isDogOpen, setIsDogOpen] = useState(false);
  const [isBirdOpen, setIsBirdOpen] = useState(false);
  const [isRabbitOpen, setIsRabbitOpen] = useState(false);

  const navigateProduct = () => {
    navigate('/');
  };

  const toggleCat = () => {
    setIsCatOpen(!isCatOpen);
  };

  const toggleDog = () => {
    setIsDogOpen(!isDogOpen);
  };

  const toggleBird = () => {
    setIsBirdOpen(!isBirdOpen);
  };

  const toggleRabbit = () => {
    setIsRabbitOpen(!isRabbitOpen);
  };

  return (
    <div className="sidebar">
      <ul>
        <li className="sidebar_oneelement">
          <div className="sidberelementname" onClick={toggleCat}>
            Cat{isCatOpen ? <AiOutlineUp className="sidebararrow" /> : <AiOutlineDown className="sidebararrow" />}
          </div>
          {isCatOpen && (
            <ul className="sidebar_sublist">
              <li onClick={navigateProduct}>Cat Food</li>
              <li onClick={navigateProduct}>Cat Care</li>
              <li onClick={navigateProduct}>Cat Accessories</li>
            </ul>
          )}
        </li>
        <hr />
        <li className="sidebar_oneelement">
          <div className="sidberelementname" onClick={toggleDog}>
            Dog{isDogOpen ? <AiOutlineUp className="sidebararrow" /> : <AiOutlineDown className="sidebararrow" />}
          </div>
          {isDogOpen && (
            <ul className="sidebar_sublist">
              <li onClick={navigateProduct}>Dog Food</li>
              <li onClick={navigateProduct}>Dog Care</li>
              <li onClick={navigateProduct}>Dog Accessories</li>
            </ul>
          )}
        </li>
        <hr />
        <li className="sidebar_oneelement">
          <div className="sidberelementname" onClick={toggleBird}>
            Bird{isBirdOpen ? <AiOutlineUp className="sidebararrow" /> : <AiOutlineDown className="sidebararrow" />}
          </div>
          {isBirdOpen && (
            <ul className="sidebar_sublist">
              <li onClick={navigateProduct}>Bird Food</li>
              <li onClick={navigateProduct}>Bird Care</li>
              <li onClick={navigateProduct}>Bird Accessories</li>
            </ul>
          )}
        </li>
        <hr />
        <li className="sidebar_oneelement">
          <div className="sidberelementname" onClick={toggleRabbit}>
            Rabbit{isRabbitOpen ? <AiOutlineUp className="sidebararrow" /> : <AiOutlineDown className="sidebararrow" />}
          </div>
          {isRabbitOpen && (
            <ul className="sidebar_sublist">
              <li onClick={navigateProduct}>Rabbit Food</li>
              <li onClick={navigateProduct}>Care Care</li>
              <li onClick={navigateProduct}>Accessories Accessories</li>
            </ul>
          )}
        </li>

      </ul>
    </div>
  );
};

export default SideBar;
