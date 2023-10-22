const MUSICLIST = [
    {"id": 1985094354, "time": 201, "title": "ひとりじゃイヤ (feat. 初音ミク)"},
    {"id": 26124540, "time": 236, "title": "Sweet Devil"},
    {"id": 1948735477, "time": 245, "title": "ヒアソビ (feat. 初音ミク)"},
    {"id": 1402830753, "time": 220, "title": "Gimme×Gimme"},
    {"id": 502455381, "time": 279, "title": "アンノウン・マザーグース"},
    {"id": 2028012539, "time": 170, "title": "マシーネ・クリーク (feat. 初音ミク) [long ver.]"},
    {"id": 1915002558, "time": 203, "title": "ベノム"},
    {"id": 1376659382, "time": 217, "title": "アンヘル"},
    {"id": 29785926, "time": 307, "title": "みんなみくみくにしてあげる♪"},
    {"id": 825736, "time": 258, "title": "メルト"},
    {"id": 22811616, "time": 182, "title": "モザイクロール"},
    {"id": 432486470, "time": 210, "title": "ゴーストルール（Ghost Rule）"},
    {"id": 26136782, "time": 193, "title": "脳漿炸裂ガール"},
    {"id": 22677570, "time": 252, "title": "ワールドイズマイン"},
    {"id": 1492827692, "time": 251, "title": "ラグトレイン"},
    {"id": 1490396156, "time": 235, "title": "劣等上等"},
    {"id": 1804888684, "time": 135, "title": "KING"},
    {"id": 505474379, "time": 232, "title": "病名は愛だった"},
    {"id": 29827559, "time": 213, "title": "おこちゃま戦争"},
    {"id": 1864338278, "time": 206, "title": "ダーリンダンス"},
    {"id": 1840474281, "time": 178, "title": "ヴァンパイア"},
    {"id": 1826139261, "time": 172, "title": "グッバイ宣言"},
    {"id": 1408586356, "time": 234, "title": "ホワイトハッピー"},
    {"id": 1878313261, "time": 203, "title": "神っぽいな"},
    {"id": 28953243, "time": 222, "title": "恋愛裁判"},
    {"id": 1874071402, "time": 178, "title": "snooze (feat. 初音ミク)"},
    {"id": 2065967991, "time": 165, "title": "GEDO (feat. 鏡音レン)"},
    {"id": 1943883908, "time": 134, "title": "酔いどれ知らず"},
    {"id": 22699092, "time": 183, "title": "裏表ラバーズ"},
    {"id": 22699098, "time": 189, "title": "ローリンガール"},
    {"id": 26124988, "time": 217, "title": "ロストワンの号哭"},
    {"id": 1383171720, "time": 226, "title": "Nyanyanyanyanyanyanya!"},
    {"id": 1390059796, "time": 234, "title": "ねこみみスイッチ"},
    {"id": 26141902, "time": 196, "title": "WAVE"},
    {"id": 1945304395, "time": 208, "title": "アブノーマリティ・ダンシンガール"},
    {"id": 1369404131, "time": 197, "title": "ビターチョコデコレーション"},
    {"id": 22699095, "time": 211, "title": "ワールズエンド・ダンスホール"},
    {"id": 28996499, "time": 250, "title": "ヒビカセ"},
    {"id": 29812004, "time": 244, "title": "ECHO"},
    {"id": 4888328, "time": 333, "title": "炉心融解"},
    {"id": 30148963, "time": 250, "title": "ツギハギスタッカート"},
    {"id": 1333336766, "time": 263, "title": "39みゅーじっく!"},
    {"id": 28996501, "time": 224, "title": "drop pop candy"},
    {"id": 407485173, "time": 261, "title": "マインドブランド"}
];
let musicNumber = 0;
let name;
let author;
let url;
let timeS = 0;
let isMusicPlay = false;
let currentTime = 0;
let isCurrentTime = true;
let allMusicTime = 0;
for (let i = 0; i < MUSICLIST.length; i++) {
    $("#musicListShow").append("<li>" + MUSICLIST[i].title + "</li>");
    allMusicTime += MUSICLIST[i].time;
}
$("#allMusicTime").append(allMusicTime + "s");
function musicBegin() {
    if (isMusicPlay === false) {
        if (Math.round(new Date().getTime() / 1000 - 1697817600) > MUSICLIST[musicNumber].time) {
            timeS += MUSICLIST[musicNumber].time;
            if (Math.round(new Date().getTime() / 1000 - 1697817600) - timeS < 0) {
                timeS -= MUSICLIST[musicNumber].time;
                playCurrentSong();
            } else {
                musicNumber++;
                if (musicNumber >= MUSICLIST.length) {
                    musicNumber = 0;
                };
                musicBegin();
            }
        } else {
            playCurrentSong();
        }
    }
}
function playMusic(musicId) {
    let musicApi = `https://api.gumengya.com/Api/Netease?format=json&id=${musicId}`;
    $.ajax({
        url: musicApi,
        method: "GET",
        dataType: "json",
        async: false,
        success: function (result) {
            if (result.data === undefined || result.data === null) {
                console.error("API Error!");
                return;
            }
            name = result.data.title;
            author = result.data.author;
            url = result.data.url;
            console.log(name + '\n' + author + '\n' + url);

            let audio = new Audio(url);
            audio.addEventListener('loadedmetadata', function () {
                let duration = Math.floor(audio.duration);
                console.log(`MP3 文件长度：${duration} 秒`);
                if (isCurrentTime === true) {
                    currentTime = Math.round(new Date().getTime() / 1000 - 1697817600) - timeS;
                    console.log(Math.round(new Date().getTime() / 1000 - 1697817600) - timeS);
                    isCurrentTime = false;
                } else {
                    currentTime = 0;
                }
                audio.currentTime = currentTime;
                audio.play();
                console.log(duration - currentTime);
                $("#nowPlay").html(`
                    Now:<br>
                    Title:<b>${name}</b><br>
                    Author:<b>${author}</b><br>
                    Next:<br>
                    Title: ${MUSICLIST[musicNumber + 1] ? MUSICLIST[musicNumber + 1].title : MUSICLIST[0].title}
                `);
                setTimeout(function () {
                    console.log("Next");
                    musicNumber++;
                    if (musicNumber >= MUSICLIST.length) {
                        musicNumber = 0;
                    };
                    audio.pause();
                    playMusic(MUSICLIST[musicNumber].id);
                }, (duration - currentTime) * 1000);
            });
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });
}
function playCurrentSong() {
    isMusicPlay = true;
    playMusic(MUSICLIST[musicNumber].id);
}
