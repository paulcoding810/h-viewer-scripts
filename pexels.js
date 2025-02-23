function getPosts(url, page) {
  const document = fetch(url).html();

  let tags = [];
  document.select("a.spacing_mr8__g1gt6").forEach((tag) => {
    tags.push({
      name: tag.text(),
      url: tag.absUrl("href"),
    });
  });

  const post = {
    name: "Collection",
    url: url,
    thumbnail: document
      .select("div.BreakpointGrid_column__9MIoh > div > article > a > img")
      .first()
      .attr("src"),
    tags: tags,
  };

  return {
    posts: [post],
    total: 1,
    next: null,
  };
}

function getImages(url, page) {
  var topic = url.split(baseUrl + "search/")[1];
  topic = topic ? topic.replace("/", "") : "";

  const api = getApi(topic, page);

  const json = fetch(api, {
    headers: {
      "secret-key": "H2jk9uKnhRmL6WPwh89zBezWvr",
    },
  }).json();

  const urls = json.data.map((item) => item.attributes.image.medium);

  const total = json.pagination.total_pages;
  const next = page < total ? getApi(topic, page + 1) : null;

  return {
    images: urls,
    total: total,
    next: next,
  };
}

function getApi(query, page) {
  return String(
    `https://www.pexels.com/en-us/api/v3/search/photos?query=${query}&page=${page}&per_page=24&orientation=all&size=all&color=all&sort=popular`
  );
}

function search(queryUrl, page) {
  return getPosts(queryUrl, page);
}

function getSearchUrl(query) {
  return baseUrl + "search/" + query;
}
