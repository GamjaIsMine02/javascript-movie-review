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
const logo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAAAUCAYAAACtZULwAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAUdSURBVHgB7VrhcRsrEP6cyX+rBFyBlQpMKrBeBZYreHYFUip4cgVSKkhSgXgVRKlApAKrAx77AA+3t3CcpHGcmXwzjO5gF5Zd2GU5XTjnlgDsxcXFxj9r/0xl5csDulh5mgOrQ+Qfgsj72vCyOl7n5brAifDdKv+zZ9Ub3/V9ZWzS+RVeEy7g2ZetL/v4rlwfWuCdujYovAFIguEMKOhrPTD2HmdElEHnhdO8z56VL5NKf1NfjFD3B28DS1/usnfrS8dzJGPvvEv56IJLXhQ6uxbqfjdjf8KvAx/71cNaMraKhr6p0GqhrkZfhR+PvIhC36NYXw5+8e0E+o7n8TS20rdEu0G7bNMoW8Ihlt2R548Nez8UxlWQvaxFXS+XQn+qM54rxFgX4jjHhHXWi0Ol/jIeivNbN4y9L4uM70GgmUOAr18LtBPXl2/P+HSjbN99meVKFWh4zN6z9m1usCjzc8PYe9fVy9y1Yfsu8hgE//6UyWcFPU5zxQjtO1TggtFpkhrDINplphQj0JQ8i2bvZmg3urBwWmUjPXzJDX4iaGHMUT8zJSgEvTxgJJKxk/vIXcG/Av208FzjybFG24Ry0G6bRffFDdZTtqfl7pfwGcNYYDz+wYlwwVses2j+xkgkY5OCaFXPszZpl14XnhMsCoi7WgtN5E3uY3ks9HEbf7+x+onrp3Va4DeoIHopxaqtLx8RPB6VD+jLptzpaaW0aWw2bhqb20PF3wPKerdZeYnZFINoB23iO01CyqFfYlzkyfHs5NiV+tNC/VcuXaGPfWyT4tMD49+y9u9Z235Ev0tBtqVAN3cnxGwn62UrjL0R6NTQ3HK8Z6vgOb2Q2/QMtGpyt0uTmsT4x1dkNV6jv3NEHjo1u/5dR5KBFseatWmEG7/kEjVrb3HhSqi79f3dNNCdCklvOhqL2n4geKZlLC8oZSMlJGOT4fYFQTSrmzr54ukHzgeLrmL/NzYtMj+2YTLlBtFCXwbHofUOQeEExDnRgrwT+qVC8TydJ8geFPbMWEMTUsy2CEm/Ye2SAaeQFWFQx9iDWQn8EEhxO8lzy9osz0vfIryMcwT92wFSmid5tq2Ts6Eq0s4mpSxjnNJZe+mQJhnOoo4DzgOD/slZQ/ZCBqeNYxvozrKYSP8IKZVGmAd5LDKupGuFkPpdjbngScZOMYJ3bAQeLdQdYoxXGIfSble8//TgxzHCWeI2unfO1xKvO/1n+ObHWqEB7oQTeeRVrHoVjZ9SSSoL9EMbufgNGpGMnY7vCpkS42Gpd0gT+mlZ3RJN71LEyRcVnNegm5uSMjSjoQVo0IZDQbYVk+0L+jnxX5DnNvP0PxHiq0EZS/Tj9VWSKYahtJG4R6uFRhUzgp+pouVDiOQeOVoOZxZhArmA0+hRbHxPd9JD/VPczpVOfAuBphVGqJsxZV1CvvxId+YcuUwGZVihbu3H5vLfQR47geykWPu88xZzst737Kx95YYxi7TFPDu2L91xUExm1cAzZxOv5qKu7U7cVfhL99rLwti1PLsVOht/ULfvMl0oyG7hWBctYYXxB5pPPM2I73aA7yvG4R5tB7Icj9nzE45AdPHH8H5m4YF0a2sM5MaJgdz4owu7gdxF7h4M6m7owIwh0ab4Q78f4jiUJikUPnEiuOFNJXV6Qj/VSih9htyhq5CX53g+oWtJ8lJ3mWxokS1mM9R+w/hsYeycl77opXB5DXnjpXBhaHz6G1neGOd75YKXpX4umRz4Dz1my31xwGpxAAAAAElFTkSuQmCC";
const starEmpty = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAxCAYAAACcXioiAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQ4SURBVHgB7VlNctMwFP7UwrRl0/YGzgloNwyURd0TQE5AeoK2J2hyAuAEaU9QOEHMgvCzSW9QcwLChqbDNOI9RVEk106sWGZY5JvR+FlRJD29fxlYYYX/F/I79uQXxKgRAjWANh3Ro0ct0l0ptSPxQj2DYg31oIvZ5qHpLmpAcAno07+ZdWBIq+zoN5ZCgoCoQwLnhhK4oBUS8y7xGoFRhwT49CP9eqSfPb3aEBtoiH16BkJQCdDmW7AMl9VFq0w6GUCqdKvGBENoFXpj0R2LvjSUwCsERDAGtPHGVldiqBHeWf0xxwcEQkgJOMZr+3xxpHQ+Mb//CWfMIRmIDSUtlZlhplLrOJED41orIQgDecabHaP6pPY+E2OOEQChJFBkvC4E3lv0CQIgNw4o8Y6UiCNicQdjanxqQrVtQ0s9xk0bGkU5j+zR+E38tFa/1pF6aD1/GXrqfteJfkySzYkfImfjV8CS4mXjfY7jeUNkn+YXSxvxBR3Amc3II+fnEd4CS+tmQlH2bOGoO2JwC8umFS3aI8MckiuBPol3lnilqs3EyfjxQORjak/yxTsPStq/tYraKikMvY2pak769/SOhyTl3ek8j+aswb68g5qgGb4uM1Z+oxgzzg9+rheyvQTQll9xFcpfLwNeW9nMGG2r+4M9xmWAQ760BrCejjDQacI/hVqT1nYMXtDeMnYmCv7chp0asC2soymelRN5VcjPpC5ryhtGpnOMjnjpSEIhN5CR7reJNZvTCPckiT5OUTNIbU9oVwPYm5fkOnM2z5hb0OSeBNlGXcatjbVtdaX03qTNF0p+YUWWc8Mw1cXjUJWVchS3VPS7+s5RurnoJqNUSalSgI3MAnw6m9ivyoSO/lmVuaRgd1pm7lLJHOfz4gBNuIlaFKQ8HKlDicw7G+sBWmUPxisbVcYtrVixhqeojtiiO0XGWgT/dFqoED+BpNSiOlJrPu+g6c+AdEJ6gupIDLVEwe91L5S9dSOVqnyvpB3EjUkiN7Hr4xj8JBD+9CcFv7D8/MgvzfZjwBXxp0XDPa7XZ3NJvysXXxuILTopGsSbppRgwOkHvfb4unFBQpgYytMOSuuwo/+ZosKM4aB0R+mALMiZJGW7lLLnRddMMdUo+y3BRwKxtZEHuYlSFY6o9ualrtymEOq3nr6GcSGcOWOUhA8Dh5ht7KMhSTLUOFdy8yVWC4F91eBcdPGYLv2n66iVNSf95xAlsZwE9Gmp1FcqPY+tjQxpVk7C1Ccl3VqYFOKpNR/39UyKbktAlpeAjw1I65Xv/c+RFTWnGVuUbhf4cX3ibbgXYYxUzSlVBeZlBz4M9FCsmym147Kfj9Tt9P2DOiOLUgz4qFCnsJ/Tao9vX1ya0vjGnDnTsl7IL5XoU5Sc3GlGyhNR2Vn106lSK6lu66YBLEVNn2RrBZevqoRdYYUVvPAXJrOCc9SFL6sAAAAASUVORK5CYII=";
const getElement = (selector) => {
  const element = document.querySelector(selector);
  if (element instanceof HTMLElement) return element;
  else throw new Error("element is not instance of HTMLElement");
};
const getUListElement = (selector) => {
  const element = document.querySelector(selector);
  if (element instanceof HTMLUListElement) return element;
  else throw new Error("element is not instance of HTMLUListElement");
};
const getInputElement = (selector) => {
  const element = document.querySelector(selector);
  if (element instanceof HTMLInputElement) return element;
  else throw new Error("element is not instance of HTMLInputElement");
};
const addMovieList = (movieDisplay, movieList) => {
  movieList.forEach((movie) => {
    const li = document.createElement("li");
    li.innerHTML = /*html*/
    ` 
    <div class="item" >
      <img
        class="thumbnail"
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        alt=${movie.title}
      />
      <div class="item-desc">
        <p class="rate">
          <img class="star" src="${starEmpty}" />
          <span class="vote-average">${movie.vote_average.toFixed(1)}</span>
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
  const background = getElement(".background-container");
  background.innerHTML = /*html*/
  `
          <div class="overlay" aria-hidden="true">
           <img src="https://image.tmdb.org/t/p/w500${movie.backdrop_path}" alt="영화 이미지" />
          </div>
          <div class="top-rated-container">
            <h1 class="logo">
              <img src="${logo}" alt="MovieList" />
            </h1>
            <div class="top-rated-movie">
              <div class="rate">
                <img src="${starEmpty}" class="star" />
                <span class="rate-value">${movie.vote_average.toFixed(1)}</span>
              </div>
              <div class="title">${movie.title}</div>
            </div> 
          </div>
  `;
};
const bindMovieEvents = ({ onMore, onSearch, onClick }) => {
  const moreBtn = getElement(".display-more-btn");
  moreBtn.addEventListener("click", () => {
    onMore();
  });
  const searchBar = getInputElement(".search-bar");
  searchBar.addEventListener("keydown", (event) => {
    if (event.isComposing) return;
    if (event.key === "Enter") onSearch(searchBar.value);
  });
  const searchBtn = getElement(".search-btn");
  searchBtn.addEventListener("click", () => {
    onSearch(searchBar.value);
  });
  const thumbnailList = getElement(".thumbnail-list");
  thumbnailList.addEventListener("click", (event) => {
    const target = event.target;
    const item = target.closest(".item");
    const title = item?.querySelector(".title")?.textContent;
    if (!title) return;
    onClick(title);
  });
};
const hideSearchErrorText = () => {
  const searchError = getElement(".search-error-text");
  searchError.textContent = "";
  searchError.hidden = true;
};
const showErrorText = (string) => {
  const searchError = getElement(".search-error-text");
  searchError.textContent = string;
  searchError.hidden = false;
};
const updateTitleText = (state2) => {
  const description = getElement(".page-title");
  const background = getElement(".background-container");
  if (state2.searchBarText === "") {
    background.hidden = false;
    description.textContent = "지금 인기 있는 영화";
  } else {
    background.hidden = true;
    description.textContent = `'${state2.searchBarText}' 검색 결과`;
  }
};
const controlSearchResultText = (state2) => {
  const searchError = getElement(".search-error-text");
  if (state2.searchBarText !== "" && state2.movieList.length === 0) {
    searchError.hidden = false;
    searchError.textContent = "검색 결과가 없습니다.";
    return;
  }
  searchError.hidden = true;
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
  const movieDisplay = getUListElement(".thumbnail-list");
  if (reset) movieDisplay.replaceChildren();
  addMovieSkeletonUIList(movieDisplay);
  try {
    const fetchedMovies = state2.searchBarText === "" ? await fetchDefaultMovieList(state2.pageNum) : await fetchSearchMovieList(state2.pageNum, state2.searchBarText);
    state2.movieList = reset ? fetchedMovies : [...state2.movieList, ...fetchedMovies];
    addMovieList(movieDisplay, fetchedMovies);
  } catch (error) {
    showErrorText("영화 목록을 불러오지 못했습니다.");
    throw error;
  } finally {
    removeMovieSkeletonUIList(movieDisplay);
  }
};
const createMovieController = (state2) => ({
  loadMoreMovies: async () => {
    try {
      state2.pageNum++;
      await loadMovies({ state: state2 });
    } catch (error) {
      state2.pageNum -= 1;
    }
  },
  searchMovies: async (searchBarText) => {
    state2.pageNum = 1;
    state2.searchBarText = searchBarText;
    try {
      hideSearchErrorText();
      updateTitleText(state2);
      await loadMovies({ state: state2, reset: true });
      controlSearchResultText(state2);
    } catch (error) {
      state2.searchBarText = "";
    }
  },
  clickMovie: async (title) => {
    const selectedMovie = state2.movieList.find((movie) => movie.title == title);
    if (!selectedMovie) return;
    showBackgroundMovieInfo(selectedMovie);
  }
});
const state = {
  pageNum: 1,
  searchBarText: "",
  movieList: []
};
addEventListener("load", async () => {
  const movieController = createMovieController(state);
  try {
    await loadMovies({ state, reset: false });
    showBackgroundMovieInfo(state.movieList[0]);
    bindMovieEvents({
      onMore: movieController.loadMoreMovies,
      onSearch: movieController.searchMovies,
      onClick: movieController.clickMovie
    });
  } catch (error) {
    console.log(error);
  }
});
