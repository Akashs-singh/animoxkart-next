import Client from 'shopify-buy';

const client = Client.buildClient({
  domain: 'your-shop-name.myshopify.com',
  storefrontAccessToken: 'your-storefront-access-token'
});

// Fetch all products in your shop
client.product.fetchAll().then((products) => {
  // Do something with the products
  // console.log(products);
});