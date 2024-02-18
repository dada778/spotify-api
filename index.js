const clientId = "6fd795aa25fd45c5ba39c89adfc779d3";
const clientSecret = "eaf020889d9347e1a18a7e07519a6efd";
const playlistName = "yayaya";
const trackURIs = [
  "https://open.spotify.com/track/6NscC808NRdDpflDYZw2al?si=84cd224fcfee45aa",
  "https://open.spotify.com/track/0D3MiqRbFtsfONFfKy16mS?si=a4fa16ddb16f4a81",
  "https://open.spotify.com/track/25KtcsHvLIeNuu03u7S8Jn?si=6ade7bd33ca2432d",
];

// Step 1: Get Access Token
async function getAccessToken() {
  //okay
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  return data.access_token;
}

// Step 2: Create Playlist
async function createPlaylist(accessToken) {
  console.log(accessToken + "ya");
  const response = await fetch(
    "https://api.spotify.com/v1/users/6fd795aa25fd45c5ba39c89adfc779d3/playlists",
    {
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: playlistName,
        description: "tttteeeesssstttt",
        public: false,
      }),
    }
  );

  const data = await response.json();
  return data.id; // Returns the playlist ID
}

// Step 3: Add Tracks to Playlist
async function addTracksToPlaylist(accessToken, playlistId) {
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uris: trackURIs,
      }),
    }
  );

  const data = await response.json();
  return data.snapshot_id; // Returns the snapshot ID
}

// Main function to execute the steps
async function main() {
  try {
    const accessToken = await getAccessToken();
    console.log(accessToken);
    const playlistId = await createPlaylist(accessToken);

    const snapshotId = await addTracksToPlaylist(accessToken, playlistId);

    console.log("Playlist created successfully!");
    console.log("Playlist ID:", playlistId);
    console.log("Snapshot ID:", snapshotId);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Run the main function
main();
