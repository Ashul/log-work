import React, { useEffect, useState } from 'react';
import { writeTrade } from '../../services';
import Header from '../header'
import answer from '../../assets/images/answers.png'
import moment, { now } from 'moment';
import { withRouter } from '../withRouter';

function Journal (props) {
    const {router} = props
    const [error, setError] = useState();
    const [tradename, setTradename] = useState();
    const [tradetype, setTradetype] = useState();
    const [entrytime, setEntrytime] = useState();
    const [exittime, setExittime] = useState();
    const [entryprice, setEntryprice] = useState();
    const [exitprice, setExitprice] = useState();
    const [tradedetails, setTradedetails] = useState();
    const [targetprice, setTargetprice] = useState();
    const [slprice, setSlprice] = useState();
    const [tradesession, setTradesession] = useState();
 

   useEffect( () => {
    const auth = sessionStorage.getItem('userAuth') || '';
   const tradetype = router.location.search.split('=') || '';
        if (!auth) {
            router.navigate("/")
        } 
     }, []);
   
   const onFormSubmit = (e) =>{
    e.preventDefault();
    
    const auth = sessionStorage.getItem('userAuth') || '';
    const userAuth = auth && JSON.parse(atob(auth))
    const payload = {
        "name": userAuth.name,
        "email": userAuth.email,
        "userid":userAuth.id,
        "tradename": tradename,
        "tradesession": tradesession,
        "tradetype":tradetype,
        "date":moment(entrytime).format('MMM DD, YYYY'),
        "day": moment(entrytime).format('dddd'),
        "entrytime": moment(entrytime).format('h:mm: a'),
        "exittime": moment(exittime).format('h:mm a'),
        "entryprice": entryprice,
        "exitprice": exitprice,
        "targetprice": targetprice,
        "stoploss": slprice,
        "tradestatus": parseInt(entryprice)  > parseInt(exitprice) ? 'loss' : 'profit',
        "details": tradedetails,
      }  
      writeTrade(payload)

  }
    
  
      
        return(
            <>
            <Header />
            <div className="main-container">

        <div className="container">
        <div className="journal">
        <div className='heading'>
            <img src={answer} width="30px"/>
            <span className='al-trdes'>Log your Trades</span>
            </div>
            <div className='j-form'>

          <p className="message">{error}</p>
            <form error={error} onSubmit={(e) =>onFormSubmit(e)}>
                <div className='w-50'>
                <h3>Trade Name</h3>
              <input type="text" className="form-control"
               placeholder="Enter trade name" name="tardename" value={tradename} 
               onChange={e => setTradename(e.target.value)}/>
               </div>
               <div className='w-50 m-l20 back-t'>
                <h3>Trade Type</h3>
                <select name="tradesession"
                value={tradetype} 
                onChange={e => setTradetype(e.target.value)} 
                >
                <option value="" >Select</option>
                <option value="Backtesting" >Back Testing</option>
                <option value="Realtime" >Real Time</option>
              </select>
               </div>
               <div className='trade-time-top'>
                <h3>Trade Time</h3>
                <div className='trade-time'>

               <div>

               <label>Trade Session</label>
              <select name="tradesession"
                value={tradesession} 
                onChange={e => setTradesession(e.target.value)} 
              >
                <option value="" >Select</option>
                <option value="Morning" >Moring</option>
                <option value="Afternoon" >Afternoon</option>
                <option value="Evening" >Evening</option>
              </select>
               </div>

               

              
               <div>
               <label>Trade Entry Time</label>
              <input type="datetime-local" className="form-control"
               placeholder="Enter entry time" name="entrytime" value={entrytime} 
               onChange={e => setEntrytime(e.target.value)}/>
               </div>
               <div>
               <label>Trade Exit Time</label>
              <input type="datetime-local" className="form-control"
               placeholder="Enter exit time" name="exittime" value={exittime} 
               onChange={e => setExittime(e.target.value)}/>
               </div>
                </div>
                </div>
                <div className='trade-time-top'>
                <h3>Trade Price</h3>
                <div className='trade-time'>
               <div>
               <label>Trade Entry Price</label>
              <input type="text" className="form-control"
               placeholder="Enter entry price" name="entryprice" value={entryprice} 
               onChange={e => setEntryprice(e.target.value)}/>
               </div>

               <div>
               <label>Trade Exit Price</label>
              <input type="text" className="form-control"
               placeholder="Enter exit price" name="exitprice" value={exitprice} 
               onChange={e => setExitprice(e.target.value)}/>
               </div>

               <div>
               <label>Trade Target Price</label>
              <input type="text" className="form-control"
               placeholder="Enter target price" name="targetprice" value={targetprice} 
               onChange={e => setTargetprice(e.target.value)}/>
               </div>

               <div>
               <label>Trade SL Price</label>
              <input type="text" className="form-control"
               placeholder="Enter stop loss" name="slprice" value={slprice} 
               onChange={e => setSlprice(e.target.value)}/>
               </div>
                </div>
                </div>
                <div>
               <h3>Trade Details</h3>
              <input type="textbox" className='textarea' name="tradedetails" value={tradedetails} 
               onChange={e => setTradedetails(e.target.value)}/>
               </div>
               <div className='text-center'>
              <button className="but-p" type="submit" onClick={(e)=>onFormSubmit(e)}>Submit Trade</button>
              </div>
            </form>
            </div>
            </div>
        </div>
        </div>
        </>
        )
    }


export default withRouter(Journal)