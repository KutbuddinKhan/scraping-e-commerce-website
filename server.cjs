import fetch from 'isomorphic-fetch';
const express = require('express')
const cors = require('cors')

const PORT = 8000;


const app = express();
app.use(cors());

const username = "kutbuddinkhan82";
const password = "Kkhan2001";

app.get('/deals', async (req, res) => {
    try {
        const body = {
            "source": "amazon_search",
            "domain": "com",
            "query": "deal of the day",
            "parse": true,
            "pages": 1
        };
        const response = await fetch("https://realtime.oxylabs.io/v1/queries", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Basic " + Buffer.from(`${username}:${password}`).toString('base64')
            }
        });

        const data = await response.json();


       const results =  data.results[0].content.results.organic
       
       const filterDeals = results.filter(deal => deal.price_strikethrough)

       const sortedByBestDeal = filterDeals.sort((b, a) => 
        ((a.price_strikethrough - a.price) / a.price_strikethrough * 100) - 
        ((b.price_strikethrough - b.price) / b.price_strikethrough * 100)
       )

        // console.log(data);
        // res.send(data);
        res.send(sortedByBestDeal)
    } catch (err) {
        console.log("Error: " + err);
    }
});


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
