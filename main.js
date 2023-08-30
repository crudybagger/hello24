const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
// Auth
const WooCommerce = new WooCommerceRestApi({
  url: 'https://ninjashop.in',
  consumerKey: 'ck_bcc829bb7da7954f7487748a9963e966cef16c71',
  consumerSecret: 'cs_0e50ba69c14687741ff1252295d26eb70368e94d',
  version: 'wc/v3'
});

// Order options
let afterDate = new Date(Date.parse("12/12/2022")).toISOString(); //12 Dec 2022
let beforeDate = new Date(Date.parse("12/29/2022")).toISOString(); // 29 Dec 2022


WooCommerce.get(`orders?after=${afterDate}&before=${beforeDate}&orderby=date&order=asc&page=1&per_page=2`)
  .then((response) => {
    console.log(response.data.map((order) => order.id));
  })
  .catch((error) => {
    console.log(error.response.data);
  });

WooCommerce.get("products?orderby=title")
  .then((response) => {
    console.log(response.data.map((product) => product.id));
  })
  .catch((error) => {
    console.log(error.response.data);
  });