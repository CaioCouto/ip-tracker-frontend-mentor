import axios from 'axios';

function validateIP(ip) {
    const IPIsEmpty = ip.length === 0;
    const lengthIsValid = ip.length >= 7 || ip.length <= 15;
    const formatIsValid = ip.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/, ip);
    return IPIsEmpty || (lengthIsValid && formatIsValid);
}

export default async function getIPGeolocation(ip, setData, setCoordinates) {
    console.log(ip)
    if (!validateIP(ip)) return setData("IP is not valid.");
    try {
        const response = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=${import.meta.env.VITE_GEOIP_KEY}&ipAddress=${ip}`);
        setData(response.data);
        setCoordinates([
            parseFloat(response.data.location.lng),
            parseFloat(response.data.location.lat),
        ]);
    } catch (error) {
        setData(error.response.data.message);
    }
}