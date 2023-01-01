//Create and name a global variable to select the div with a class of “overview”.
const overview = document.querySelector(".overview");
const username = "JenArmenta";
const repoList = document.querySelector(".repo-list");
const allReposContainer = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const viewReposButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");


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
    gitRepos(username);
};

const gitRepos = async function (username) {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    //At the bottom of the async function fetching your repos, call the function you just created to display info about each repository. As an argument, pass the JSON response data for the repos.
    displayRepos(repoData);
};

const displayRepos = function (repos) {
    //show the filterInput element. 
    filterInput.classList.remove("hide");
//loop and create a list item for each repo and give each item: a class of “repo” and an <h3> element with the repo name. 
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        //Append the list item to the global variable that selects the unordered repos list.
        repoList.append(repoItem);
    }
};

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
      const repoName = e.target.innerText;
      getRepoInfo(repoName);
    }
  });

const getRepoInfo = async function (repoName) {
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    //Declare a variable called repoInfo to resolve and save the JSON response.
    const repoInfo = await fetchInfo.json();
    //Log out repoInfo. 
    console.log(repoInfo);
    //create a variable called fetchLanguages to fetch data from language_url property of your repoInfo.
    const fetchLanguages = await fetch(repoInfo.languages_url);
    //Create a variable called languageData to save the JSON response.
    const languageData = await fetchLanguages.json();
    console.log(languageData);

//Add each language to an empty array called languages. Hint: The languageData is an object. 
//Remember how to loop through an object? You’ll want to add the languages to the end of the array.
const languages = [];
    for (const language in languageData) {
    languages.push(language);
}
    //to get specific repo information, call the function to display the repo info. Pass it the repoInfo object and the languages array.
    displayRepoInfo(repoInfo, languages);
}; 


const displayRepoInfo = function (repoInfo, languages) {
    //remove the class of “hide” from the Back to Repo Gallery button.
    viewReposButton.classList.remove("hide");
    //empty the HTML of the section with a class of “repo-data” where the individual repo data will appear.
    repoData.innerHTML = "";
    //Hide the element with the class of “repos”.
    repoData.classList.remove("hide");
    allReposContainer.classList.add("hide");
    //Create a new div element and add the selected repository’s name, description, default branch, 
    //and link to its code on GitHub. Use the JSON data to grab the relevant properties to display on the page. 
    //Use the properties from the object you retrieved when you fetched the specific repos.
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>Name: ${repoInfo.name}</h3>
      <p>Description: ${repoInfo.description}</p>
      <p>Default Branch: ${repoInfo.default_branch}</p>
      <p>Languages: ${languages.join(", ")}</p>
      <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    //Append the new div element to the section with a class of “repo-data”. Unhide (show) the “repo-data” element.
    repoData.append(div);
};

viewReposButton.addEventListener("click", function () {
    // unhide (display) the section with the class of “repos”
    allReposContainer.classList.remove("hide");
    //Add the “hide” class to the section where the individual repo data will appear. 
    repoData.classList.add("hide");
    //add the “hide” class to the Back to Repo Gallery button itself. 
    viewReposButton.classList.add("hide");
  });

  filterInput.addEventListener("input", function (e) {
    const searchText = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const searchLowerText = searchText.toLowerCase();


    //Loop through each repo inside your repos element. Inside the loop, 
    //create a variable and assign it to the lowercase value of the innerText. of each repo.
    for (const repo of repos) {
        const repoLowerText = repo.innerText.toLowerCase();
        if (repoLowerText.includes(searchLowerText)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
  });
