(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) return;
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) processPreload(link);
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep) return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const getElement = (selector, type) => {
  const element = document.querySelector(selector);
  if (element instanceof type) return element;
  else throw new Error(`element is not instance of ${type.name}`);
};
const star_empty = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAxCAYAAACcXioiAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQ4SURBVHgB7VlNctMwFP7UwrRl0/YGzgloNwyURd0TQE5AeoK2J2hyAuAEaU9QOEHMgvCzSW9QcwLChqbDNOI9RVEk106sWGZY5JvR+FlRJD29fxlYYYX/F/I79uQXxKgRAjWANh3Ro0ct0l0ptSPxQj2DYg31oIvZ5qHpLmpAcAno07+ZdWBIq+zoN5ZCgoCoQwLnhhK4oBUS8y7xGoFRhwT49CP9eqSfPb3aEBtoiH16BkJQCdDmW7AMl9VFq0w6GUCqdKvGBENoFXpj0R2LvjSUwCsERDAGtPHGVldiqBHeWf0xxwcEQkgJOMZr+3xxpHQ+Mb//CWfMIRmIDSUtlZlhplLrOJED41orIQgDecabHaP6pPY+E2OOEQChJFBkvC4E3lv0CQIgNw4o8Y6UiCNicQdjanxqQrVtQ0s9xk0bGkU5j+zR+E38tFa/1pF6aD1/GXrqfteJfkySzYkfImfjV8CS4mXjfY7jeUNkn+YXSxvxBR3Amc3II+fnEd4CS+tmQlH2bOGoO2JwC8umFS3aI8MckiuBPol3lnilqs3EyfjxQORjak/yxTsPStq/tYraKikMvY2pak769/SOhyTl3ek8j+aswb68g5qgGb4uM1Z+oxgzzg9+rheyvQTQll9xFcpfLwNeW9nMGG2r+4M9xmWAQ760BrCejjDQacI/hVqT1nYMXtDeMnYmCv7chp0asC2soymelRN5VcjPpC5ryhtGpnOMjnjpSEIhN5CR7reJNZvTCPckiT5OUTNIbU9oVwPYm5fkOnM2z5hb0OSeBNlGXcatjbVtdaX03qTNF0p+YUWWc8Mw1cXjUJWVchS3VPS7+s5RurnoJqNUSalSgI3MAnw6m9ivyoSO/lmVuaRgd1pm7lLJHOfz4gBNuIlaFKQ8HKlDicw7G+sBWmUPxisbVcYtrVixhqeojtiiO0XGWgT/dFqoED+BpNSiOlJrPu+g6c+AdEJ6gupIDLVEwe91L5S9dSOVqnyvpB3EjUkiN7Hr4xj8JBD+9CcFv7D8/MgvzfZjwBXxp0XDPa7XZ3NJvysXXxuILTopGsSbppRgwOkHvfb4unFBQpgYytMOSuuwo/+ZosKM4aB0R+mALMiZJGW7lLLnRddMMdUo+y3BRwKxtZEHuYlSFY6o9ualrtymEOq3nr6GcSGcOWOUhA8Dh5ht7KMhSTLUOFdy8yVWC4F91eBcdPGYLv2n66iVNSf95xAlsZwE9Gmp1FcqPY+tjQxpVk7C1Ccl3VqYFOKpNR/39UyKbktAlpeAjw1I65Xv/c+RFTWnGVuUbhf4cX3ibbgXYYxUzSlVBeZlBz4M9FCsmym147Kfj9Tt9P2DOiOLUgz4qFCnsJ/Tao9vX1ya0vjGnDnTsl7IL5XoU5Sc3GlGyhNR2Vn106lSK6lu66YBLEVNn2RrBZevqoRdYYUVvPAXJrOCc9SFL6sAAAAASUVORK5CYII=";
const posterError = "/javascript-movie-review/assets/poster_error-DblrZ2j-.png";
const addMovieList = (movieDisplay, movieList) => {
  movieList.forEach((movie) => {
    const li = document.createElement("li");
    li.innerHTML = /*html*/
    ` 
    <div class="item" >
      <img
        class="thumbnail"
        src=${movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : posterError}
        alt=${movie.title}
      />
      <div class="item-desc">
        <p class="rate">
          <img class="star" src="${star_empty}" />
          <span class="vote-average">${movie.vote_average ? movie.vote_average.toFixed(1) : 0}</span>
        </p>
        <strong class="title">${movie.title}</strong>
      </div>
    </div>`;
    movieDisplay.appendChild(li);
  });
};
const addMovieSkeletonUIList = (movieDisplay, count = 20) => {
  Array.from({ length: count }, () => {
    const li = document.createElement("li");
    li.className = "skeleton-li";
    li.innerHTML = /*html*/
    ` 
    <div class="skeleton-item">
      <div class="square"></div>
      <div class="first-line"></div>
        <div class="second-line"></div>
    </div>`;
    movieDisplay.appendChild(li);
  });
};
const removeMovieSkeletonUIList = (movieDisplay) => {
  movieDisplay.querySelectorAll(".skeleton-li").forEach((it) => it.remove());
};
const showBackgroundMovieInfo = (movie) => {
  const voteAverage = getElement(".rate-value", HTMLElement);
  voteAverage.textContent = movie.vote_average ? movie.vote_average.toFixed(1) : "0";
  const title = getElement(".title", HTMLElement);
  title.textContent = movie.title;
  const img = getElement(".overlay > img", HTMLImageElement);
  img.src = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
};
const fetchDefaultMovieList = async (pageNum) => {
  const data = await request("/movie/popular", { page: pageNum });
  return data.results;
};
const fetchSearchMovieList = async (pageNum, searchBarText) => {
  const data = await request("/search/movie", {
    page: pageNum,
    query: searchBarText
  });
  return data.results;
};
const fetchMovieDetail = async (movieId) => {
  const data = await request(`/movie/${movieId}`, {});
  return data;
};
const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "f7c82d8d69637b69b5e8841185b42153";
const LANGUAGE = "ko-KR";
const request = async (path, params) => {
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.append("api_key", API_KEY);
  url.searchParams.append("language", LANGUAGE);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });
  const response = await fetch(url);
  if (!response.ok) throw new Error("영화 정보를 불러오지 못했습니다.");
  return response.json();
};
const loadMovies = async ({
  state: state2,
  reset = false
}) => {
  const movieDisplay = getElement(".thumbnail-list", HTMLUListElement);
  if (reset) movieDisplay.replaceChildren();
  addMovieSkeletonUIList(movieDisplay);
  try {
    const fetchedMovies = state2.searchBarText === "" ? await fetchDefaultMovieList(state2.pageNum) : await fetchSearchMovieList(state2.pageNum, state2.searchBarText);
    state2.movieList = reset ? fetchedMovies : [...state2.movieList, ...fetchedMovies];
    addMovieList(movieDisplay, fetchedMovies);
  } finally {
    removeMovieSkeletonUIList(movieDisplay);
  }
};
const showDetailModal = (movieDetail) => {
  const modalBackground = getElement(".modal-background", HTMLElement);
  modalBackground.classList.add("active");
  const poster = getElement(".modal-image > img", HTMLImageElement);
  poster.src = movieDetail.poster_path ? `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}` : posterError;
  const title = getElement(".modal-description h2", HTMLElement);
  title.textContent = movieDetail.title ?? "제목 없음";
  const category = getElement(".modal-description .category", HTMLElement);
  category.textContent = `${movieDetail.release_date.slice(0, 4) ?? "개봉 년도 없음"} · ${movieDetail.genres.map((genre) => genre.name).join(", ") ?? "장르 없음"}`;
  const rate = getElement(".rate_average", HTMLElement);
  rate.textContent = `${movieDetail.vote_average.toFixed(1) ?? 0}`;
  const starContainer = getElement(".star-container", HTMLElement);
  starContainer.setAttribute("data-movie-id", String(movieDetail.id));
  const detail = getElement(".detail", HTMLElement);
  detail.textContent = movieDetail.overview ? movieDetail.overview : "상세 설명 없음";
  modalBackground.querySelector(".close-modal")?.addEventListener("click", () => {
    hideDetailModal();
  });
  addEventListener("keydown", (event) => {
    if (event.key === "Escape") hideDetailModal();
  });
  document.body.classList.add("stop-scrolling");
};
const hideDetailModal = () => {
  const modalBackground = getElement(".modal-background", HTMLElement);
  modalBackground.classList.remove("active");
  document.body.classList.remove("stop-scrolling");
};
const hideErrorText = () => {
  const errorContainer = getElement(".error-container", HTMLElement);
  errorContainer.hidden = true;
  const errorText = getElement(".error-text", HTMLElement);
  errorText.textContent = "";
};
const showErrorText = (string) => {
  const errorContainer = getElement(".error-container", HTMLElement);
  errorContainer.hidden = false;
  const errorText = getElement(".error-text", HTMLElement);
  errorText.textContent = string;
};
const updateTitleText = (state2) => {
  const description = getElement(".page-title", HTMLElement);
  const backgroundContainer = getElement(".background-container", HTMLElement);
  const overlay = getElement(".overlay", HTMLElement);
  const topRatedContainer = getElement(".top-rated-container", HTMLElement);
  const isPopularPage = state2.searchBarText === "";
  backgroundContainer.classList.toggle("is-search-mode", !isPopularPage);
  overlay.hidden = !isPopularPage;
  topRatedContainer.hidden = !isPopularPage;
  description.textContent = isPopularPage ? "지금 인기 있는 영화" : `'${state2.searchBarText}' 검색 결과`;
};
const star_filled = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAxCAYAAACcXioiAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKXSURBVHgB7ZhBbtQwFIZ/zyAxu8IN0hNANqh0Q+YG9ASlJyhzgpmeADgBvQG9QbOCJXMDwgnIqoyEqPnjcWmVxElsPU9bKZ/kZuQ4rp/f+/OeA4yMjDxqFCKhvyHh7B+gUWKGhUp5jcATxGPJxb81v67wk39XiMAE8cj+/5riVH/HM0QgigEMn3e8JLcdXPzvOwYJEssDx40ehVNEQFzERrzAj9abU6TqFdYQJIYHls47f6yoBYlhQOa8E0HMogY0xNsYIC9maQ8c944QFrOYiDvFW2eG51KZWdIDy8Ejr/AeQnh7wIhwwzZl+8s2YbvGC/iXCmd8ds1nS85Vcq6qZip9PdNqAMOh2s3ENMUFattUnHKguQAaoYwhBbarLNm3Vq9pdI2GAfZN8hkPEc2q9hAf73ZNWgbtZpdDUM3wahhgLTzDQ0PjE0PovN7tFDFDaQWfN0tMWkLnhs63EI3IsNVDgvtgK+Yj7nzuGtL7GrUJ6hK7N6Jgm3PxRdeg3kRmJ5iz5dgdOXNC2rf4Cq9EthNdVGI9HJ6p/TNxTCM6xOoiqJjTX3kwUfgCWeZdYnURXI3SE1XlmUCGgovfRwBhHrhktp7hFyQJLLHDyukZXkKaTdicYQZo+cN56JyhB5o3kCdoTv/XaIz4vyFAB/4eeBrnE6Eh4ItFSAhlA8cVbCe2FQOfyeBJiAH9scpywNYy56aG3yA1fRJz1/CrhfriX/GQXpUDjow6qLL11IGfB1zxr82he6EOzK7nrser6tJmXPeJz1MHfgao1mSTsz/1KcJoxIqXfT530XI7gwd+BlzzH2rr3u31hIuZD6nb6xhvHOAIdZFPsAcPQsrpBNUuzXAh9XnQzrnipuxxRYuQDRkZGRm5H/4BIkyx5W7xkPAAAAAASUVORK5CYII=";
const getRateDescription = (userRate) => {
  switch (userRate) {
    case 1:
      return "최악이예요";
    case 2:
      return "별로예요";
    case 3:
      return "보통이에요";
    case 4:
      return "재미있어요";
    case 5:
      return "명작이에요";
    default:
      return "별점 평가 전";
  }
};
const getRateScoreText = (userRate) => {
  return userRate === 0 ? "(0/10)" : `(${userRate * 2}/10)`;
};
const renderUserRate = (movieId, userRate) => {
  const ratingContainer = getElement(
    `.star-container[data-movie-id="${movieId}"]`,
    HTMLElement
  );
  const stars = ratingContainer.querySelectorAll(".star");
  stars.forEach((star) => {
    if (!(star instanceof HTMLImageElement)) return;
    const value = Number(star.getAttribute("value"));
    const isActive = value <= userRate;
    star.src = isActive ? star_filled : star_empty;
  });
  const description = getElement(".rate-description", HTMLElement);
  description.textContent = getRateDescription(userRate);
  const percentage = getElement(".rate-percentage", HTMLElement);
  percentage.textContent = getRateScoreText(userRate);
};
const createMovieController = (state2) => ({
  initPage: async () => {
    try {
      await loadMovies({ state: state2, reset: false });
      if (state2.movieList[0]) {
        showBackgroundMovieInfo(state2.movieList[0]);
      }
    } catch (error) {
      showErrorText("초기 화면을 불러오지 못했습니다.");
    }
  },
  loadMoreMovies: async () => {
    try {
      state2.pageNum++;
      await loadMovies({ state: state2 });
    } catch (error) {
      state2.pageNum -= 1;
      window.scrollTo({ top: 0 });
      showErrorText("영화를 추가로 불러오지 못했습니다.");
    }
  },
  searchMovies: async (searchBarText) => {
    state2.pageNum = 1;
    state2.searchBarText = searchBarText;
    try {
      hideErrorText();
      updateTitleText(state2);
      await loadMovies({ state: state2, reset: true });
      if (state2.searchBarText !== "" && state2.movieList.length === 0)
        showErrorText("검색 결과가 없습니다.");
    } catch (error) {
      showErrorText("검색 결과를 불러오지 못했습니다.");
    }
  },
  clickMovie: async (title) => {
    const selectedMovie = state2.movieList.find((movie) => movie.title == title);
    if (!selectedMovie) return;
    if (state2.searchBarText === "") showBackgroundMovieInfo(selectedMovie);
    try {
      const movieDetail = await fetchMovieDetail(selectedMovie.id);
      showDetailModal(movieDetail);
      renderUserRate(movieDetail.id, state2.userRating[movieDetail.id] ?? 0);
    } catch (error) {
      showErrorText("영화 상세 정보를 불러오지 못했습니다.");
    }
  }
});
const Rating_Key = "user-rate";
const loadUserRate = () => {
  const saved = localStorage.getItem(Rating_Key);
  if (!saved) return {};
  try {
    return JSON.parse(saved);
  } catch {
    return {};
  }
};
const saveUserRate = (rating) => {
  localStorage.setItem(Rating_Key, JSON.stringify(rating));
};
const createRatingController = (state2) => ({
  initUserRating: () => {
    state2.userRating = loadUserRate();
  },
  ratingUserRate: (movieId, userRate) => {
    state2.userRating[movieId] = userRate;
    saveUserRate(state2.userRating);
    renderUserRate(movieId, userRate);
  }
});
const bindRatingEvent = ({ onRate }) => {
  const ratingContainer = getElement(".star-container", HTMLElement);
  ratingContainer.addEventListener("click", (event) => {
    const target = event.target;
    const star = target.closest(".star");
    if (!star) return;
    const movieId = Number(ratingContainer.getAttribute("data-movie-id"));
    const userRate = Number(star.getAttribute("value"));
    onRate(movieId, userRate);
  });
};
const bindMovieEvents = ({ onMore, onSearch, onClick }) => {
  window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2)
      onMore();
  });
  const searchBar = getElement(".search-bar", HTMLInputElement);
  searchBar.addEventListener("keydown", (event) => {
    if (event.isComposing) return;
    if (event.key === "Enter") onSearch(searchBar.value);
  });
  const searchBtn = getElement(".search-btn", HTMLButtonElement);
  searchBtn.addEventListener("click", () => {
    onSearch(searchBar.value);
  });
  const thumbnailList = getElement(".thumbnail-list", HTMLElement);
  thumbnailList.addEventListener("click", (event) => {
    const target = event.target;
    const item = target.closest(".item");
    const title = item?.querySelector(".title")?.textContent;
    if (!title) return;
    onClick(title);
  });
};
const state = {
  pageNum: 1,
  searchBarText: "",
  movieList: [],
  userRating: {}
};
addEventListener("load", async () => {
  const movieController = createMovieController(state);
  const ratingController = createRatingController(state);
  try {
    await movieController.initPage();
    ratingController.initUserRating();
  } finally {
    bindMovieEvents({
      onMore: movieController.loadMoreMovies,
      onSearch: movieController.searchMovies,
      onClick: movieController.clickMovie
    });
    bindRatingEvent({ onRate: ratingController.ratingUserRate });
  }
});
