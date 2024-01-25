import React, { useEffect, useState } from "react";
import axios from "axios";

const Sportify = () => {
  const endPoint = "https://accounts.spotify.com/api/token";
  const clientId = "baa903f4c65b411e9bb91c10263b1110";
  const clientSecret = "9cf614bb1332457ca8cae720ad387b11";
  const playlistId = "37i9dQZF1DWYkaDif7Ztbp"; // Replace with the actual playlist ID

  const [playlistInfo, setPlaylistInfo] = useState(null);
  const [currentAudio, setCurrentAudio] = useState(new Audio()); // Initialize with an empty Audio object

  const getToken = () => {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    const data = new URLSearchParams();
    data.append("client_id", clientId);
    data.append("client_secret", clientSecret);
    data.append("grant_type", "client_credentials");

    // Send POST request to get access token
    axios
      .post(endPoint, data, { headers })
      .then((response) => {
        const accessToken = response.data.access_token;

        // Set the headers for the playlist request
        const playlistHeaders = {
          Authorization: `Bearer ${accessToken}`,
        };

        // Send GET request to get playlist information
        axios
          .get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
            headers: playlistHeaders,
          })
          .then((playlistResponse) => {
            // Handle the playlist response
            setPlaylistInfo(playlistResponse.data);
            console.log(playlistResponse.data);
          })
          .catch((playlistError) => {
            // Handle playlist errors
            console.error("Error fetching playlist:", playlistError);
          });
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching token:", error);
      });
  };

  useEffect(() => {
    getToken();
  }, []);

  const playAudio = (previewUrl) => {
    currentAudio.pause();
    currentAudio.src = previewUrl;
    currentAudio.play();
  };

  return (
    <main>
      <h1>Sportify</h1>

      {playlistInfo && (
        <div>
          <h2>Playlist Information:</h2>
          <p>Title: {playlistInfo.name}</p>
          <p>Owner: {playlistInfo.owner.display_name}</p>
          <p>Total Tracks: {playlistInfo.tracks.total}</p>

          <h3>Tracks:</h3>
          {playlistInfo.tracks.items.map((track, i) => (
            <div key={i}>
              <p>Title: {track.track.name}</p>
              <p>Artist(s): {track.track.artists.map(artist => artist.name).join(', ')}</p>
              <p>Album: {track.track.album.name}</p>
              <p>Duration: {track.track.duration_ms} ms</p>
              {track.track.preview_url && (
                <button className=" bg-green-700 text-white p-1 rounded" onClick={() => playAudio(track.track.preview_url)}>Play Preview</button>
              )}
            </div>
          ))}

          {/* Single audio element for all tracks */}
          <audio controls ref={(audio) => { setCurrentAudio(audio); }}></audio>
        </div>
      )}
    </main>
  );
};

export default Sportify;
