// function to call data from api
loadData = async () => {
  const searchbox = document.getElementById("searchField");
  const searchtext = searchbox.value;
  searchbox.value = "";
  const url = `https://openlibrary.org/search.json?q=${searchtext}`;
  const res = await fetch(url);
  const data = await res.json();

  DisplayData(data);
};

// function to display data in website
DisplayData = (data) => {
  const displayBook = document.getElementById("display");
  displayBook.innerHTML = "";
  // const cover_i = data.docs[0].cover_i;
  // const img = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;
  // number of total result found in the API
  const found = document.getElementById("found");
  found.innerHTML = `<h3>Number of Results Found : ${data.numFound}</h3>
                     <h5> Showing Results : ${data.docs.length}</h5>`;
  if (data.numFound == 0) {
    found.innerHTML = `<h3>No Results Found,try something else.</h3>
  `;
  }
  data.docs.forEach((result) => {
    const cover_i = result.cover_i;

    let img = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;

    // error handling for undefined property
    if (cover_i === undefined) {
      img = "download.jpg";
    }
    if (result.first_publish_year === undefined) {
      result.first_publish_year = "N/A";
    }
    if (result.author_name === undefined) {
      result.isbn;
      result.author_name = "N/A";
    }
    if (result.isbn === undefined) {
      result.isbn = ["N/A", "available"];
    }
    if (result.publisher === undefined) {
      result.publisher = ["N/A", "available"];
    }
    // adding search result to the div element
    const div = document.createElement("div");
    div.innerHTML = ` <div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src=${img} class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${result.title}</h5>
        
        <p class="card-text">Author Name : ${result.author_name}</p>
        <p class="card-text">First Publication : ${result.first_publish_year}</p>
        <p class="card-text">Publisher : ${result.publisher[0]}</p>
        <p class="card-text"><small class="text-muted">ISBN Code : ${result.isbn[0]}</small></p>
        <button type="button" class="btn btn-info">Add to cart </button>
      </div>
    </div>
  </div>
</div>`;
    displayBook.appendChild(div);
  });
};
