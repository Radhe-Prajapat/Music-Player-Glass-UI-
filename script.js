// =========================================================
// AUDIOBUCK MUSIC PLAYER ENGINE & INTERACTIVE LOGIC
// =========================================================

var arr = [
  {
    img: "https://i1.sndcdn.com/artworks-9mdJ7HyOXEo5jNHd-Lcpkeg-t1080x1080.jpg",
    url: "./Song/With You - AP Dhillon (Official Music Video) - APDHILLON.mp3",
    songName: "With You",
    Singer: "AP Dhillon",
    tag: "#Choice",
    listened: "93,654 Listened",
    duration: "3:34",
    liked: false,
  },
  {
    img: "https://c.saavncdn.com/699/Thinking-of-You-Punjabi-2026-20260206063613-500x500.jpg",
    url: "./Song/Thinking Of You (Official Audio)  AP Dhillon - APDHILLON.mp3",
    songName: "Thinking Of You",
    Singer: "AP Dhillon",
    tag: "#Abdomien",
    listened: "40,364 Listened",
    duration: "2:57",
    liked: false,
  },
  {
    img: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/a7/8f/bb/a78fbb01-b0aa-5bab-cc91-4d585d3ffee3/23UMGIM85552.rgb.jpg/400x400bb.webp",
    url: "./Song/B Praak - Mal Mal (Lyric Video)  Jaani  Arvindr Khaira  Zohrajabeen - DM - Desi Melodies.mp3",
    songName: "Mal Mal",
    Singer: "B Praak",
    tag: "#Desire",
    listened: "10,364 Listened",
    duration: "4:24",
    liked: true,
  },
  {
    img: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/ec/68/d4/ec68d41a-ddc0-092e-34fa-11074dbacaa0/Aavan-Jaavan-Hindi-Audio-Cover-wc.jpg/800x800cc.jpg",
    url: "./Song/Aavan Jaavan Song  WAR 2  Hrithik Roshan, Kiara Advani  Pritam, Arijit Singh, Nikhita  Amitabh B - YRF.mp3",
    songName: "Aavan Jaavan",
    Singer: "Arijit Singh",
    tag: "#Inspitred",
    listened: "73,547 Listened",
    duration: "3:50",
    liked: false,
  },
  {
    img: "https://c.saavncdn.com/702/Baaghi-4-Hindi-2025-20250903191103-500x500.jpg",
    url: "./Song/Baaghi 4 Marjaana (Lyrics)  Tiger Shroff, Harnaaz, Sanjay D, Sonam B  B Praak, Siddhaant, Sameer - T-Series.mp3",
    songName: "Marjaana",
    Singer: "B Praak",
    tag: "#Melody",
    listened: "54,210 Listened",
    duration: "5:12",
    liked: false,
  },
  {
    img: "https://c.saavncdn.com/419/blue-English-2024-20250827050756-500x500.jpg",
    url: "./Song/yung kai - blue (Lyrics) - Creative Chaos.mp3",
    songName: "Blue",
    Singer: "LeAnn Rimes",
    tag: "#Chill",
    listened: "28,190 Listened",
    duration: "3:20",
    liked: false,
  },
];

// DOM Elements Selection
var songList = document.querySelector(".song-list");
var play = document.querySelector("#btn-play");
var backward = document.querySelector("#btn-backward");
var forward = document.querySelector("#btn-forward");
var like = document.querySelector("#btn-like");
var progressBar =
  document.querySelector("#progress-range") ||
  document.querySelector("#range input");
var audio = new Audio();
var selectedSong = 0;
var flag = 0; // 0 = Paused, 1 = Playing

// Format seconds into mm:ss
function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  var mins = Math.floor(seconds / 60);
  var secs = Math.floor(seconds % 60);
  return mins + ":" + (secs < 10 ? "0" : "") + secs;
}

