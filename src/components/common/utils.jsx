export function getImage(image) {
    if (!image.startsWith("https")) {
        return "https://animoxkart-products.s3.ap-south-1.amazonaws.com/" + image;
    }
    return image;
}

export function formatTag(str) {
    if (!str || str.length === 0) return str;
    const clean = str.replace(/-/g, " ");
        return clean.charAt(0).toUpperCase() + clean.slice(1);

}