const wrapper = document.querySelector(".wrapper");

const clockWrapper = wrapper.querySelector(".clock__wrapper"),
	clock = clockWrapper.querySelector("h1");

const userWrapper = wrapper.querySelector(".user__js"),
	userInput = userWrapper.querySelector("input"),
	userShow = document.querySelector(".userName"),
	showList = document.querySelector(".showList");

const USER_CURRENT = "user";

const SHOWING = "showing";

function saveUser(text) {
	localStorage.setItem(USER_CURRENT, text);
}

function userInputHandle(e) {
	e.preventDefault();
	const userName = e.target[0].value;
	userInput.classList.remove(SHOWING);
	userShow.innerText = `Hello!! ${userName}`;
	showList.classList.remove("showList");
	saveUser(userName);
}

function currentUserHandle(text) {
	userInput.classList.remove(SHOWING);
	userShow.innerText = `Hello!! ${text}`;
}

function clockInit() {
	const date = new Date();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();

	clock.innerText = `${hours < 10 ? `0${hours}` : `${hours}`} : ${
		minutes < 10 ? `0${minutes}` : `${minutes}`
	} : ${seconds < 10 ? `0${seconds}` : `${seconds}`}`;
}

if (clockWrapper) {
	setInterval(clockInit, 1000);
}

function loadLs() {
	const currentUser = localStorage.getItem(USER_CURRENT);
	if (currentUser === null) {
		userWrapper.addEventListener("submit", userInputHandle);
		showList.classList.add("showList");
	} else {
		currentUserHandle(currentUser);
		showList.classList.remove("showList");
	}
}

loadLs();
