// fetch data 
fetch("./xcars.json")
  .then(function (resp) {
    return resp.json();
  })
  .then(function (data) {

    ////////////////////////Get the ID from the url///////////////////////
   
    // Create new URL object (with window.location.href we get the current url)
    const url = new URL(window.location.href);

    //The search property of the URL object returns the string of query parameters. (so in this case the id)
    const query_string = url.search;

    // The query parameters string can be used to create a URLSearchParams object, through which you can get parameter values.
    const search_params = new URLSearchParams(query_string); 
    const id = search_params.get('id');

    //////////////////////Loop through the fetched data///////////////////
    //  Make a variable for the fetched array (default is the first value from the array)
    let xcarModel = data.xCars[0];

    //create a 404 error if id doesnt exist
    let error = `
    <body>
      <div class="container text-center mt-5">
        <h1> 404 error - Page not found! </h1>
        <a href="/">Click to go back</a>
      </div>
    </body>
    `;

    // Loop through the data and id's and if id is not found give an error
    if(id == 1) {
      xcarModel = data.xCars[0];
    } else if(id == 2) {
      xcarModel = data.xCars[1];
    } else if(id == 3) {
      xcarModel = data.xCars[2];
    } else if(id == 4) {
      xcarModel = data.xCars[3];
    } else {
      document.body.innerHTML = error;
    }

    ////////////////Update the UI with the correct information////////////
    // Title
    document.getElementById('model-title').textContent = `X-Cars || ${xcarModel.model}`;

    // Navbar
    document.getElementById('nav-model').textContent = `${xcarModel.model}`;

    // Showcase background
    document.getElementById('showcase').style.backgroundImage = `url(${xcarModel.headerimg})`;

    // Showcase title:
    document.getElementById('model-header-title').textContent = `The X-Car ${xcarModel.model}`;

    //Model Header 2 above default image:
    document.getElementById('model-header-2').textContent = `X-Car ${xcarModel.model}`;

    // Table Model Header
    document.getElementById('model-table-header').textContent = `${xcarModel.model} Models`;

    // Default model image on load:
    document.getElementById('xCarModelDefault').innerHTML = `
    <div class="d-flex justify-content-center flex-wrap">

      <img src="${xcarModel.img}" class="img-fluid"><img>

    </div>
    `;

    ////////////////////////////////The Table/////////////////////////////
    let tableOutputModel = '';

    xcarModel.models.forEach(function (model) {

      tableOutputModel += `
        <tr>

          <th scope="row">${model.id}</th>

          <td class="d-none"><img src="${model.img}" class="img-fluid"><img></td>

          <td>${model.name}</td>
          <td>${model.properties.color}</td>
          <td>${model.properties.fuel}</td>
          <td>${model.properties.year}</td>
          <td>€${model.properties.price}</td>

        </tr>
      `;
    })

    document.getElementById('tableModel').innerHTML = tableOutputModel;

    // loop through the table
    let table = document.getElementById('table');

    for (let i = 0; i < table.rows.length; i++) {
      table.rows[i].onclick = function () {
        rIndex = this.rowIndex;

        // onload outputModel is empty
        let outputModel = '';

        outputModel = `
    
          <div class="d-flex justify-content-center flex-wrap">
    
            <div id="image" class="cabrio-image"></div>
    
            <ul class="mt-4 pt-5 list-unstyled output-list">
              <li id="name"></li>
              <li id="color"></li>
              <li id="fuel"></li>
              <li id="year"></li>
              <li id="price"></li>
            </ul>
    
          </div>
    
          `;

        document.getElementById('xCarModel').innerHTML = outputModel;

        // set the value of the default image on load to nothing (and replace with the clicked one):
        document.getElementById('xCarModelDefault').innerHTML = '';

        // Image:
        const image = document.getElementById("image").value = this.cells[1].innerHTML;
        document.getElementById("image").innerHTML = image;

        // Name
        const name = document.getElementById("name").value = `<b>${this.cells[2].innerHTML}</b>`;
        document.getElementById("name").innerHTML = name;

        // Color
        const color = document.getElementById("color").value = `<b>Color:</b> ${this.cells[3].innerHTML}`;
        document.getElementById("color").innerHTML = color;

        // Fuel
        const fuel = document.getElementById("fuel").value = `<b>Fuel:</b> ${this.cells[4].innerHTML}`;
        document.getElementById("fuel").innerHTML = fuel;

        // Year
        const year = document.getElementById("year").value = `<b>Year:</b> ${this.cells[5].innerHTML}`;
        document.getElementById("year").innerHTML = year;

        // Price
        const price = document.getElementById("price").value = `<b>Price:</b> ${this.cells[6].innerHTML}`;
        document.getElementById("price").innerHTML = price;
      }
    }
  })
