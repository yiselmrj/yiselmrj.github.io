import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import * as rtdb from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyAcvZ45YKX0EH6E1ICrCpwRyD_F1M9OUcI",
   authDomain: "demoingfirebase.firebaseapp.com",
   databaseURL: "https://project-1-9acf3-default-rtdb.firebaseio.com/",
   projectId: "demoingfirebase",
   storageBucket: "demoingfirebase.appspot.com",
   messagingSenderId: "48553257186",
   appId: "1:48553257186:web:575fa2c0f528c7174456bb"
 };

 // Initialize Firebase
const app = initializeApp(firebaseConfig);
let db = rtdb.getDatabase(app);

let tweetJSON ={
 "content": "Thinking about food",
 "likes": 2,
 "retweets": 10,
 "author":{
   "handle": "owo", 
   "pic": "https://www.kindpng.com/picc/m/717-7177825_neko-atsume-cats-png-png-download-peaches-neko.png",
 }
};

let renderTweet = (owo1) =>{
 $("#alltweets").append(`
 <div class = "tweet">
   <h1>${owo1.content}</h1>
   </div>
 `);
}


renderTweet(tweetJSON);
$(".tweet").on("click", (owo2)=>{
 $(owo2.currentTarget).hide();
})



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
  <h1> Twitter </h1>
  <input id = "tweettext" placeholder = "Enter username"> 
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