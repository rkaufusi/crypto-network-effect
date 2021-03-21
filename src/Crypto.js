import React from 'react';
import './Crypto.css';


const Crypto = ({
    rank, image, name, symbol, price, marketcap, priceChange, volume, redditSubs
}) => {
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

            
            <p className='subreddit-subscriber-count'>Reddit {redditSubs}
            </p>
          </div>
        </div>
      </div>
    );
};

export default Crypto;