const playdl = require("play-dl");

async function test() {
    try {
        const url = "https://www.youtube.com/watch?v=aqz-KE-bpKQ"; // Big Buck Bunny
        const info = await playdl.video_info(url);
        console.log("Formats:", info.format.length);
        console.log(info.format[0]);
    } catch (e) {
        console.error(e);
    }
}
test();
