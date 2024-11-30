function getPosts(url, page) {
  var document = fetch(url);
  var listElements = document.select(".jiBXB .GOfXh .oZXL2");
  var posts = [];
  listElements.forEach((element) => {
    posts.push({
      name: element.text(),
      url: element.absUrl("href"),
      thumbnail: null,
    });
  });

  return {
    posts: posts,
    total: 1,
    next: null,
  };
}

function getImages(url, page) {
  const topic = url.split("https://unsplash.com/s/photos/")[1];
  var json = xhr(
    "https://unsplash.com/napi/search/photos?page="
      .concat(page)
      .concat("&per_page=20&query=")
      .concat(topic)
  );

  var urls = json.results.map((image) => image.urls.small);

  return {
    images: urls,
    total: 5,
    next: url,
  };
}
