import CryptoJS from 'crypto-js';

const PRODUCTS_API_URL = 'https://api.animoxkart.com/chunk';
const TAGS_API_URL = 'https://api.animoxkart.com/chunk-js';
const SECRET = 'animal-cat-dog-bird-fish-tree-su';

type EncryptedPayload = {
  data: string;
  iv: string;
};

function decryptPayload(payload: EncryptedPayload) {
  const decrypted = CryptoJS.AES.decrypt(
    payload.data,
    CryptoJS.enc.Utf8.parse(SECRET),
    {
      iv: CryptoJS.enc.Base64.parse(payload.iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  return JSON.parse(CryptoJS.enc.Utf8.stringify(decrypted));
}

async function fetchEncryptedJson(url: string) {
  const response = await fetch(url, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  return (await response.json()) as EncryptedPayload;
}

export async function getCatalogProducts() {
  try {
    const payload = await fetchEncryptedJson(PRODUCTS_API_URL);
    return decryptPayload(payload);
  } catch (error) {
    console.error('Error fetching catalog products:', error);
    return [];
  }
}

export async function getCatalogTags() {
  try {
    const payload = await fetchEncryptedJson(TAGS_API_URL);
    return decryptPayload(payload);
  } catch (error) {
    console.error('Error fetching catalog tags:', error);
    return [];
  }
}

export function getCategoryProducts(products: any[], category: string) {
  return products.filter((product: any) => {
    return (
      product.category === 'wearable' &&
      Array.isArray(product.tags) &&
      product.tags.includes(category)
    );
  });
}

export function getCategoryTag(tags: any[], category: string) {
  return (
    tags.find((tag: any) => tag.name?.toLowerCase() === category.toLowerCase()) || {}
  );
}

// Made with Bob
