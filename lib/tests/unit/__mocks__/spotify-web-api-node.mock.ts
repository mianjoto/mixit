// import { Playlist } from "@/types/spotify";
// import crypto from "crypto";

// export default class MockSpotifyApi {
//   getTracksFromLargePlaylist = (paginationOptions: {
//     limit?: number;
//     offset?: number;
//   }) =>
//     jest.fn().mockResolvedValue((paginationOptions) {
//       body: {
//         href: "http://mock-spotify-api.com/href",
//         items: getMockedTracks(10),
//         limit: limit,
//         next: "http://mock-spotify-api.com/next",
//         offset: 1,
//         previous: null,
//         total: 100,
//       },
//     });
// }

// export const getMockedTracks = (numberOfTracks: number) => {
//   const tracks: string[] = [];
//   for (let i = 0; i < numberOfTracks; i++) {
//     const randomUri = crypto.randomBytes(5).toString("hex");
//     tracks.push(randomUri);
//   }
// };
