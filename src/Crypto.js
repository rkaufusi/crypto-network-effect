import React from 'react';
import './Crypto.css';

const Crypto = ({
    rank, image, name, symbol, price, marketcap, priceChange, volume
}) => {
    return (
      <div className='crypto-container'>
        <div className='crypto-row'>
          <div className='crypto'>
            <p className='crypto-rank'>{rank}</p>
            <img src={image} alt={name}/>
            <h1>{name}</h1>
            <p className='crypto-symbol'>{symbol}</p>
          </div>
          <div className='crypto-info'>
          <p className='price'>${price}</p>
          <p className='crypto-volume'>${volume.toLocaleString()}</p>

          {priceChange > 0 ? (
            <p className='positive-change'>{Math.round(priceChange * 100) / 100}%</p>
          ) : (
            <p className='negative-change'>{Math.round(priceChange * 100) / 100}%</p>
          )}

            <p className='marketcap'>
              Market Cap ${marketcap.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    );
};

export default Crypto;