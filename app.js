const intro = document.querySelector("#intro");
const ticket = document.querySelector("#ticket");
const ticketWrap = document.querySelector(".ticket-wrap");
const enterButton = document.querySelector("#enterButton");
const stamp = document.querySelector("#stamp");
const welcomeMessage = document.querySelector("#welcomeMessage");
const station = document.querySelector("#station");
const departures = document.querySelector("#departures");
const interchange = document.querySelector("#interchange");
const smallStops = document.querySelector("#smallStops");
const passengerProfile = document.querySelector("#passengerProfile");
const projectPages = [...document.querySelectorAll(".project-page")];
const routeToast = document.querySelector("#routeToast");
const motionToggle = document.querySelector("#motionToggle");
const replayIntro = document.querySelector("#replayIntro");
const transferTransition = document.querySelector("#transferTransition");
const transitionTitle = document.querySelector("#transitionTitle");
const imageLightbox = document.querySelector("#imageLightbox");
const smallStopModal = document.querySelector("#smallStopModal");

const stationAudio = document.querySelector("#stationAudio");
const musicButtons = [...document.querySelectorAll(".js-music-play")];
const musicVolumes = [...document.querySelectorAll(".js-music-volume")];
const musicTitles = [...document.querySelectorAll(".js-music-title")];
const musicStatuses = [...document.querySelectorAll(".js-music-status")];

const playlists = {
  main: [
    { src: "music/main-1.mp3", label: "MAIN-1" },
    { src: "music/main-2.mp3", label: "MAIN-2" },
    { src: "music/main-3.mp3", label: "MAIN-3" }
  ],
  miqilin: [
    { src: "music/Miqilin-1.mp3", label: "MIQILIN-1" },
    { src: "music/Miqilin-2.mp3", label: "MIQILIN-2" }
  ],
  imreading: [
    { src: "music/IMR-1.mp3", label: "IMR-1" },
    { src: "music/IMR-2.mp3", label: "IMR-2" }
  ],
  game: [
    { src: "music/Game-1.mp3", label: "GAME-1" },
    { src: "music/Game-2.mp3", label: "GAME-2" }
  ]
};

const playlistNames = {
  main: "DESIGN STATION FM",
  miqilin: "MICHELIN DINING RADIO",
  imreading: "IMREADING RADIO",
  game: "WAYFARER POST RADIO"
};

let isEntering = false;
let toastTimer;
let currentPlaylist = "main";
let currentTrack = 0;
let audioLoadError = false;
let audioPlaybackBlocked = false;

function enterStation() {
  if (isEntering) return;
  isEntering = true;

  stationAudio.muted = false;
  stationAudio.play().then(() => {
    audioPlaybackBlocked = false;
    syncMusicUI();
  }).catch(() => {
    audioPlaybackBlocked = true;
    syncMusicUI();
  });
  enterButton.disabled = true;
  ticket.classList.add("is-stamping");
  stamp.classList.add("is-visible");

  window.setTimeout(() => {
    ticketWrap.classList.add("is-hidden");
    welcomeMessage.classList.add("is-visible");
    welcomeMessage.setAttribute("aria-hidden", "false");
  }, 780);

  window.setTimeout(() => {
    station.classList.add("is-visible");
    station.setAttribute("aria-hidden", "false");
    intro.classList.add("is-leaving");
  }, 2400);

  window.setTimeout(() => {
    document.body.style.overflow = "";
  }, 3300);
}

function resetIntro() {
  isEntering = false;
  showHome(false);
  stationAudio.pause();
  document.body.style.overflow = "hidden";
  intro.classList.remove("is-leaving");
  station.classList.remove("is-visible");
  station.setAttribute("aria-hidden", "true");
  ticket.classList.remove("is-stamping");
  ticketWrap.classList.remove("is-hidden");
  stamp.classList.remove("is-visible");
  welcomeMessage.classList.remove("is-visible");
  welcomeMessage.setAttribute("aria-hidden", "true");
  enterButton.disabled = false;
  window.scrollTo({ top: 0, behavior: "instant" });
}

