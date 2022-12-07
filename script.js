// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWY-4Rt0hwYFkC-_46qhE8SaNfTmt1MBU",
  authDomain: "coolandquirky-a34ba.firebaseapp.com",
  databaseURL: "https://coolandquirky-a34ba-default-rtdb.firebaseio.com",
  projectId: "coolandquirky-a34ba",
  storageBucket: "coolandquirky-a34ba.appspot.com",
  messagingSenderId: "206859460631",
  appId: "1:206859460631:web:f7019ea3b45c559bc5fc52",
};

// Initialize Firebase
//part 3----------------------------
firebase.initializeApp(firebaseConfig);
//add----------------------------
let toggleLike = (tweetRef, uid) =>{
  tweetRef.transaction((owo1) => {
    if (owo1) {
      if (owo1.likes && owo1.likes_by_user[uid]) {
        owo1.likes--;
        owo1.likes_by_user[uid] = null;
      } else {
        owo1.likes++;
        if (!owo1.likes_by_user) {
          owo1.likes_by_user = {};
        }
        owo1.likes_by_user[uid] = true;
      }
    }
    return owo1;
  });
}
//add----------------------------

let renderedTweetLikeLookup = {};


//hello edit
let renderTweet = (owo1, uuid) =>{
  $("#alltweets").prepend(`
<div class="card mb-3 tweet" data-uuid = "${uuid}" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${owo1.author.pic}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${owo1.author.handle}</h5>
        <p class="card-text">${owo1.content}</p>
        
        <p class="card-text like-button" data-tweetid = "${uuid}">${owo1.likes} Like</p>
        
        
        <p class="card-text"><small class="text-muted">Tweeted at ${new Date (owo1.timestamp).toLocaleString()}</small></p>
      </div>
    </div>
  </div>
</div>
  `);

  renderedTweetLikeLookup[uuid] = owo1.likes;
  firebase.database().ref("/tweets").child(uuid).child("likes").on("value", ss=>{
      renderedTweetLikeLookup[uuid] = parseInt(ss.val());
      $(`.like-button[data-tweetid=${uuid}]`).html(`{renderedTweetLikeLookup[uuid]} Likes`);
    });
}
//part 3 (EDIT FOR LIKE SYSTEM)-----------------------------------
let renderLogin = ()=>{
  $("body").html(`<button id = "login">LOGIN</button>`);
  $("#login").on("click" , ()=>{
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
  });
}



let renderPage = (loggedIn)=>{
  let myuid = loggedIn.uid;
  $("body").html(`<div id = "alltweets"></div>`);
  let tweetRef = firebase.database().ref("/tweets");
  tweetRef.on("child_added", (ss)=>{
      //----------------------------------------------------
        let owo1 = ss.val(); 

        renderTweet(owo1, ss.key);
        $(".like-button").off("click");
        $(".like-button").on("click", (evt)=>{
        let clickedTweet = $(evt.currentTarget).attr("data-tweetid");
        let likeCount = renderedTweetLikeLookup[clickedTweet];
        console.log(parseInt(likeCount) + 1, likeCount);
        let tweetRef = firebase.database().ref("/tweets").child("clickedTweet");
        toggleLike(tweetRef, myuid);
      });
    });
};

firebase.auth().onAuthStateChanged(user=>{
    if(!user){
      renderLogin();
    } else{
      renderPage(user);
    }
})
//--------------------------------------------



//-------------------------------
let mytweet = {
};
let TweeterPage = ()=>{
  $("#login").hide();
  $("#login").after(`
    <div id="TweeterPage">  
     <button id="testPage" class = "TweeterPage">PressHere</button>
     
     </div>
  `);
   $(".TweeterPage").on("click", (evt)=>{
     console.log(evt);
     let theTwitterPage = $(evt.currentPage).html();
     mytweet.TweeterPage = theTwitterPage;
   });
  
}
let startTweet = ()=>{
  $("#login").html(`
   <h1> </h1>
   <input id = "tweettext" placeholder = "Enter text"> 
   `);
    $("#tweettext").on("change", ()=>{
    let firstTweet = $("#tweettext").val();
    mytweet.mytext = firstTweet;
    TweeterPage();
  });
  
}


let addTweet = ()=>{
  $("#login").html(`
   <input id = "CreateTweet" placeholder = "What is happening?"> 
   `);
  
}



startTweet();