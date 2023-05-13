const artists = [
  {
    name: "album1",
    songs: [
      {
        name: "song1",
        artist: "artist1",
        url: "url1",
      },
    ],
  },
];

export async function generateStaticParams() {
  return artists.map((album) => {
    return { filename: album.name };
  });
}

export default function Page({ params }: { params: { filename: string } }) {
  console.log("params", params);
  return <>Artist</>;
}
