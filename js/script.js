//Create and name a global variable to select the div with a class of “overview”.
const overview = document.querySelector(".overview");
const username = "JenArmenta";

//Create and name an async function to fetch information from your GitHub profile
const gitUserInfo = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    displayUserInfo(data);
};

gitUserInfo();

    const displayUserInfo = function (data) {
        const div = document.createElement("div");
        div.classList.add("user-info");
        div.innerHTML = `
        <figure>
        <img alt="user avatar" src=${data.avatar_url} />
      </figure>
      <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
      </div>
    `;
    //Append the div to the overview element. 
    overview.append(div);
};

