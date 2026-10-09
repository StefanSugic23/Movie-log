const form = document.querySelector("#movieForm")
const titleInput = document.querySelector("#title")
const directorInput = document.querySelector("#director")
const reviewInput = document.querySelector("#review")
const error = document.querySelector("#error")

// addMovie vi behöver inte lägga eftersom det ligger i form, det redan i

const listBtn = document.querySelector("#listBtn");
const removeLast = document.querySelector("#removeLast");
const showTitles = document.querySelector("#showTitles");
const clear = document.querySelector("#clearButton")
const ratingInput = document.querySelector("#rating");
const movieList = document.querySelector("#movieList")
const average = document.querySelector("#average");


let movies =[];

try {
const saved= localStorage.getItem("movies");
 movies = JSON.parse(saved) || [];
}
catch(err){
console.log("Could not read saved movies:");
console.log(err)
}

function save(){
    const text = JSON.stringify(movies);
    localStorage.setItem("movies", text);
}

function render(){
    movieList.textContent="";
    for (let i =0; i<movies.length; i++){
        const li = document.createElement("li")
        const label = movies[i].rating >= 7 ? "good" : "weak";
        const titleElement = document.createElement("h3");
        const directorElement = document.createElement("p")
        const ratingElement = document.createElement("p")
        const reviewElement = document.createElement("p")
        titleElement.textContent = movies[i].title;
        directorElement.textContent = `Directed by ${movies[i].director}`;
        ratingElement.textContent = `${movies[i].rating}/10 - ${label}`
        reviewElement.textContent = movies[i].review

        li.appendChild(titleElement);
        li.appendChild(directorElement)
        li.appendChild(ratingElement);
        li.appendChild(reviewElement)
        movieList.appendChild(li);
    }
}
render();


form.addEventListener("submit", function(event) {
event.preventDefault(); // detta är för att texten som vi skriver i input försvinner inte

const title = titleInput.value.trim();
const director = directorInput.value.trim();
const review = reviewInput.value.trim();
const ratingText = ratingInput.value.trim();
const rating = Number(ratingText);


if (title ==="") {
    error.textContent = "Please enter a title"
    return;
}
if (title.length < 2){
    error.textContent = "Title be must at least 2 charachters long"
    return;
}



if(director===""){
    error.textContent= "Please enter a director";
    return;
}

if (ratingText ==="" || isNaN(rating)){
    error.textContent = "The input must be a number in rating";
    return;    
}
if (rating<1|| rating>10) {
    error.textContent = "Rating must be between 1 and 10";
    return;

}
for ( let i = 0; i< movies.length; i++){
    if (movies[i].title.toLowerCase() === title.toLowerCase()){
        error.textContent = "This movie is already reviewed"
        return;
    }
}



if ( review.length < 10){
    error.textContent = "review must be at least 10 char long"
    return;
}

error.textContent="";

const newMovie = {
    title: title,
    director: director,
    review: review,
    rating: rating
};

movies.push(newMovie);
save();
render();
console.log(movies);

directorInput.value="";
titleInput.value="";
reviewInput.value="";
ratingInput.value="";


});

listBtn.addEventListener("click", function(){
    for (let i = 0; i< movies.length; i++){
        const part = movies[i].director.split(" ");
        const lastName = part[part.length-1];
        const label = movies[i].rating >= 7 ? "Good" : "Weak";
        console.log(`${i+1}. ${movies[i].title} (${lastName}) ${movies[i].rating}/10 - ${label}`)
    }
}
)

removeLast.addEventListener("click", function(){
    movies.pop();
    save();
    render();
    console.log("Removed last movie. Left are quantity : " + movies.length)
})

showTitles.addEventListener("click", function(){
    const titless = [];

    for ( let i=0; i< movies.length; i++){
        titless.push(movies[i].title)
    }
    console.log(titless.join(", "));
})




clear.addEventListener("click", function(){
    movies.splice(0,movies.length);
    localStorage.removeItem("movies");
    console.log("all movies has been removed")
    render();
})