function updateClock() {
  const now = new Date();
  const time = new Intl.DateTimeFormat("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(now);
  const date = new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(now).toUpperCase();

  document.querySelector("#clockTime").textContent = time;
  document.querySelector("#clockDate").textContent = date.replaceAll(",", " ·");
  document.querySelector("#ticketDate").textContent =
    `${now.getFullYear()}.${now.getMonth() + 1}.${now.getDate()}`;
  document.querySelector("#stampDate").textContent =
    new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }).format(now).toUpperCase();
}

function clearSubpages() {
  station.classList.remove(
    "is-showing-departures",
    "is-showing-interchange",
    "is-showing-project",
    "is-showing-small-stops",
    "is-showing-profile"
  );
  departures.setAttribute("aria-hidden", "true");
  interchange.setAttribute("aria-hidden", "true");
  smallStops.setAttribute("aria-hidden", "true");
  passengerProfile.setAttribute("aria-hidden", "true");
  projectPages.forEach((page) => {
    page.classList.remove("is-active");
    page.setAttribute("aria-hidden", "true");
  });
}

function showHome(animate = true) {
  clearSubpages();
  document.body.classList.remove("subpage-audio");
  setPlaylist("main");
  window.scrollTo({ top: 0, behavior: animate ? "smooth" : "instant" });
}

function openDepartures() {
  clearSubpages();
  station.classList.add("is-showing-departures");
  departures.setAttribute("aria-hidden", "false");
  document.body.classList.add("subpage-audio");
  setPlaylist("main");
  window.scrollTo({ top: 0, behavior: "instant" });
}

function runTransferTransition(title, callback) {
  transitionTitle.textContent = title;
  transferTransition.classList.add("is-active");
  transferTransition.setAttribute("aria-hidden", "false");

  window.setTimeout(callback, 620);
  window.setTimeout(() => {
    transferTransition.classList.remove("is-active");
    transferTransition.setAttribute("aria-hidden", "true");
  }, 1250);
}

