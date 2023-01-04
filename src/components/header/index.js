import React from 'react';
import { Link } from "react-router-dom";

import logo from '../../assets/images/box.png'

function Header () {
    

  return (
 <header className='header'>
    <div className='h-logo'>
    <img src={logo} width="45px"/>
    <span>Log Book</span>
    </div>
    <div className='top-h'>
    <ul>
    <li><Link to='/dashboard'>Dashboard</Link></li>
    <li><Link to='/write-journal'>Write a Trade</Link></li>
    <li><Link to='/journal-list'>View All Trades</Link></li>
    <li><Link to='/journal-list?type=Backtesting'>View Back Testing Trades</Link></li>
    <li><Link to='/journal-list?type=Realtime'>View Real Time Trades</Link></li>
    </ul>
    </div>
 </header>   
  );
}

export default Header;
