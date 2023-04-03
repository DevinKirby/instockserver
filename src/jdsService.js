const axios = require ('axios');
const cheerio = require('cheerio');
const nightmarecookies = require('./nightmarecookies');

const getProductDetails = async (itemNumber) => {
	try {
        const cookies =  await nightmarecookies.getJDSCookies();
		const { data } = await requestProductDetails(cookies.phpCookie, cookies.gaCookie, itemNumber);
		const $ = cheerio.load(data);
		const productDetails = [];

		$('tr').each((_idx, trElement) => {
            const productDetail = $(trElement).text()
            if(productDetail) {
                productDetails.push(productDetail)  
            }
		});

		return productDetails;
	} catch (error) {
		throw error;
	}
};

async function requestProductDetails(phpCookie, gaCookie, itemNumber) {
    return await axios.request({
        url: `https://shop.jdsindustries.com/includes/process_ajax_request.php?r=idjlBzFadorCAkcverjcnFpGvyzeklxliDoqkCbnwfyDDbuEtbAdjFGdaiCdtxxwxtojohkvecptscCDchznzesiaduoyjntkitomFmDnfwtfBhBsxGACpFGaaDtb&cmd=getDetails&item=${itemNumber}`,
        method: "get",
        crossDomain: true,
        withCredentials: false,
        headers:{
            Cookie: `PHPSESSID=${phpCookie}; ga_=${gaCookie};`
        } 
   })
}

module.exports = { getProductDetails }