// Render Song List & Update Player State
function mainfunction() {
  var clutter = "";

  arr.forEach(function (el, idx) {
    var isSelected = idx == selectedSong;
    clutter += `
        <div class="song ${isSelected ? "active" : ""}" id="${idx}">
            <div class="song-col main-info">
                <div class="song-thumb">
                    <img src="${el.img}" alt="${el.songName}" />
                    <div class="play-overlay">
                        <i class="${isSelected && flag == 1 ? "ri-pause-fill" : "ri-play-fill"}"></i>
                    </div>
                </div>
                <div class="song-title-wrap">
                    <h4>${el.songName.trim()}</h4>
                    <span class="singer-name">${el.Singer.trim()}</span>
                </div>
            </div>
            <div class="song-col tag-col">
                <span class="badge-tag">${el.tag}</span>
            </div>
            <div class="song-col listened-col">
                <i class="ri-pulse-line"></i> ${el.listened}
            </div>
            <div class="song-col duration-col">
                <i class="ri-time-line"></i> ${el.duration}
            </div>
            <div class="song-col actions-col">
                <button class="btn-song-like ${el.liked ? "liked" : ""}" data-index="${idx}" title="Favorite">
                    <i class="${el.liked ? "ri-heart-fill" : "ri-heart-line"}"></i>
                </button>
                <button class="btn-song-more" title="More Options">
                    <i class="ri-more-2-fill"></i>
                </button>
            </div>
        </div>`;
  });

  if (songList) {
    songList.innerHTML = clutter;
  }

  var currentTrack = arr[selectedSong];
  audio.src = currentTrack.url;

  // Update Bottom Player Meta
  var playerTitle = document.querySelector("#player-song-title");
  var playerSinger = document.querySelector("#player-singer-name");
  var playerCover =
    document.querySelector(".track-artwork") || document.querySelector("#img");
  var heroArtistName = document.querySelector("#hero-artist-name");
  var heroArtistImage = document.querySelector("#hero-artist-image");
  var totalSongsCount = document.querySelector("#songs-total-count");

  if (playerTitle) playerTitle.textContent = currentTrack.songName.trim();
  if (playerSinger) playerSinger.textContent = currentTrack.Singer.trim();
  if (playerCover) {
    playerCover.style.backgroundImage = `url("${currentTrack.img}")`;
  }
  if (heroArtistName) {
    heroArtistName.textContent = currentTrack.Singer.trim();
  }
  if (heroArtistImage) {
    heroArtistImage.src = currentTrack.img;
  }
  if (totalSongsCount) {
    totalSongsCount.textContent = `${arr.length} songs Total`;
  }

  // Update Lyrics Tab details
  var lyricsTitle = document.querySelector("#lyrics-song-title");
  var lyricsArtist = document.querySelector("#lyrics-song-artist");
  var lyricsCover = document.querySelector("#lyrics-song-cover");
  if (lyricsTitle) lyricsTitle.textContent = currentTrack.songName.trim();
  if (lyricsArtist) lyricsArtist.textContent = currentTrack.Singer.trim();
  if (lyricsCover) lyricsCover.src = currentTrack.img;

  // Synchronize bottom player favorite button
  if (like) {
    if (currentTrack.liked) {
      like.innerHTML = `<i class="ri-heart-fill"></i>`;
      like.classList.add("liked");
    } else {
      like.innerHTML = `<i class="ri-heart-line"></i>`;
      like.classList.remove("liked");
    }
  }

  // Reset progress bar slider
  if (progressBar) {
    progressBar.value = 0;
    progressBar.style.background = `linear-gradient(to right, #ffffff 0%, rgba(255, 255, 255, 0.3) 0%)`;
  }

  // Reset time counter displays
  var timeCurrent = document.querySelector("#time-current");
  var timeTotal = document.querySelector("#time-total");
  if (timeCurrent) timeCurrent.textContent = "0:00";
  if (timeTotal) timeTotal.textContent = currentTrack.duration || "0:00";
}

// Initial Call
mainfunction();

