function getRandomCat() {

    fetch("https://cataas.com/cat?json=true")
        .then(response => response.json())
        .then(data => {
            document.getElementById("catImage").src = `https://cataas.com/cat/${data._id}`;
        })
        .catch(error => console.error("Error fetching cat image:", error));
}

document.getElementById("randomCatButton").addEventListener("click", getRandomCat);

function searchCat() {
    let tag = document.getElementById("searchInput").value.trim();
    if (!tag) return;
    
    fetch(`https://cataas.com/api/cats?tags=${tag}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                document.getElementById("catImage").src = `https://cataas.com/cat/${data[0]._id}`;
            } else {
                alert("No cats found with this tag!");
            }
        })
        .catch(error => console.error("Error fetching cat image:", error));
}

document.getElementById("searchButton").addEventListener("click", searchCat);

function saveFavorite() {
    let imgSrc = document.getElementById("catImage").src;
    if (!imgSrc) return;
    
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.includes(imgSrc)) {
        favorites.push(imgSrc);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        displayFavorites();
    }
}

document.getElementById("saveFavoriteButton").addEventListener("click", saveFavorite);

function deleteFavorite(imgSrc) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter(fav => fav !== imgSrc);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    displayFavorites();
}

function displayFavorites() {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let container = document.getElementById("favoritesContainer");
    container.innerHTML = "";
    
    favorites.forEach(src => {
        let div = document.createElement("div");
        let img = document.createElement("img");
        img.src = src;
        
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "deleteButton";
        deleteButton.onclick = () => deleteFavorite(src);
        
        div.appendChild(img);
        div.appendChild(deleteButton);
        container.appendChild(div);
    });
}

displayFavorites();