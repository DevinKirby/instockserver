const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
const port = 3001
const jdsService = require('./jdsService')

app.get('/productDetails', async (req, res) => {
    try {
        const itemNumber = req.query.itemnumber;
        const productDetails = await jdsService.getProductDetails(itemNumber);
        res.send(productDetails);
    } catch (error) {
        console.log(error)
    }
})

app.listen(port, () => {
  console.log(`instock server listening on port ${port}`)
})