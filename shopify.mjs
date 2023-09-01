import "@shopify/shopify-api/adapters/node";
import { shopifyApi } from "@shopify/shopify-api";

const shopify = shopifyApi({
  apiSecretKey: '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',
  apiVersion: '2022-04',
  isCustomStoreApp: true,
  hostName: 'hello24-d5',
});
const session = shopify.session.customAppSession("hello24-d5.myshopify.com");
const client = new shopify.clients.Graphql({session});

// query dates 
const afterDate = new Date("2022-12-01").toISOString(); // 01 Dec 2022
const beforeDate = new Date("2023-01-01").toISOString(); // 30 Jan 2023

const printPaginated = async (lastCursor = "", perPage = 5, page = 1) => {
  const query = `{
    orders(first:${perPage} ${lastCursor !== "" ? (", after : \"" + lastCursor + "\"") : ""}, query : "created_at:>=${afterDate} created_at:<=${beforeDate}") {
      edges {
        node {
          id
          createdAt
          name
        }
        cursor
      }

    }
  }`;
  try {
    const {body: {data: {orders}}} = await client.query({
      data: query,
    });
    
    if (orders.edges.length !== 0){
      console.log("Page: " + page, orders.edges);
      await printPaginated(orders.edges[orders.edges.length - 1].cursor, perPage, page+1);
    } 
  } catch(error){
    console.log(error);
  }
}

await printPaginated();

const {body: {data: {products}}} = await client.query({
  data: `{
    products(first:10, sortKey: TITLE) {
      edges {
        node {
          id
          title
        }
      }
    }
  }`,
});

console.log("All products: ", products.edges, products.edges.length);