class Start {
    constructor(tablicaKolejka = [], tablicaZalatwione = []) {
        this.tablicaKolejka = tablicaKolejka;
        this.tablicaZalatwione = tablicaZalatwione;
    }
    dodajDoTablicy(el) {
        this.tablicaKolejka.push(el);
    }
    usunZtablicy() {
        this.tablicaKolejka.shift();
    }
}
const wejscie = document.getElementById("wejscie");
const wyjscie = document.getElementById("wyjscie");
const komunikaty = document.querySelector('.komunikaty');
const stanKolejki = document.querySelector('.stan-kolejki');
const zalatwione = document.querySelector('.sprawy-zalatwione');
const time = document.querySelector('.time');
let numerki = 1;

const aktualnyCzas = () => {

    function dodajZero(i) {
        return (i < 10) ? '0' + i : i;
    }

    const date = new Date();
    const nazwyMiesiecyPl = [
        "Styczeń", "Luty", "Marzec",
        "Kwiecień", "Maj", "Czerwiec", "Lipiec",
        "Sierpień", "Wrzesień", "Październik",
        "Listopad", "Grudzień"
    ];

    const dzien = date.getDate();
    const indexMiesiaca = date.getMonth();
    const rok = date.getFullYear();

    return dzien + ' ' + nazwyMiesiecyPl[indexMiesiaca] + ' ' + rok + " godz: " + dodajZero(date.getHours()) + ":" + dodajZero(date.getMinutes()) + ":" + dodajZero(date.getSeconds());
}

const reverseList = () => {
    const lista = document.getElementById("listaSprawZalatwionych");
    const li = [...lista.querySelectorAll('li')];
    const liReverse = li.reverse();
    liReverse.forEach(function (el) {
        lista.appendChild(el);
    })
}

const listaSprawZalatwionych = function () {
    const ol = document.createElement('ol');
    ol.id = "listaSprawZalatwionych";
    ol.style.listStyleType = "none";
    on.tablicaZalatwione.forEach(function (el) {
        const li = document.createElement('li');
        li.innerHTML = `Klient<span class="number-color"> ${el.el}</span> . ${el.czas}`;
        ol.appendChild(li);
    })
    return ol;
}
const sprawaZalatwiona = (el) => {
    const time = aktualnyCzas();
    on.tablicaZalatwione.unshift({
        el: el,
        czas: time
    });
    zalatwione.innerHTML = '';
    zalatwione.appendChild(listaSprawZalatwionych());
}

const pobierzNumerek = () => {
    if (on.tablicaKolejka.length >= 10) komunikaty.innerHTML = `Kolejka jest pełna, brak miejsc`;
    else {
        on.dodajDoTablicy(numerki++);
        stanKolejki.innerHTML = `Liczba oczekujących: ${on.tablicaKolejka.length}`;
        komunikaty.innerHTML = `Pobierz numerek`;
    }
}

const zapraszamyDoOkienka = () => {
    if (on.tablicaKolejka.length > 0) {
        sprawaZalatwiona(on.tablicaKolejka[0]);
        reverseList();
        on.usunZtablicy();

        stanKolejki.innerHTML = `Liczba oczekujących: ${on.tablicaKolejka.length}`;
        komunikaty.innerHTML = `Pobierz numerek`;
    } else {
        alert("Kolejka jest pusta")
    }

}
setInterval(() => {
    time.textContent = aktualnyCzas();
}, 1000)
const on = new Start();
wejscie.addEventListener("click", pobierzNumerek);
wyjscie.addEventListener("click", zapraszamyDoOkienka);