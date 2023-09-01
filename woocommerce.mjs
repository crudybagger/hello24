import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
// Auth
const WooCommerce = new WooCommerceRestApi.default({
  url: 'https://ninjashop.in',
  consumerKey: 'ck_bcc829bb7da7954f7487748a9963e966cef16c71',
  consumerSecret: 'cs_0e50ba69c14687741ff1252295d26eb70368e94d',
  version: 'wc/v3'
});


// Order options
let afterDate = new Date(Date.parse("12/12/2022")).toISOString(); //12 Dec 2022
let beforeDate = new Date(Date.parse("12/29/2022")).toISOString(); // 29 Dec 2022
const printPaginated = async (url, page = 1, perPage = 5) => {
    try {
        const {data} = await WooCommerce.get(url + `&page=${page}&per_page=${perPage}`);

        if (data.length !== 0) {
          console.log(data);
          await printPaginated(url, page + 1, perPage)
        }
    } catch(error){
      console.log("Error: ", error.code);
    }
}

printPaginated(`orders?after=${afterDate}&before=${beforeDate}&orderby=date&order=asc`, 1, 5);

WooCommerce.get("products?orderby=title")
  .then((response) => {
    console.log(response.data.map((product) => product.id));
  })
  .catch((error) => {
    console.log("Error: ", error.code);
  });