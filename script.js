const container = document.querySelector('.container');
const count = document.querySelector('#count');
const total = document.querySelector('#total');
let ticketPrice = +document.getElementById("movie").value;
const selectedMovie = document.getElementById("movie");
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const updateSelectedCount = () =>{
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const numOfSelectedSeats = document.querySelectorAll('.row .seat.selected').length;
    // console.log(selectedSeats.length);
    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
    //storing data in localstorage (selected movie and seats)
    localStorage.setItem('selectedSeatsIndex',JSON.stringify(seatsIndex));
    // console.log(localStorage.getItem('selectedSeatsIndex'));
    count.innerHTML = numOfSelectedSeats;
    total.innerText = numOfSelectedSeats * ticketPrice;
}


const populateUI = () =>{
    const selectedSeatsIndex = JSON.parse(localStorage.getItem('selectedSeatsIndex'));
    if(selectedSeatsIndex && selectedSeatsIndex.length > 0){
        seats.forEach((seat,index) =>{
            if(selectedSeatsIndex.indexOf(index) > -1){
                seat.classList.add('selected')
            }
        })
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');
    if(selectedMovieIndex){
        selectedMovie.selectedIndex = selectedMovieIndex
    }
    if(selectedMoviePrice){
        ticketPrice = selectedMoviePrice
    }
    updateSelectedCount()
    // count.innerHTML = numOfSelectedSeats;
    // total.innerText = numOfSelectedSeats * ticketPrice;
}

populateUI()

const storeMovieInfo = (movieIndex,moviePrice) =>{
    localStorage.setItem('selectedMovieIndex',movieIndex);
    localStorage.setItem('selectedMoviePrice',moviePrice);
}


container.addEventListener('click',(e) =>{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');  //on click 'selected' class toggles 
    }
    updateSelectedCount()
})

selectedMovie.addEventListener('change',(e) =>{
    // console.log(typeof(ticketPrice));
    ticketPrice = +e.target.value
    storeMovieInfo(e.target.selectedIndex,e.target.value);     //selectedIndex returns index of the selected movie from the dropdpwn
    updateSelectedCount()
})



