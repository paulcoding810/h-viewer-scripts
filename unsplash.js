function getPosts(url, page) {
  const document = fetch(url).html();
  const listElements = document.select(".Czj1u.eTw4k.r2uRM .J9bI_.Pc_c1.yZhvJ");
  const fakeThumbnails = document.select(
    "div div.AE2it div.I7e4t figure div.gFPnk div div.vthK5 div.gr86h a.mG0SP div.xH5KD img.tzC2N.fbGdz.cnmNG"
  );
  const posts = [];

  let index = 0;
  listElements.forEach((element) => {
    let thumb = fakeThumbnails ? fakeThumbnails.get(index) : null;
    thumb = thumb ? thumb.attr("src") : null;

    posts.push({
      name: element.text(),
      url: element.absUrl("href"),
      thumbnail: thumb,
    });
    index++;
  });

  return {
    posts: posts,
    total: 1,
    next: null,
  };
}

function getImages(url, page) {
  const topic = url.split("https://unsplash.com/s/photos/")[1];
  var json = fetch(
    "https://unsplash.com/napi/search/photos?page="
      .concat(page)
      .concat("&per_page=20&query=")
      .concat(topic)
  ).json();

  var urls = json.results.map((image) => image.urls.regular);

  return {
    images: urls,
    total: 5,
    next: url,
  };
}

function search(queryUrl, page) {
  return getPosts(queryUrl, page);
}

function getSearchUrl(query) {
  return baseUrl + "s/photos/" + query;
}
