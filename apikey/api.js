const API_KEY = process.env.NEXT_PUBLIC_CLIENT_ID;



export const getQueryPhotos = async (query) => {
    console.log(query)
    const res = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${query}&per_page=15&client_id=3H516dDIPOgaJaMNiimPnCh9dh1e4GAYawjiD1sOByo`)
    const responseJson = await res.json();
    return responseJson.results;
};
