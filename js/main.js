getData("pizza");
var links = document.querySelectorAll(".nav-link");
var foods = [];
for(i=0; i<links.length;i++){
links[i].addEventListener("click", function (e) {
    var sortOfMeal=e.target.text;
    getData(sortOfMeal)
})

}

function getData(meal) {
    var httpReguest = new XMLHttpRequest;
    httpReguest.open("get", `https://forkify-api.herokuapp.com/api/search?q=${meal}`);
    httpReguest.send();
    httpReguest.addEventListener("readystatechange", function () {
        if (httpReguest.readyState == 4 && httpReguest.status == 200) {
            foods = JSON.parse(httpReguest.response).recipes;
            console.log(foods)
            displayData()
        }
    })
}

function displayData() {
    var cartona = "";
    for (var i = 0; i < foods.length; i++) {
        cartona +=
            `
        <div class=" col-lg-3 col-md-6 ">
        <div class="cap2"> 
        <img src="${foods[i].image_url}" alt="">  
        <h2>${foods[i].title}</h2>
        <a href="${foods[i].source_url}" class=" btn btn-secondary">source</a>
        <a data-bs-toggle="modal" data-bs-target="#exampleModal" href=""  onclick="adddet(${foods[i].recipe_id})" class="btn btn-warning">detalis</a>
        </div>
        </div>        
        `
    }
    document.getElementById("rows").innerHTML = cartona
}
function adddet(id){
  var response=new XMLHttpRequest;
  response.open("get",`https://forkify-api.herokuapp.com/api/get?rId=${id}`)
  response.send();
  response.addEventListener("readystatechange", function(){
      if(response.readyState==4 &&response.status==200){
          foods=JSON.parse(response.response);
          
          displayDet()
      }
  })

}
function displayDet(){
var detalis=foods.recipe;
console.log(detalis);
var recipeDetalis=
`
<img src="${detalis.image_url}" class="w-100">
<h2>${detalis.title}</h2>
`
document.getElementById("recdata").innerHTML=recipeDetalis
}