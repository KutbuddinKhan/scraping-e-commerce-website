import { useState, useEffect } from "react"
import Card from "./components/Card.js"
import Header from "./components/Header.js"


const App = () => {
  const [deals, setDeals] = useState(null)

  const getDeals = async () => {

    try{
      const response = await fetch("http://localhost:8000/deals", {method: "GET"})
      const data = await response.json()
      setDeals(data)

    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    getDeals()
  }, [])

  console.log(deals)

  return (
    <div className="app">
      <Header />
      <nav>
        <button className="primary">Amazon</button>
        <button className="primary" disabled>Aliexpress</button>
        <button className="primary" disabled>eBay</button>
        <button className="primary" disabled>Etsy</button>
      </nav>

      <div>
        <h2>Beasy Deal!</h2>
        <div className="feed"> 
          {deals?.map(deal => <Card key={deal.pos} item={deal}/>)}
        </div>

      </div>
    </div>
  );
}

export default App;