// Click Event Delegation on Song List
songList.addEventListener("click", function (elem) {
  // Like button click inside song row
  var likeBtn = elem.target.closest(".btn-song-like");
  if (likeBtn) {
    var idx = parseInt(likeBtn.getAttribute("data-index"));
    arr[idx].liked = !arr[idx].liked;
    mainfunction();
    return;
  }

  // Click on song row to select & play
  var songRow = elem.target.closest(".song");
  if (songRow) {
    var clickedId = parseInt(songRow.id);
    selectedSong = clickedId;
    mainfunction();
    play.innerHTML = `<i class="ri-pause-large-fill"></i>`;
    flag = 1;
    audio.play().catch(function (err) {
      console.log("Audio playback error:", err);
    });

    // GSAP micro animation on play launch
    if (window.gsap) {
      gsap.fromTo(
        songRow,
        { scale: 0.98 },
        { scale: 1, duration: 0.3, ease: "back.out(2)" },
      );
      gsap.fromTo(
        ".bottom-player",
        { y: 15 },
        { y: 0, duration: 0.4, ease: "power2.out" },
      );
    }
  }
});

// Play / Pause Toggle
play.addEventListener("click", function () {
  if (flag == 0) {
    play.innerHTML = `<i class="ri-pause-large-fill"></i>`;
    audio.play().catch(function (err) {
      console.log("Audio playback error:", err);
    });
    flag = 1;
  } else {
    play.innerHTML = `<i class="ri-play-large-fill"></i>`;
    audio.pause();
    flag = 0;
  }
});

// Forward Button (Next Song)
forward.addEventListener("click", function () {
  if (selectedSong < arr.length - 1) {
    selectedSong++;
  } else {
    selectedSong = 0;
  }
  mainfunction();
  play.innerHTML = `<i class="ri-pause-large-fill"></i>`;
  flag = 1;
  audio.play().catch(function (err) {
    console.log("Audio playback error:", err);
  });
});

// Backward Button (Previous Song)
backward.addEventListener("click", function () {
  if (selectedSong > 0) {
    selectedSong--;
  } else {
    selectedSong = arr.length - 1;
  }
  mainfunction();
  play.innerHTML = `<i class="ri-pause-large-fill"></i>`;
  flag = 1;
  audio.play().catch(function (err) {
    console.log("Audio playback error:", err);
  });
});

// Timeline (Progress Bar) Live Time Update
audio.addEventListener("timeupdate", function () {
  if (!isNaN(audio.duration) && audio.duration > 0) {
    var progress = (audio.currentTime / audio.duration) * 100;
    if (progressBar) {
      progressBar.value = progress;
      progressBar.style.background = `linear-gradient(to right, #ffffff ${progress}%, rgba(255, 255, 255, 0.3) ${progress}%)`;
    }

    var timeCurrent = document.querySelector("#time-current");
    var timeTotal = document.querySelector("#time-total");
    if (timeCurrent) timeCurrent.textContent = formatTime(audio.currentTime);
    if (timeTotal) timeTotal.textContent = formatTime(audio.duration);
  }
});

// Auto Next Song when audio track finishes
audio.addEventListener("ended", function () {
  selectedSong = (selectedSong + 1) % arr.length;
  mainfunction();
  play.innerHTML = `<i class="ri-pause-large-fill"></i>`;
  flag = 1;
  audio.play();
});

// User seek on timeline drag / click
if (progressBar) {
  progressBar.addEventListener("input", function () {
    if (!isNaN(audio.duration) && audio.duration > 0) {
      var time = (progressBar.value * audio.duration) / 100;
      audio.currentTime = time;
    }
  });
}

// Favorite Heart Button in Player
like.addEventListener("click", function () {
  arr[selectedSong].liked = !arr[selectedSong].liked;
  mainfunction();
});

// Volume Slider & Mute Toggle
var volumeRange = document.querySelector("#volume-range");
var btnVolumeMute = document.querySelector("#btn-volume-mute");

if (volumeRange) {
  volumeRange.addEventListener("input", function () {
    audio.volume = volumeRange.value / 100;
    updateVolumeIcon();
  });
}

if (btnVolumeMute) {
  btnVolumeMute.addEventListener("click", function () {
    audio.muted = !audio.muted;
    updateVolumeIcon();
  });
}

