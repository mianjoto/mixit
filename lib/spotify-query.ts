import SpotifyWebApi from "spotify-web-api-node";

interface getTopPlaylistOptions {
  spotifyApi: SpotifyWebApi;
  paginationOptions?: { limit?: number; offset?: number };
}

export async function getTopPlaylists({
  spotifyApi: spotifyApiObject,
  paginationOptions,
}: getTopPlaylistOptions): Promise<SpotifyApi.PlaylistObjectSimplified[]> {
  const response = await spotifyApiObject.getUserPlaylists(paginationOptions);

  if (response.statusCode !== 200) {
    Promise.reject("Error getting user playlists");
  }

  return response.body.items;
}
