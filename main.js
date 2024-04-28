const key = "PAQ8LdsfPzKaGnqJTIjFnWqdg5nqTrgi";

const searchBar = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");
const img = document.querySelector("img");
const newImageBtn = document.querySelector(".new-image-btn");

const generateRequest = (request, search) => {
  if (search !== "") {
    search = `&s=${search}`;
  }
  const myURL = `https://api.giphy.com/v1/gifs/${request}?api_key=${key}${search}`;

  return (request = new Request(myURL, { mode: "cors" }));
};

async function fetchGif(request) {
  try {
    const response = await fetch(request);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const myJSON = await response.json();
    img.src = myJSON.data.images.original.url;
  } catch (error) {
    console.error("Error:", error);
  }
}

const newImage = () => {
  let search = searchBar.value;

  if (search !== "") {
    fetchGif(generateRequest("translate", search));
  } else {
    fetchGif(generateRequest("random", search));
  }
};

window.addEventListener("load", (e) => {
  fetchGif(generateRequest("random", ""));
});

searchBtn.addEventListener("click", (e) => {
  newImage();
});

newImageBtn.addEventListener("click", (e) => {
  newImage();
});
