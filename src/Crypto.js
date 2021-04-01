import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Crypto.css';


const Crypto = ({
    rank, image, name, symbol, price, marketcap, priceChange, volume, redditSubs
}) => {

  const [subs, setSubs] = useState([]);
  const [subsBySymbol, setSubsBySymbol] = useState([]);

  useEffect(() => {
    axios.get(`https://www.reddit.com/r/${name}/about.json`
    ).then(res => {
      setSubs(res.data.data.subscribers);
      console.log(res.data.data.subscribers);
    }).catch(error => console.log(error), setSubs("None"));
  }, []);

  useEffect(() => {
    axios.get(`https://www.reddit.com/r/${symbol}/about.json`
    ).then(res => {
      setSubsBySymbol(res.data.data.subscribers);
      console.log(res.data.data.subscribers);
    }).catch(error => console.log(error), setSubsBySymbol("No Data"));
  }, []);

    return (
    
      <div className='crypto-container'>
        <div className='crypto-row'>
        
          <div className='crypto-info'>
          <h1>{name}</h1>
          <p className='crypto-symbol'>{symbol}</p>
          
          <img src={image} alt={name}/>
          <p className="rank">{rank}</p>
          <p className='price'>${price}</p>
          <p className='crypto-volume'>${volume.toLocaleString()}</p>

          {priceChange > 0 ? (
            <p className='positive-change'>{Math.round(priceChange * 100) / 100}%</p>
          ) : (
            <p className='negative-change'>{Math.round(priceChange * 100) / 100}%</p>
          )}

            <p className='marketcap'>
              ${marketcap.toLocaleString()}
            </p>

            {subs != "None" ? (
              <p className='subreddit-subscriber-count'>Reddit: {subs.toLocaleString()}</p>
            ) : (
              <p className='subreddit-subscriber-count'>Reddit: {subsBySymbol.toLocaleString()}</p>
            )}
            
          </div>
        </div>
      </div>
    );
};

export default Crypto;