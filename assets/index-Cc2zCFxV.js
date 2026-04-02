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
const fetchDefaultMovieList = async (pageNum) => {
  const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${"f7c82d8d69637b69b5e8841185b42153"}&language=ko-KR&page=${pageNum}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data.results;
};
const fetchSearchMovieList = async (pageNum, searchBarText) => {
  const URL = `https://api.themoviedb.org/3/search/movie?api_key=${"f7c82d8d69637b69b5e8841185b42153"}&query=${encodeURIComponent(searchBarText)}&language=ko-KR&page=${pageNum}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data.results;
};
const displayMovieBySearch = async (movieDisplay, state) => {
  const searchBar = getInputElement(".search-bar");
  state.searchBarText = searchBar.value;
  const background = getElement(".background-container");
  background.hidden = true;
  const description = getElement(".page-title");
  let movieList;
  if (state.searchBarText === "") {
    background.hidden = false;
    state.pageNum = 1;
    movieDisplay.replaceChildren();
    addMovieSkeletonUIList(movieDisplay);
    movieList = await fetchDefaultMovieList(state.pageNum);
    removeMovieSkeletonUIList(movieDisplay);
    description.textContent = "지금 인기 있는 영화";
  } else {
    movieDisplay.replaceChildren();
    addMovieSkeletonUIList(movieDisplay);
    movieList = await fetchSearchMovieList(state.pageNum, state.searchBarText);
    removeMovieSkeletonUIList(movieDisplay);
    description.textContent = `'${state.searchBarText}' 검색 결과`;
    const searchError = getElement(".search-error-container");
    if (movieList.length === 0) {
      searchError.hidden = false;
    } else {
      searchError.hidden = true;
    }
  }
  addMovieList(movieDisplay, movieList);
};
const bindSearchEvents = (state) => {
  const movieDisplay = getUListElement(".thumbnail-list");
  const searchBar = getInputElement(".search-bar");
  searchBar.addEventListener("keydown", async (event) => {
    if (event.isComposing) return;
    if (event.key === "Enter") {
      displayMovieBySearch(movieDisplay, state);
    }
  });
  const searchBtn = document.querySelector(".search-btn");
  searchBtn?.addEventListener("click", async () => {
    displayMovieBySearch(movieDisplay, state);
  });
};
const bindMoreMovieEvents = (state) => {
  const movieDisplay = getUListElement(".thumbnail-list");
  const displayMoreBtn = document.querySelector(".display-more-btn");
  displayMoreBtn?.addEventListener("click", async () => {
    state.pageNum++;
    addMovieSkeletonUIList(movieDisplay);
    let movieList;
    if (state.searchBarText === "") {
      movieList = await fetchDefaultMovieList(state.pageNum);
    } else {
      movieList = await fetchSearchMovieList(
        state.pageNum,
        state.searchBarText
      );
    }
    removeMovieSkeletonUIList(movieDisplay);
    addMovieList(movieDisplay, movieList);
  });
};
const bindClickPosterEvent = (state) => {
  const thumbnailBox = getElement(".thumbnail-list");
  thumbnailBox.addEventListener("click", async (event) => {
    const target = event.target;
    const item = target.closest(".item");
    const titleElement = item.querySelector("strong");
    let movieList;
    if (state.searchBarText === "") {
      movieList = await fetchDefaultMovieList(state.pageNum);
    } else {
      movieList = await fetchSearchMovieList(
        state.pageNum,
        state.searchBarText
      );
    }
    const backgroundMovie = movieList.filter(
      (movie) => movie.title === titleElement?.textContent
    )[0];
    showBackgroundMovieInfo(backgroundMovie);
  });
};
addEventListener("load", async () => {
  const state = {
    pageNum: 1,
    searchBarText: ""
  };
  const movieDisplay = getUListElement(".thumbnail-list");
  addMovieSkeletonUIList(movieDisplay, 20);
  const movieList = await fetchDefaultMovieList(state.pageNum);
  removeMovieSkeletonUIList(movieDisplay);
  addMovieList(movieDisplay, movieList);
  showBackgroundMovieInfo(movieList[0]);
  bindSearchEvents(state);
  bindMoreMovieEvents(state);
  bindClickPosterEvent(state);
});
