import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-private",
  "playlist-modify-public",
  "user-follow-modify",
  "user-follow-read",
  "user-read-playback-position",
  "user-top-read",
  "user-read-recently-played",
  "user-library-read",
  "user-read-playback-state",
  "user-read-email",
  "user-read-private",
].join(",");

const params = {
  scope: scopes,
};

const queryParamString = new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

export default spotifyApi;
export { LOGIN_URL };
