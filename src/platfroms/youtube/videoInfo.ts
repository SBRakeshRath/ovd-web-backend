import ytdl from "@distube/ytdl-core";
import ytdlAgent from "../../functions/createYtdlAgent.js";
export default async function videoInfo(link: string) {
  //check if the link is a valid youtube link

  try {
    if (!ytdl.validateURL(link)) {
      return { error: "Invalid URL" };
    }
    console.log("Got info")

    const info = await ytdl.getInfo(link,{
      agent:ytdlAgent
    });
    console.log("Got info")
    console.log(info)
    // const info = await ytdl.getInfo(link);
    const videoDetails = info.videoDetails;

    const audioFormats = ytdl.filterFormats(info.formats, "audioonly");
    const videoFormats = ytdl.filterFormats(info.formats, "videoandaudio");
    const videoWithoutAudio = ytdl.filterFormats(info.formats, "videoonly");

    return {
      videoDetails,
      audioFormats,
      videoFormats,
      videoWithoutAudio,
    };
  } catch (error) {
    console.log("Error in videoInfo function: ");
    console.log(error)
    return { error: error.message };
  }
}
