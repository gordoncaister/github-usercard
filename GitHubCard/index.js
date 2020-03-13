/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/


// .then(function (response) {
//   // handle success
//   console.log(response);
// })
// .catch(function (error) {
//   // handle error
//   console.log(error);
// })
// .then(function () {
//   // always executed
// });;
/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/
/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/



/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
  
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>

    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function createCards(argArr){
  let card = document.createElement('div');
  card.classList.add('card')
  let img = document.createElement('img');
  img.src = argArr.data.avatar_url;

  let info = document.createElement('div');
  info.classList.add('card-info');
 
  let name = document.createElement('h3');
  name.classList.add('name');
  name.innerText = argArr.data.name;

  let userName = document.createElement('p');
  userName.classList.add('username');
  userName.innerText = argArr.data.login;
  
  let location = document.createElement('p');
  location.innerText = 'Location: '+argArr.data.location;


  let profile = document.createElement('p');
  profile.innerText = 'Profile: ';
  let profileURL = document.createElement('a');
  profileURL.innerText = argArr.data.html_url;
  profileURL.href = argArr.data.html_url;
  profile.append(profileURL);
  
  let followers = document.createElement('p');
  followers.innerText = 'Followers: '+argArr.data.followers;
  
  let following = document.createElement('p');
  following.innerText = 'Following: '+argArr.data.following;

  let bio = document.createElement('p');
  bio.innerText = 'Bio: '+argArr.data.bio;
  
  

  info.append(name,userName,location,profile,followers,following,bio);
  card.append(img,info);
  return card;
}



// axios.get("https://api.github.com/users/diddleslip/followers")

//   console.log(response);
// })

const followersArray = [];
axios.get('https://api.github.com/users/gordoncaister')
.then(function (response) {
  // handle success
  document.querySelector('.cards').append(createCards(response));
  console.log(response);
})
.catch(function (error) {
  // handle error
  console.log(error);
})
.then(function () {
  // always executed
});

axios.get('https://api.github.com/users/gordoncaister/followers')
.then(function (response) {
  response.data.forEach(element => {
  followersArray.push(element.url)
  })
})
.then(() => {
  followersArray.forEach( x => {
    axios.get(x)
    .then(response => {
      document.querySelector('.cards').append(createCards(response));
    })
  })
})
.catch(error => {
  console.log(error);
});



/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
