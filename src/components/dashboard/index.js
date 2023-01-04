import React, { useEffect, useState } from 'react';
import { getTrade } from '../../services';
import { Link } from "react-router-dom";
import logo from '../../assets/images/box.png'
import user from '../../assets/images/user.png'
import grow from '../../assets/images/grow.png'
import { withRouter } from '../withRouter';


function Dashboard (props) {
  const [tradesData, setTradesData] = useState();
  const auth = sessionStorage.getItem('userAuth') || '';
  const userAuth = auth && JSON.parse(atob(auth))
  const {router} = props

const getAllTrades = async() =>{
  
  try{
  const tradeData = await getTrade(userAuth.id);
  const tradeDataObj = tradeData.data
  if(tradeDataObj){
    setTradesData(tradeDataObj)
  }
} catch(e) {
  console.log(e);
}}

  
useEffect( () => {
     if (!auth) {
      router.navigate("/")
     } else {
      getAllTrades();

     }
  }, []);

const getAllProfitTrade = () =>{
  const profitTrade = [];
  tradesData && tradesData.map((item) => {
    if(item.tradestatus === 'profit'){
      profitTrade.push(item) 
    }
  })
  return profitTrade
}

const getAllLossTrade = () =>{
  const lossTrade = [];
  tradesData && tradesData.map((item) => {
    if(item.tradestatus !== 'profit'){
      lossTrade.push(item) 
    }
  })
  return lossTrade
}

const getAllBacktestingTrade = () =>{
  const backtestingTrade = [];
  tradesData && tradesData.map((item) => {
    if(item.tradetype === 'Backtesting'){
      backtestingTrade.push(item) 
    }
  })
  return backtestingTrade
}

const getAllRealtimeTrade = () =>{
  const realtimeTrade = [];
  tradesData && tradesData.map((item) => {
    if(item.tradetype === 'Realtime'){
      realtimeTrade.push(item) 
    }
  })
  return realtimeTrade
}

const getAllBacktestingProfitTrade = () =>{
  const profitTrade = [];
  tradesData && tradesData.map((item) => {
    if(item.tradetype === 'Backtesting' && item.tradestatus === 'profit'){
      profitTrade.push(item) 
    }
  })
  return profitTrade
}

const getAllBacktestingLossTrade = () =>{
  const lossTrade = [];
  tradesData && tradesData.map((item) => {
    if(item.tradetype === 'Backtesting' && item.tradestatus !== 'profit'){
      lossTrade.push(item) 
    }
  })
  return lossTrade
}

const getAllRealtimeProfitTrade = () =>{
  const profitTrade = [];
  tradesData && tradesData.map((item) => {
    if(item.tradetype === 'Realtime' && item.tradestatus === 'profit'){
      profitTrade.push(item) 
    }
  })
  return profitTrade
}

const getAllRealtimeLossTrade = () =>{
  const lossTrade = [];
  tradesData && tradesData.map((item) => {
    if(item.tradetype === 'Realtime' && item.tradestatus !== 'profit'){
      lossTrade.push(item) 
    }
  })
  return lossTrade
}

const getAllProfitorLoss = () =>{
  let entryprice = tradesData.reduce((total, item) => {
    return total + parseInt(item.entryprice);
}, 0);
let exitprice = tradesData.reduce((total, item) => {
  return total + parseInt(item.exitprice);
}, 0);
  return  parseInt(exitprice) - parseInt(entryprice)
}

const getAllBackTestingProfitorLoss = (data) =>{
  let entryprice = data.reduce((total, item) => {
    return total + parseInt(item.entryprice);
}, 0);
let exitprice = data.reduce((total, item) => {
  return total + parseInt(item.exitprice);
}, 0);
  return  parseInt(exitprice) - parseInt(entryprice)
}

const getAllRealtimeProfitorLoss = (data) =>{
  let entryprice = data.reduce((total, item) => {
    return total + parseInt(item.entryprice);
}, 0);
let exitprice = data.reduce((total, item) => {
  return total + parseInt(item.exitprice);
}, 0);
  return  parseInt(exitprice) - parseInt(entryprice)
}

const getProfitorLossPercent = (data) =>{
  let entryprice = data.reduce((total, item) => {
    return total + parseInt(item.entryprice);
}, 0);
let exitprice = data.reduce((total, item) => {
  return total + parseInt(item.exitprice);
}, 0);
  return  Math.round( parseInt(exitprice) * 100 / parseInt(entryprice))
}

const signout = () =>{
sessionStorage.removeItem('userAuth');
router.navigate("/")

}


  return (
    <div id='dashboard'>
    <div className='fluid-container'>
    <div className='left-container'>
    <div className='h-logo'>
    <img src={logo} width="55px"/>
    <span>Log Book</span>
    </div>
    <div className='left-ul'>
    <ul>
    <li><Link to='/write-journal'>Write a Trade</Link></li>
    <li><Link to='/journal-list'>View All Trades</Link></li>
    <li><Link to='/journal-list?type=Backtesting'>View Back Testing Trades</Link></li>
    <li><Link to='/journal-list?type=Realtime'>View Real Time Trades</Link></li>
    </ul>
    </div>
    </div>
    <div className='right-container'>
      <header className='header'>
        <div className='top-h'>
        
        </div>
        <div className='h-user'>    
          <p><img src={user} width="25px"/>
        <span>{userAuth.name}</span>
    </p>
        <p onClick={() => signout()}>signout</p>
        </div>
      </header>
      <div className='top-section'>
      <div className='top-box box1'>
        <div className='heading'>Total Trades</div>
        {tradesData && (
          <>
        <span> {tradesData.length} </span>
        <div className='box-sec'>
          <div className='item1'>Profitable Trades - {getAllProfitTrade().length}</div>
          <div className='item1'>Loss Trades - {getAllLossTrade().length}</div>

        </div>
        <p><Link to='/journal-list'>View All</Link></p>
        </>
        )
        }
      </div>
      <div className='top-box box1 box2'>
      <div className='heading'>Back Testing Trades</div>
      {tradesData && (
          <>
        <span> {getAllBacktestingTrade().length} </span>
        <div className='box-sec'>
          <div className='item1'>Profitable Trades - {getAllBacktestingProfitTrade().length}</div>
          <div className='item1'>Loss Trades - {getAllBacktestingLossTrade().length}</div>

        </div>
        <p><Link to='/journal-list?type=Backtesting'>View All</Link></p>
        </>
        )
        }
      </div>
      <div className='top-box box1 box3'>
      <div className='heading'>Real Time Trades</div>
      {tradesData && (
          <>
        <span> {getAllRealtimeTrade().length} </span>
        <div className='box-sec'>
          <div className='item1'>Profitable Trades - {getAllRealtimeProfitTrade().length}</div>
          <div className='item1'>Loss Trades - {getAllRealtimeLossTrade().length}</div>

        </div>
        <p><Link to='/journal-list?type=Realtime'>View All</Link></p>
        </>
        )
        }

     
      </div>
      <div className='mid-section'>
      <div className='mid-left box1 box4'>
      <div className='heading'>System Overview - Account Level Profit and Loss </div>
      {tradesData && (
          <>
        <div className='box-sec'>
         
          <div className='item1'>Back Testing <br/>
          <span>{getAllBackTestingProfitorLoss(getAllBacktestingTrade()) > 0 ? 'Profit' : 'Loss'} - 
          ₹{getAllBackTestingProfitorLoss(getAllBacktestingTrade())}</span>
            <span>(
{getProfitorLossPercent(getAllBacktestingTrade())}
%)
            </span>
          </div>
          <div className='item1'>Real Time <br/>
          <span>{getAllRealtimeProfitorLoss(getAllRealtimeTrade()) > 0 ? 'Profit' : 'Loss'} - 

          ₹{getAllRealtimeProfitorLoss(getAllRealtimeTrade())}</span>
            <span >(
{getProfitorLossPercent(getAllRealtimeTrade())}%)
            </span></div>
        </div>
        </>
        )
        }

      </div>
      <div className='mid-right box1 box4 box5'>
      {tradesData && (
          <>
                    <div className='heading'>Total {getAllProfitorLoss() > 0 ? 'Profit' : 'Loss'} </div>

        <div className='box-sec'>
          <div className='item1'>
          <span><img src={grow} width="100px"/></span>

          <span> 
          ₹{getAllProfitorLoss()}</span>
            <span>(
 {getProfitorLossPercent(tradesData)}
 %)
            </span>
          </div>
          </div>
        </>
        )
        }
      </div>

      </div>
      
      {/* <div className='top-box box1'>
      <div className='heading'>All Trades Status</div>
      {tradesData && (
          <>
        <span> {tradesData.length} </span>
        <div className='box-sec'>
          <div className='item1'>Profitable Trades - 5</div>
          <div className='item1'>Loss Trades - 3</div>

        </div>
        <p><Link to='/journal-list'>View All</Link></p>
        </>
        )
        }
      </div> */}
      
      </div>
      {/* <div className='mid-section'>
      <div className='mid-left'>abs</div>
      <div className='mid-right'>abs</div>

      </div>
      <div className='bot-section'>
      <div className='bot-box'>abs</div>
      <div className='bot-box'>abs</div>
      <div className='bot-box'>abs</div>

      </div> */}


    </div>
    </div>
    </div>
  );
}

export default withRouter(Dashboard);