function openInterchange(withTransition = true) {
  const reveal = () => {
    clearSubpages();
    station.classList.add("is-showing-interchange");
    interchange.setAttribute("aria-hidden", "false");
    document.body.classList.add("subpage-audio");
    setPlaylist("main");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  if (withTransition) {
    runTransferTransition("TRANSFER TO PROJECT LINE", reveal);
  } else {
    reveal();
  }
}

function openProject(project, withTransition = true) {
  const page = document.querySelector(`#project-${project}`);
  if (!page) return;

  const reveal = () => {
    clearSubpages();
    station.classList.add("is-showing-project");
    page.classList.add("is-active");
    page.setAttribute("aria-hidden", "false");
    document.body.classList.add("subpage-audio");
    setPlaylist(project);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  if (withTransition) {
    const labels = {
      miqilin: "ARRIVING · MICHELIN RESTAURANT",
      imreading: "ARRIVING · IMREADING",
      game: "ARRIVING · WAYFARER POST"
    };
    runTransferTransition(labels[project], reveal);
  } else {
    reveal();
  }
}

function openSmallStops(withTransition = true) {
  const reveal = () => {
    clearSubpages();
    station.classList.add("is-showing-small-stops");
    smallStops.setAttribute("aria-hidden", "false");
    document.body.classList.add("subpage-audio");
    setPlaylist("main");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  if (withTransition) {
    runTransferTransition("ARRIVING · SMALL STOPS", reveal);
  } else {
    reveal();
  }
}

function openPassengerProfile(withTransition = true) {
  const reveal = () => {
    clearSubpages();
    station.classList.add("is-showing-profile");
    passengerProfile.setAttribute("aria-hidden", "false");
    document.body.classList.add("subpage-audio");
    setPlaylist("main");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  if (withTransition) {
    runTransferTransition("ARRIVING · PASSENGER PROFILE", reveal);
  } else {
    reveal();
  }
}

function setPlaylist(name) {
  if (!playlists[name]) return;
  const wasPlaying = !stationAudio.paused && !stationAudio.ended;

  if (currentPlaylist !== name || !stationAudio.src) {
    currentPlaylist = name;
    currentTrack = 0;
    loadCurrentTrack(wasPlaying);
  } else {
    syncMusicUI();
  }
}

function loadCurrentTrack(autoplay = false) {
  const track = playlists[currentPlaylist][currentTrack];
  audioLoadError = false;
  audioPlaybackBlocked = false;
  stationAudio.src = new URL(track.src, document.baseURI).href;
  stationAudio.load();
  syncMusicUI();

  if (autoplay) {
    stationAudio.play().then(() => {
      audioPlaybackBlocked = false;
      syncMusicUI();
    }).catch(() => {
      audioPlaybackBlocked = true;
      syncMusicUI();
    });
  }
}

async function toggleMusic() {
  if (!stationAudio.src) loadCurrentTrack(false);

  if (stationAudio.paused) {
    try {
      stationAudio.muted = false;
      await stationAudio.play();
      audioPlaybackBlocked = false;
    } catch {
      audioPlaybackBlocked = true;
      syncMusicUI();
    }
  } else {
    stationAudio.pause();
  }
}

function changeTrack(direction) {
  const tracks = playlists[currentPlaylist];
  const wasPlaying = !stationAudio.paused;
  currentTrack = (currentTrack + direction + tracks.length) % tracks.length;
  loadCurrentTrack(wasPlaying);
}

function syncMusicUI() {
  const track = playlists[currentPlaylist][currentTrack];
  const playing = !stationAudio.paused && !stationAudio.ended;

  musicButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(playing));
    const icon = button.querySelector(".music-icon");
    if (icon) icon.textContent = playing ? "Ⅱ" : "▶";
    else button.textContent = playing ? "Ⅱ" : "▶";
  });

  musicTitles.forEach((title) => {
    title.textContent = playlistNames[currentPlaylist];
  });

  musicStatuses.forEach((status) => {
    if (audioLoadError) {
      status.textContent = `${track.label} · AUDIO LOAD ERROR`;
    } else if (audioPlaybackBlocked) {
      status.textContent = `${track.label} · TAP PLAY AGAIN`;
    } else {
      status.textContent = `${track.label} · ${playing ? "PLAYING" : "READY"}`;
    }
  });
}

function showRouteToast(route) {
  const routeNames = {
    about: ["About Me / 关于我", "个人档案分站将在下一阶段接入。"],
    fragments: ["Tiny Sparks / 细碎创意", "平时作业陈列分站将在下一阶段接入。"]
  };

  if (route === "home") {
    showHome();
    return;
  }

  if (route === "crossroads") {
    openInterchange(true);
    return;
  }

  if (route === "fragments") {
    openSmallStops(true);
    return;
  }

  if (route === "about") {
    openPassengerProfile(true);
    return;
  }

  const [title, message] = routeNames[route] || ["线路建设中", "该分站将在下一阶段接入。"];
  routeToast.querySelector("strong").textContent = title;
  routeToast.querySelector("p").textContent = message;
  routeToast.classList.add("is-visible");

  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    routeToast.classList.remove("is-visible");
  }, 3600);
}

function openLightbox(src) {
  imageLightbox.querySelector("img").src = src;
  imageLightbox.classList.add("is-visible");
  imageLightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
  imageLightbox.classList.remove("is-visible");
  imageLightbox.setAttribute("aria-hidden", "true");
}

