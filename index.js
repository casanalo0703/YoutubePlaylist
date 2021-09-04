const boton = document.getElementById("buscar");
const URL = "https://content.googleapis.com/youtube/v3/playlistItems" 
const key = ""; //The key from the google cloud platform
let active;

function cambiaVideo(liElement) {
    let video = document.getElementById("youtube-video");
    let videoInformation = document.getElementById("video-information");
    let videoTexto = liElement.children[1].innerText;
    active.classList.remove("active");
    liElement.classList.toggle("active");
    active = liElement;
    videoTexto = videoTexto.split("\n");
    console.log(videoTexto);
    video.innerHTML = `<iframe id="video-embed" src="https://www.youtube.com/embed/${liElement.id}?autoplay=1"></iframe>`;
    videoInformation.innerHTML = `<h2>${videoTexto[0]}</h2><h3>${videoTexto[1]}</h3>`;

}

function printData(JSONData) {
    let playlistItems = document.getElementById("playlist-items");
    let video = document.getElementById("youtube-video");
    let videoInformation = document.getElementById("video-information");
    let element = JSONData.items[0];

    console.log(video);
    console.log(videoInformation);
    try {
        playlistItems.innerHTML = `<li onclick="cambiaVideo(this)" class="video-element active" id=${element.snippet.resourceId.videoId}><img src="${element.snippet.thumbnails.high.url}" alt="thumbnail"><div class="video-content">${element.snippet.title} <br>${element.snippet.channelTitle}</div></li>`;
        for (let i = 1; JSONData.items.length; i++) {
            element = JSONData.items[i];
            playlistItems.innerHTML += `<li onclick="cambiaVideo(this)" class="video-element" id=${element.snippet.resourceId.videoId}><img src="${element.snippet.thumbnails.high.url}" alt="thumbnail"><div class="video-content">${element.snippet.title}<br>${element.snippet.channelTitle}</div></li>`;
        }
    } catch (error) { }
    element = JSONData.items[0];
    video.innerHTML = `<iframe id="video-embed" src="https://www.youtube.com/embed/${element.snippet.resourceId.videoId}?autoplay=1"></iframe>`;
    videoInformation.innerHTML = `<h2>${element.snippet.title}</h2><h3>${element.snippet.description}</h3>`;
    active = document.querySelector(".video-element.active");
    videos = document.querySelectorAll(".video-element");
}

boton.addEventListener('click', () => {
    const idPlaylist = document.getElementById("idplaylist").value;
    let xmlHttp = new XMLHttpRequest();
    let finalURL = `${URL}?playlistId=${idPlaylist}&maxResults=50&part=id,snippet&key=${key}`;

    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let JSONData = JSON.parse(this.responseText);
            printData(JSONData);
        }
    }
    xmlHttp.open("GET", finalURL, true); // true for asynchronous 
    xmlHttp.send(null);
});
