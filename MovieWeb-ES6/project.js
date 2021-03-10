const form = document.querySelector("#film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.querySelector("#clear-films");

//tüm eventler 
eventListener();

function eventListener(){

    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){

        let films = Storage.getFilmsFromStorage();
        UI.loadAllFilms(films);
    });
    cardBody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",deleteAllFilm);


}
function addFilm(e){

    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    const newFilm = new Film(title,director,url);

    if(title === "" || director === "" || url === ""){

        UI.displayMotion("danger","lütfen öğelerin hepsini doldurunuz..");

    }
    else{
        UI.addFilmToUI(newFilm);
        Storage.addFilmToStorage(newFilm);
        UI.displayMotion("success","işleminiz başarılı..");
    }

    UI.clearInputs(titleElement,directorElement,urlElement);

    e.preventDefault();
}
function deleteFilm(e){
    if(e.target.id === "delete-film"){
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        UI.displayMotion("success","Başarı ile silindi...");
    }

}
function deleteAllFilm(){
    if(confirm("emin misiniz...")){
        UI.clearAllFilmsFromUI();
        Storage.clearAllFilmsFromStorage();
    }
}