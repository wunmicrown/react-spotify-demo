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

<h1 className="text-2xl font-bold mb-4">Sportify</h1>

{playlistInfo && (
  <div>
    <h2 className="text-xl font-bold mb-2">Playlist Information:</h2>
    <p>Title: {playlistInfo.name}</p>
    <p>Owner: {playlistInfo.owner.display_name}</p>
    <p>Total Tracks: {playlistInfo.tracks.total}</p>

    <h3 className="text-xl font-bold mt-4 mb-2">Tracks:</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {playlistInfo.tracks.items.map((track, i) => (
        <div key={i} className="bg-white p-4 rounded shadow-md transition duration-300 transform hover:scale-105 hover:bg-slate-300">
          <img
            src={track.track.album.images[0].url}
            alt={track.track.album.name}
            className="w-full h-32 object-cover mb-4 rounded"
          />
          <p className="text-lg font-semibold">{track.track.name}</p>
          <p className="text-sm text-gray-600">
            {track.track.artists.map((artist) => artist.name).join(', ')}
          </p>
          <p className="text-sm text-gray-600">Album: {track.track.album.name}</p>
          <p className="text-sm text-gray-600">Duration: {track.track.duration_ms} ms</p>
          {track.track.preview_url && (
            <button
              className="bg-green-700 text-white p-2 rounded mt-2"
              onClick={() => playAudio(track.track.preview_url)}
            >
              Play Preview
            </button>
          )}
        </div>
      ))}
    </div>

    {/* Single audio element for all tracks */}
    <audio controls ref={(audio) => setCurrentAudio(audio)}></audio>
  </div>
)}
    </main>
  );
};

export default Sportify;
