import axios from 'axios';

function validateIP(ip) {
    const lengthIsValid = ip.length >= 7 || ip.length <= 15;
    const formatIsValid = ip.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/, ip);
    return lengthIsValid && formatIsValid;
}

export default async function getIPGeolocation(ip, setData, setCoordinates) {
    if (!validateIP(ip)) return setData("IP is not valid.");
    try {
        const response = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${import.meta.env.VITE_GEOIP_KEY}&ip=${ip}`);
        setData(response.data);
        setCoordinates([
            parseFloat(response.data.longitude),
            parseFloat(response.data.latitude),
        ]);
    } catch (error) {
        setData(error.response.data.message);
    }
}