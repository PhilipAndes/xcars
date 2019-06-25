
// Get all models from xcars.json
fetch("./xcars.json")
  .then(function (resp) {
    return resp.json();
  })
  .then(function (data) {

    let outputAllModels = '';

    data.xCars.forEach(function (xCar) {
      // we want to append on to output so we need to use +=
      outputAllModels += `
        <a href="model.html?id=${xCar.id}" title="Show ${xCar.model}">
          <div class="col-lg-3 col-md-6">
            <div class="card mb-5">
              <div class="card-body">
                <img src="${xCar.img}" alt="" class="img-fluid rounded-circle w-100 mb-3"></img>
                <h2>${xCar.model}</h2>
                <p>${xCar.description}</p>
                <div class="d-flex justify-content-center">
                  <div class="p-4">
                    <a href="https://youtube.com" title="Youtube" target="_blank">
                      <i class="fab fa-youtube fa-2x"></i>
                    </a>
                  </div>
                  <div class="p-4">
                    <a href="https://twitter.com" title="Twitter" target="_blank">
                      <i class="fab fa-twitter fa-2x"></i>
                    </a>
                  </div>
                  <div class="p-4">
                    <a href="https://instagram.com" title="Instagram" target="_blank">
                      <i class="fab fa-instagram fa-2x"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
        `;
    })
    document.getElementById('xCars').innerHTML = outputAllModels;
  });

