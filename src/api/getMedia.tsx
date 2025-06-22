async function getMedia(name: string): Promise<Blob | undefined> {
  try {
    const mediaReq = await fetch(
      `https://storage.googleapis.com/prawko-teoria-vid/visualisations2/${encodeURI(
        name
      )}`
    );
    if (!mediaReq.ok) {
      throw new Error(`Error code ${mediaReq.status}`);
    }
    const media = await mediaReq.blob();
    return media;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}
export default getMedia;
