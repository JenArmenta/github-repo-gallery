//Create and name a global variable to select the div with a class of “overview”.
const overview = document.querySelector(".overview");
const username = "JenArmenta";
const repoList = document.querySelector(".repo-list");


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
    //At the bottom of your second function which displays your GitHub user data, call the async function that fetches your repos.
    gitRepos();
};

const gitRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    //At the bottom of the async function fetching your repos, call the function you just created to display info about each repository. As an argument, pass the JSON response data for the repos.
    displayRepos(repoData);
};

const displayRepos = function (repos) {
//loop and create a list item for each repo and give each item: a class of “repo” and an <h3> element with the repo name. 
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        //Append the list item to the global variable that selects the unordered repos list.
        repoList.append(repoItem);
    }
};
