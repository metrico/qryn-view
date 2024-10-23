export function parseURL(url) {
    // Extract the hash fragment
    const hashParts = url.split("#");
    const hashFragment = hashParts[hashParts.length - 1];

    // Split the hash fragment into key-value pairs
    const pairs = hashFragment.split("&");
    const params = {};

    pairs.forEach((pair) => {
        const [key, value] = pair.split("=");
        if (key && value) {
            // Decode the value and handle array-like params
            let decodedValue = decodeURIComponent(value);
            if (key === "left" || key === "right") {
                try {
                    decodedValue = JSON.parse(decodedValue);
                } catch (e) {
                    console.error("Error parsing JSON for", key, e);
                }
            }
            params[key] = decodedValue;
        }
    });

    return params;
}