function openSmallStopModal(card) {
  const modalMedia = smallStopModal.querySelector(".small-modal-media");
  const modalImage = smallStopModal.querySelector("#smallModalImage");
  const modalVideo = smallStopModal.querySelector("#smallModalVideo");
  const modalFrame = smallStopModal.querySelector("#smallModalFrame");
  const modalGallery = smallStopModal.querySelector("#smallModalGallery");
  const prototypeLink = smallStopModal.querySelector("#smallModalPrototype");
  const images = card.dataset.images ? card.dataset.images.split("|") : [];
  const captions = card.dataset.captions ? card.dataset.captions.split("|") : [];
  const videos = card.dataset.videos ? card.dataset.videos.split("|") : [];
  const videoCaptions = card.dataset.videoCaptions ? card.dataset.videoCaptions.split("|") : [];
  const prototype = card.dataset.prototype || "";
  const shouldLoop = card.dataset.loop === "true";

  function selectGalleryButton(activeButton) {
    modalGallery.querySelectorAll("button").forEach((item) => {
      item.classList.toggle("is-active", item === activeButton);
    });
  }

  modalGallery.replaceChildren();
  modalMedia.classList.toggle("is-prototype", Boolean(prototype));
  modalMedia.classList.toggle("is-video", videos.length > 0);
  modalImage.hidden = Boolean(prototype) || videos.length > 0;
  modalVideo.hidden = videos.length === 0;
  modalFrame.hidden = !prototype;
  prototypeLink.hidden = !prototype;

  if (prototype) {
    modalVideo.pause();
    modalVideo.removeAttribute("src");
    modalFrame.src = prototype;
    prototypeLink.href = prototype;
  } else if (videos.length > 0) {
    modalFrame.removeAttribute("src");
    modalVideo.loop = shouldLoop;
    modalVideo.src = videos[0];
    modalVideo.load();
    modalVideo.play().catch(() => {});

    if (videos.length > 1) {
      videos.forEach((src, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = index === 0 ? "is-active" : "";
        button.textContent = videoCaptions[index] || `DEMO ${index + 1}`;
        button.addEventListener("click", () => {
          modalVideo.src = src;
          modalVideo.load();
          modalVideo.play().catch(() => {});
          selectGalleryButton(button);
        });
        modalGallery.append(button);
      });
    }
  } else {
    modalFrame.removeAttribute("src");
    modalVideo.pause();
    modalVideo.removeAttribute("src");
    modalImage.src = images[0] || "";
    modalImage.alt = `${card.dataset.title} 大图预览`;

    if (images.length > 1) {
      images.forEach((src, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = index === 0 ? "is-active" : "";
        button.textContent = captions[index] || `${index + 1}`;
        button.addEventListener("click", () => {
          modalImage.src = src;
          selectGalleryButton(button);
        });
        modalGallery.append(button);
      });
    }
  }

  smallStopModal.querySelector("#smallModalTitle").textContent = card.dataset.title;
  smallStopModal.querySelector("#smallModalDate").textContent = card.dataset.date;
  smallStopModal.querySelector("#smallModalType").textContent = card.dataset.type;
  smallStopModal.querySelector("#smallModalTools").textContent = card.dataset.tools;
  smallStopModal.querySelector("#smallModalKeywords").textContent = card.dataset.keywords;
  smallStopModal.querySelector("#smallModalDesc").textContent = card.dataset.desc;

  smallStopModal.classList.add("is-visible");
  smallStopModal.setAttribute("aria-hidden", "false");
}

function closeSmallStopModal() {
  smallStopModal.classList.remove("is-visible");
  smallStopModal.setAttribute("aria-hidden", "true");
  smallStopModal.querySelector("#smallModalFrame").removeAttribute("src");
  const modalVideo = smallStopModal.querySelector("#smallModalVideo");
  modalVideo.pause();
  modalVideo.removeAttribute("src");
  modalVideo.load();
}

enterButton.addEventListener("click", enterStation);
replayIntro.addEventListener("click", resetIntro);

document.querySelectorAll("[data-open-departures]").forEach((control) => {
  control.addEventListener("click", openDepartures);
});

document.querySelectorAll("[data-close-departures]").forEach((control) => {
  control.addEventListener("click", () => showHome());
});

