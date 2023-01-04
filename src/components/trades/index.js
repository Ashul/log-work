import React, { useEffect, useState } from 'react';
import { getTrade } from '../../services';
import Header from '../header'
import box from '../../assets/images/logo.png'
import { withRouter } from '../withRouter';


function Trades (props) {
const {router:{location, navigate}} = props
  const [tradesData, setTradesData] = useState();
  const auth = sessionStorage.getItem('userAuth') || '';
  const userAuth = auth && JSON.parse(atob(auth))

const getAllTrades = async(type) =>{
  try{
    const tradeData = await getTrade(userAuth.id, type);
    const tradeDataObj = tradeData.data
  if(tradeDataObj){
    setTradesData(tradeDataObj)
  }
} catch(e) {
  console.log(e);
}}

  
useEffect( () => {
 const auth = sessionStorage.getItem('userAuth') || '';
const tradetype = location.search.split('=') || '';
     if (!auth) {
      navigate("/")
     } else {
  getAllTrades(tradetype[1]);
     }
  }, []);


  
  return (
    <div id='dashboard'>
              <Header />

    <div className='container'>

      <div className='top-section'>
        <div className='heading'>
            <img src={box} width="30px"/>
            <span className='al-trdes'>All Trades</span></div>
                                                    
        {tradesData && tradesData.map((item) =>(
                    <ul>

        <li>
        <span><b className='b-dark'>{item.tradename}</b></span> 
            <span><b className='b-dark li-span'>{item.tradetype}</b></span></li>
        <li className='li-time'>
        <span><b className='b-dark'>Day</b> - {item.day} </span>
        <span><b className='b-dark li-span'>Entry Time</b> - {item.entrytime} </span>
        <span><b className='b-dark li-span'>Exit Time</b> - {item.exittime}</span></li>
        <li className='li-time'>
        <span><b className='b-dark'>Entry Price</b> - {item.entryprice}</span>
        <span><b className='b-dark li-span'>Exit price</b>- {item.exitprice}</span></li>
        <li>{item.details}</li>

        </ul>
        ))
        
        }
      

      </div>
      


    </div>
    </div>
  );
}

export default withRouter(Trades);
