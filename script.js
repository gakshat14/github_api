const usernameInput = document.getElementById('username-input');
const ulElement = document.getElementById('show-username');

let timeInterval;

usernameInput.addEventListener('input', function (e) {
    console.log(e.target.value);
    if (e.target.value.length === 0) {
        ulElement.innerHTML = '';
        return
    }
    if (timeInterval) {
        clearInterval(timeInterval);
    }
    timeInterval = setInterval(() => { fetchAndUpdateUI(e.target.value) }, 1000)
})

async function fetchAndUpdateUI(value) {
    try {
        if (value.length < 3) {
            return;
        }
        ulElement.innerHTML = '';
        const response = await fetch(`https://api.github.com/search/users?q=${value}`, { method: 'GET' })
        updateTheUI(await response.json())
        clearInterval(timeInterval);
    } catch (error) {
        console.error(error)
        clearInterval(timeInterval);
    }
}

function returnLIItem(username, avatarURL, htmlURL) {
    const liElement = document.createElement('li');
    liElement.innerHTML = `<img src="${avatarURL}" alt="${username}"><a href="${htmlURL}" target="_blank">${username}</a>`;
    return liElement
}

function updateTheUI(usernameList) {
    for (let user of usernameList.items) {
        ulElement.appendChild(returnLIItem(user.login, user.avatar_url, user.html_url))
    }
}