import React, { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import './SideBar.css';

const SideBar = () => {
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
              <li onClick={navigateProduct}>Cat Toys</li>
              <li onClick={navigateProduct}>Cat Food</li>
              <li onClick={navigateProduct}>Cat Toys</li>
              <li onClick={navigateProduct}>Cat Food</li>
              <li onClick={navigateProduct}>Cat Toys</li>
              <li onClick={navigateProduct}>Cat Food</li>
              <li onClick={navigateProduct}>Cat Toys</li>
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
              <li onClick={navigateProduct}>Dog Toys</li>
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
              <li onClick={navigateProduct}>Bird Toys</li>
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
              <li onClick={navigateProduct}>Rabbit Toys</li>
            </ul>
          )}
        </li>

      </ul>
    </div>
  );
};

export default SideBar;