document.querySelectorAll("[data-route]").forEach((control) => {
  control.addEventListener("click", () => showRouteToast(control.dataset.route));
});

document.querySelectorAll("[data-project]").forEach((control) => {
  control.addEventListener("click", () => openProject(control.dataset.project));
});

document.querySelectorAll("[data-back-interchange]").forEach((control) => {
  control.addEventListener("click", () => openInterchange(false));
});

document.querySelectorAll("[data-next-project]").forEach((control) => {
  control.addEventListener("click", () => openProject(control.dataset.nextProject));
});

document.querySelectorAll("[data-lightbox]").forEach((control) => {
  control.addEventListener("click", () => openLightbox(control.dataset.lightbox));
});

document.querySelectorAll("[data-small-filter]").forEach((filter) => {
  filter.addEventListener("click", () => {
    const category = filter.dataset.smallFilter;
    document.querySelectorAll("[data-small-filter]").forEach((item) => {
      item.classList.toggle("is-active", item === filter);
    });
    document.querySelectorAll(".small-card").forEach((card) => {
      const categories = card.dataset.category.split(/\s+/);
      const isVisible = category === "all" || categories.includes(category);
      card.classList.toggle("is-filtered-out", !isVisible);
    });
  });
});

document.querySelectorAll(".small-card").forEach((card) => {
  card.addEventListener("click", () => openSmallStopModal(card));
});

smallStopModal.querySelector(".small-modal-close").addEventListener("click", closeSmallStopModal);
smallStopModal.addEventListener("click", (event) => {
  if (event.target === smallStopModal) closeSmallStopModal();
});

musicButtons.forEach((button) => button.addEventListener("click", toggleMusic));
document.querySelector(".global-track-prev").addEventListener("click", () => changeTrack(-1));
document.querySelector(".global-track-next").addEventListener("click", () => changeTrack(1));

musicVolumes.forEach((input) => {
  input.addEventListener("input", () => {
    stationAudio.volume = Number(input.value) / 100;
    musicVolumes.forEach((other) => {
      if (other !== input) other.value = input.value;
    });
  });
});

stationAudio.addEventListener("play", syncMusicUI);
stationAudio.addEventListener("pause", syncMusicUI);
stationAudio.addEventListener("ended", () => changeTrack(1));
stationAudio.addEventListener("canplay", () => {
  audioLoadError = false;
  syncMusicUI();
});
stationAudio.addEventListener("error", () => {
  audioLoadError = true;
  syncMusicUI();
});

routeToast.querySelector("button").addEventListener("click", () => {
  routeToast.classList.remove("is-visible");
});

imageLightbox.querySelector("button").addEventListener("click", closeLightbox);
imageLightbox.addEventListener("click", (event) => {
  if (event.target === imageLightbox) closeLightbox();
});

motionToggle.addEventListener("click", () => {
  const isReduced = document.body.classList.toggle("reduce-motion");
  motionToggle.setAttribute("aria-pressed", String(isReduced));
  motionToggle.lastChild.textContent = isReduced ? " Motion Off" : " Motion On";
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !intro.classList.contains("is-leaving")) {
    enterStation();
  }

  if (event.key === "Escape") {
    routeToast.classList.remove("is-visible");
    if (smallStopModal.classList.contains("is-visible")) {
      closeSmallStopModal();
    } else if (imageLightbox.classList.contains("is-visible")) {
      closeLightbox();
    } else if (station.classList.contains("is-showing-project")) {
      openInterchange(false);
    } else if (station.classList.contains("is-showing-small-stops")) {
      openDepartures();
    } else if (station.classList.contains("is-showing-profile")) {
      showHome();
    } else if (
      station.classList.contains("is-showing-interchange") ||
      station.classList.contains("is-showing-departures")
    ) {
      showHome();
    }
  }
});

document.body.style.overflow = "hidden";
stationAudio.volume = Number(musicVolumes[0].value) / 100;
loadCurrentTrack(false);
updateClock();
window.setInterval(updateClock, 30000);
