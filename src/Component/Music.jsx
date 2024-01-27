import React, { useEffect, useState } from "react";
import axios from "axios";
import homeIcon from '../assets/image-folder/home-icon.png';
import searchIcon from '../assets/image-folder/search-icon.png';
import library from '../assets/image-folder/libary-icon.png';
import next from '../assets/image-folder/next-icon.png';
import back from '../assets/image-folder/back-icon.png';
import notification from '../assets/image-folder/nofication-icon.png';
import gmail from '../assets/image-folder/gmail-icon.png';


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
    <body className="bg-[#000000] ">
      <div className="flex h-auto">
        <nav className="bg-[#121212] fixed h-full  text-white p-4 w-52 hidden md:hidden lg:block sm:hidden ">
          <div className=" mt-6 h-48 rounded">
            <div className="flex justify-start gp-6 mt-28">
              <img src={homeIcon} alt="" />
              <h1 className="mt-2 text-2xl font-bold w-40 mx-4 hover:underline cursor-pointer">Home</h1>
            </div>
            <div className="flex justify-start gp-6 mt-7">
              <img src={searchIcon} alt="" />
              <h1 className="mt-2 text-1xl text-[#bfb7b7] font-bold w-40 mx-4 hover:underline cursor-pointer">Search</h1>
            </div>
            <div className="flex justify-start gp-6 mt-5">
              <img src={library} alt="" />
              <h1 className="mt-2 text-1xl text-[#bfb7b7] font-bold w-40  hover:underline cursor-pointer">Your Library</h1>
            </div>
            <div className="flex justify-start gp-6 mt-6">
              <button className="bg-[#282828] p-3 rounded-2xl">Playlists</button>
             </div>
             <div className="flex justify-start gp-6 mt-8">
              <img src={searchIcon} alt="" />
            </div>
          </div>
        </nav>
        <main className="p-4 bg-[#121212] ">


          {playlistInfo && (
            <div className="bg-[#121212]">
              <nav className=" bg-[#202020] text-white w-[100%] h-18  sticky top-0 z-50 overflow-y-auto flex justify-between">
                <div className="flex ">
                <img src={next} alt="" />
                <img src={back} alt="" />
                </div>
                <div className="flex gap-10 mx-10">
                <button className="text-black font-bold transition duration-300 transform hover:scale-110 hover:bg-[#e3dede] bg-white rounded-2xl mt-3 mb-3 p-2">Explore Premium</button>
                <button className="text-white font-bold transition duration-300 transform hover:scale-110  bg-[#0F0F0F] rounded-2xl mt-3 mb-3 p-2">Install App</button>
                <img className="" src={notification} alt="" />
                <img src={gmail} alt="" />
                </div>
              </nav>



              <h3 className="text-xl font-bold mt-4 mb-2">Tracks:{playlistInfo.tracks.total}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 overflow-x-auto">
                {playlistInfo.tracks.items.map((track, i) => (
                  <div key={i} className="bg-[#181818] text-white cursor-pointer p-4 pt-0 rounded shadow-md  hover:bg-[#282828]">
                    <img
                      src={track.track.album.images[0].url}
                      alt={track.track.album.name}
                      className="w-full h-32 object-cover mb-8 rounded"
                    />
                    <h1 className="text-lg font-semibold">{track.track.name}</h1>
                    <p className="text-sm text-white font-bold">
                      {track.track.artists.map((artist) => artist.name).join(', ')}
                    </p>
                    <p className="text-sm text-[#afaaaa] font-bold">Album: {track.track.album.name}</p>
                    <p className="text-sm text-[#afaaaa] font-bold">Duration: {track.track.duration_ms} ms</p>
                    {track.track.preview_url && (
                      <button
                        className="bg-green-700 text-[#4A4A4A] p-2 rounded-full mt-2 flex items-center justify-center"
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
            </div>
          )}
        </main>
      </div>
      <footer className="bg-[#000000] flex justify-evenly z-auto sticky bottom-0 z-50 overflow-y-auto">

        <audio className=" w-3/5  mt-5" controls ref={(audio) => setCurrentAudio(audio)}></audio>
      </footer>
    </body>
  );
};

export default Sportify;