function updateVolumeIcon() {
  if (!btnVolumeMute) return;
  if (audio.muted || audio.volume === 0) {
    btnVolumeMute.innerHTML = `<i class="ri-volume-mute-line"></i>`;
  } else if (audio.volume < 0.5) {
    btnVolumeMute.innerHTML = `<i class="ri-volume-down-line"></i>`;
  } else {
    btnVolumeMute.innerHTML = `<i class="ri-volume-up-line"></i>`;
  }
}

// Dashboard Tabs Switching (Overview, Related Artist, Lyrics)
var tabItems = document.querySelectorAll(".tab-item");
var tabPanes = document.querySelectorAll(".tab-pane");

tabItems.forEach(function (tab) {
  tab.addEventListener("click", function () {
    var targetTab = tab.getAttribute("data-tab");

    tabItems.forEach((t) => t.classList.remove("active"));
    tabPanes.forEach((p) => p.classList.remove("active"));

    tab.classList.add("active");
    var activePane = document.getElementById("pane-" + targetTab);
    if (activePane) {
      activePane.classList.add("active");
      if (window.gsap) {
        gsap.fromTo(
          activePane,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        );
      }
    }
  });
});

// Follow Button Toggle
var btnFollow = document.querySelector("#btn-follow");
var followText = document.querySelector("#follow-text");
if (btnFollow) {
  btnFollow.addEventListener("click", function () {
    if (btnFollow.classList.contains("following")) {
      btnFollow.classList.remove("following");
      if (followText) followText.textContent = "Follow";
      btnFollow.querySelector("i").className = "ri-user-add-line";
    } else {
      btnFollow.classList.add("following");
      if (followText) followText.textContent = "Following";
      btnFollow.querySelector("i").className = "ri-user-check-line";
    }
  });
}

// Play All Button
var btnPlayAll = document.querySelector("#btn-play-all");
if (btnPlayAll) {
  btnPlayAll.addEventListener("click", function () {
    selectedSong = 0;
    mainfunction();
    play.innerHTML = `<i class="ri-pause-large-fill"></i>`;
    flag = 1;
    audio.play().catch(function (err) {
      console.log("Audio playback error:", err);
    });
  });
}

// Live Search Input Filter
var searchInput = document.querySelector("#search-input");
if (searchInput) {
  searchInput.addEventListener("input", function (e) {
    var query = e.target.value.toLowerCase().trim();
    var songRows = document.querySelectorAll(".song");
    songRows.forEach(function (row, idx) {
      var title = arr[idx].songName.toLowerCase();
      var singer = arr[idx].Singer.toLowerCase();
      if (title.includes(query) || singer.includes(query)) {
        row.style.display = "flex";
      } else {
        row.style.display = "none";
      }
    });
  });
}

// Playlist Nav Controls (Prev / Next inside Top Playlist header)
var playlistNavLeft = document.querySelector("#playlist-nav-left");
var playlistNavRight = document.querySelector("#playlist-nav-right");
if (playlistNavLeft) {
  playlistNavLeft.addEventListener("click", function () {
    backward.click();
  });
}
if (playlistNavRight) {
  playlistNavRight.addEventListener("click", function () {
    forward.click();
  });
}

// Quick Lyrics Toggle in Bottom Player
var btnLyricsQuick = document.querySelector("#btn-lyrics-quick");
if (btnLyricsQuick) {
  btnLyricsQuick.addEventListener("click", function () {
    var lyricsTab = document.querySelector('.tab-item[data-tab="lyrics"]');
    if (lyricsTab) lyricsTab.click();
  });
}

// GSAP Entrance Animations on Page Load
window.addEventListener("DOMContentLoaded", function () {
  if (window.gsap) {
    gsap.from(".top-bar", {
      y: -40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
    gsap.from(".left-sidebar", {
      x: -40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.1,
    });
    gsap.from(".glass-dashboard", {
      scale: 0.96,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      delay: 0.2,
    });
    gsap.from(".bottom-player", {
      y: 60,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      delay: 0.3,
    });
    gsap.from(".song", {
      y: 15,
      opacity: 0,
      duration: 0.5,
      stagger: 0.06,
      ease: "power2.out",
      delay: 0.4,
    });
  }
});
