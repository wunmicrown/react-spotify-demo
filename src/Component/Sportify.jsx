import React, { useState } from 'react';
import axios from 'axios';

const Sportify = () => {
  const endPoint = "https://accounts.spotify.com/api/token";
  const clientId = "baa903f4c65b411e9bb91c10263b1110";
  const clientSecret = "9cf614bb1332457ca8cae720ad387b11";
  const trackId = "6rqhFgbbKwnb9MLmUQDhG6"; // Replace with the actual track ID

  const [trackInfo, setTrackInfo] = useState("");

  const getToken = () => {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const data = new URLSearchParams();
    data.append('client_id', clientId);
    data.append('client_secret', clientSecret);
    data.append('grant_type', 'client_credentials');

    // Send POST request to get access token
    axios.post(endPoint, data, { headers })
      .then(response => {
        // console.log(response);
        const accessToken = response.data.access_token;

        // Set the headers for the track request
        const trackHeaders = {
          'Authorization': `Bearer ${accessToken}`,
        };

        // Send GET request to get track information
        axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {headers:trackHeaders})
          .then(trackResponse => {
            // Handle the track response
            setTrackInfo(trackResponse.data);
            console.log(trackResponse.data);
          })
          .catch(trackError => {
            // Handle track errors
            console.error('Error fetching track:', trackError);
          });
      })
      .catch(error => {
        // Handle errors
        console.error('Error fetching token:', error);
      });
  };

  return (
    <main className=' text-center mt-6 '>
      <h1 className='mb-5'>Sportify</h1>
      <button onClick={getToken} className="  p-3 rounded bg-green-800 text-white">Get Music</button>

      {/* {trackInfo.map((element, i)=>(
        <div key={i}>
          <p>Title : {element}</p>
        </div>
      ))} */}
      
      {trackInfo && (
        <div>
          <h2>Track Information:</h2>
          <p>Title: {trackInfo.name}</p>
          <p>Artist(s): {trackInfo.artists.map(artist => artist.name)}</p>
          <p>Album: {trackInfo.album.name}</p>
           <div className='text-center'> 
           <h1>Album Image</h1>
          <img src={trackInfo.album.images[0].url} alt="Album cover" />
           </div>
        </div>
      )}
    </main>
  );
};

export default Sportify;