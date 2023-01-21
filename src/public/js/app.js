const socket = io();  // 프론트에서 소켓에 접속하는 것.

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

const room = document.getElementById("room");

room.hidden = true; // 숨기기

function showRoom(){
  welcome.hidden = true;
  room.hidden = false;
}

function handleRoomSubmit(event){
  event.preventDefault();
  const input = form.querySelector("input");
  const value = input.value;
  socket.emit("enter_room", value, showRoom);   
  input.value=""; 
}

form.addEventListener("submit", handleRoomSubmit);