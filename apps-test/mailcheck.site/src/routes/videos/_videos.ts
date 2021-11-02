const fetchData = async () => {
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
  const playlistId = 'PLI3Dd_Z__sqcUmD8MaIFMIVnfEvTtyPZg';
  const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?maxResults=50&playlistId=${playlistId}&part=snippet&key=${apiKey}`;
  const headers = { accept: 'application/json' };
  return fetch(url, { headers })
    .then((response) => response.json())
    .catch((error) => new Error('Error fetching youtube: ' + error));
};

export default fetchData;
