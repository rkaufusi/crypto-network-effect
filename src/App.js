import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Crypto from './Crypto';
import './App.css';

function App() {
  const [crypto, setCrypto] = useState([]);
  const [subs, setSubs] = useState([]);
  const [search, setSearch] = useState('');

  //useEffect(() => {
   // axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
   // ).then(res => {
   //   setCrypto(res.data);
   //   console.log(res.data);
   // }).catch(error => console.log(error));
  //}, []);

  const fetchData = () => {
    const coinGeckoApi = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';
    //const redditSubsApi = 'https://www.reddit.com/r/bitcoin/about.json';
    const redditSubsApi = `https://www.reddit.com/r/${crypto.name}/about.json`;

    const getCoinGeckoApi = axios.get(coinGeckoApi);
    const getRedditSubsApi = axios.get(redditSubsApi);
    axios.all([getCoinGeckoApi, getRedditSubsApi]).then(
      axios.spread((...allData) => {
        const allCoinGecko = allData[0].data;
        const allReddit = allData[1].data.data.subscribers;
        setCrypto(allCoinGecko);
        console.log(allReddit);
        setSubs(allReddit);
      })
    ).catch(error => console.log(error));
  }
  useEffect(() => {
    fetchData()
  }, []);



  const change = e => {
    setSearch(e.target.value);
  };

  const filteredCrypto = crypto.filter(crypto => crypto.name.toLowerCase().includes(search.toLowerCase()));
  
  return (
    <div className='crypto'>
      <h2 className='title'>Metcalfe's law and Crypto currency</h2>
      <div className='search-bar'>
      <h1 className='search-heading'>Search a crypto</h1>
      <form>
      <input
        className='input'
        type='text'
        onChange={change}
        placeholder='Search'/>
      </form>
      </div>
 
      {filteredCrypto.map(crypto => {
        return (
          <Crypto
            key={crypto.id}
            image={crypto.image}
            name={crypto.name}
            rank={crypto.market_cap_rank}
            symbol={crypto.symbol}
            price={crypto.current_price}
            marketcap={crypto.market_cap}
            volume={crypto.total_volume}
            priceChange={crypto.price_change_percentage_24h}
            redditSubs={subs}/>
        );
      })}
    </div>
  );
}

export default App;
