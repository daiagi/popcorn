const fetchWithTimeout = (timeout = 7000) => (url, options) => Promise.race([
    fetch(url, options),
    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), timeout))
]).catch(console.error);


export default fetchWithTimeout;
