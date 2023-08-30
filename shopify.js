var shopify = require('shopify/shopify-api');

const queryString = `{
    products (first: 3) {
      edges {
        node {
          id
          title
        }
      }
    }
  }`
  
// `session` is built as part of the OAuth process
// const shopify = Shopify({
//   session : {
//     access_token: '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',
//     shop: 'hello24-d5',
//   },
//   apiVersion: '2022-04'
// });
const session = {
  access_token: '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',
  shop: 'hello24-d5',
};
const client = new shopify.clients.Graphql({session});
const products = client.query({
data: queryString,
});

console.log(products);
  