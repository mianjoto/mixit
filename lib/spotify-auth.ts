import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-private",
    "playlist-modify-public",
    "user-follow-read",
    /** out of scope since quota extension approval - requested scope extension on 01/31/2025 */
    //"user-top-read",
    "user-read-recently-played",
    "user-library-read",
].join(",");

const params = {
    scope: scopes,
};

const queryParamString = new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.AUTH_SPOTIFY_ID,
    clientSecret: process.env.AUTH_SPOTIFY_SECRET,
});

export default spotifyApi;
export { LOGIN_URL };
