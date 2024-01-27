import React, { useEffect, useState } from "react";
import axios from "axios";


const Sportify = () => {
  const endPoint = "https://accounts.spotify.com/api/token";
  const clientId = "baa903f4c65b411e9bb91c10263b1110";
  const clientSecret = "9cf614bb1332457ca8cae720ad387b11";
  const playlistId = "37i9dQZF1EIUQpJ2F6wHN3"; // Replace with the actual playlist ID

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
    <div className="flex h-auto overflow-hidden">
      <nav className="bg-[#121212] text-white p-4 w-2/6 bg-fixed ">
        <div className="flex items-center">
          <h1>Home</h1>
        </div>
      </nav>
      <main className="p-4 bg-red-400 overflow-x-scroll ">


        {playlistInfo && (
          <div className="">
            <header>
              <nav className=" fixed z-20 overflow-y-auto bg-[#573C07] w-[100%] m-0">

                <h1 className="text-2xl font-bold mb-4">Sportify</h1>
              </nav>
            </header>

            <h3 className="text-xl font-bold mt-4 mb-2">Tracks:{playlistInfo.tracks.total}</h3>
            <div className="grid grid-cols-10 gap-4 w-[3000px] overflow-x-auto">
              {playlistInfo.tracks.items.map((track, i) => (
                <div key={i} className="bg-white h-auto p-4 rounded shadow-md transition duration-300 transform hover:scale-105 hover:bg-slate-300 ">
                  <img
                    src={track.track.album.images[0].url}
                    alt={track.track.album.name}
                    className="w-full h-32  mb-4 rounded"
                  />
                  <p className="text-lg font-semibold">{track.track.name}</p>
                  <p className="text-sm text-gray-600">
                    {track.track.artists.map((artist) => artist.name).join(', ')}
                  </p>
                  <p className="text-sm text-gray-600">Album: {track.track.album.name}</p>
                  <p className="text-sm text-gray-600">Duration: {track.track.duration_ms} ms</p>
                  {track.track.preview_url && (
                    <button
                      className="bg-green-700 text-white p-2 rounded-full mt-2 flex items-center justify-center"
                      onClick={() => playAudio(track.track.preview_url)}
                    >
                      <svg
                        className="w-6 h-6 text-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="3"
                          d="M5 3l14 9L5 21V3z"

                        ></path>
                      </svg>

                    </button>

                  )}
                </div>
              ))}
            </div>

            {/* Single audio element for all tracks */}
            <div className="bg-[#121212] h-20 flex justify-evenly">

            <audio className="w-[50%]  " controls ref={(audio) => setCurrentAudio(audio)}></audio>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Sportify;
