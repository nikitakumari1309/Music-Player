let progress = document.getElementById("progress");
let song = document.getElementById("song");
let playPause = document.getElementById("play-pause");
let actionIcon = document.getElementById("action");
let songTitle=document.querySelector(".song-title");
let musicplayer=document.querySelector(".music-player ");

let plusIcon = document.querySelector(".fa-plus");
let custmFileInput = document.querySelector(".custom-file-input");

plusIcon.addEventListener("click",()=>{
     custmFileInput.style.visibility="visible";
     musicplayer.classList.add("shift");
});


song.addEventListener("loadedmetadata", () => {
  progress.max = song.duration;
  progress.value = song.currentTime;
});
song.onplaying = function (){
  setInterval(() => {
    progress.value = song.currentTime;
  }, 500);
}


progress.addEventListener("change",()  =>{
  song.play();
  song.currentTime=progress.value;
  actionIcon.classList.remove("fa-play");
      actionIcon.classList.add("fa-pause");
  })

const folderInput = document.getElementById('folderInput');
const songList = document.getElementById('songList');
// const audioPlayer = document.getElementById('audioPlayer');
const folderLabel = document.getElementById('folderLabel'); 
const songContainer = document.querySelector('.song-list-container');


folderInput.addEventListener('change', function (event) {
   songContainer.style.visibility="visible";
  const files = Array.from(event.target.files);

  // Get the folder name (from the first file's path)
  const folderName = files[0].webkitRelativePath.split('/')[0];
  folderLabel.textContent = folderName; // Update the label text with the folder name

  // Clear any previous list
  songList.innerHTML = '';

  // Filter audio files
  const audioFiles = files.filter(file => file.type.startsWith('audio/'));

  if (audioFiles.length === 0) {
    alert('No audio files found in the selected folder.');
    return;
  }

  // Create a list of songs
  let i=0;
  audioFiles.forEach((file, index) => {
    const listItem = document.createElement('li');
    const songDiv = document.createElement('div');
    
    songDiv.classList.add('song-item');
    songDiv.textContent = file.name;
    songDiv.dataset.fileUrl = URL.createObjectURL(file);

    songDiv.addEventListener("click", () => {
          song.src = songDiv.dataset.fileUrl;
          i=index;
          song.play();
          actionIcon.classList.remove("fa-play");
          actionIcon.classList.add("fa-pause");
          songTitle.innerText=audioFiles[i].name
          songTitle.classList.add("marquee-text");
      });        

    listItem.appendChild(songDiv);
    songList.appendChild(listItem);

    playPause.addEventListener("click",()=>{
      if (actionIcon.classList.contains("fa-play")) {
        song.play();
        actionIcon.classList.remove("fa-play");
        actionIcon.classList.add("fa-pause");
      } 
      else {
        song.pause();
        actionIcon.classList.remove("fa-pause");
        actionIcon.classList.add("fa-play");
      }
    })
  });

  
  let forward=document.querySelector(".fa-forward");
  forward.addEventListener("click",()=>{
    i++;
    if(i>=audioFiles.length){
      i=0;
    }
    let file=audioFiles[i];
    song.src=URL.createObjectURL(file);
    song.play();
        actionIcon.classList.remove("fa-play");
        actionIcon.classList.add("fa-pause");
  })


  let backward=document.querySelector(".fa-backward");
  backward.addEventListener("click",()=>{
    i--;
    if(i<0){
      i=audioFiles.length-1;
    }
    let file=audioFiles[i];
    song.src=URL.createObjectURL(file);
    song.play();
        actionIcon.classList.remove("fa-play");
        actionIcon.classList.add("fa-pause");
  })

});
