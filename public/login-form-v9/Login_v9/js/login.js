var firebaseConfig = {
    apiKey: "AIzaSyDmXOnelyHVWkEvfk28D31px4JHsY06Jxk",
    authDomain: "agenda-5eadc.firebaseapp.com",
    projectId: "agenda-5eadc",
    storageBucket: "agenda-5eadc.appspot.com",
    messagingSenderId: "87008879036",
    appId: "1:87008879036:web:f5c257090ebaf3a8ce8bb9",
    measurementId: "G-5EHFXD3SB5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  const auth = firebase.auth()
  var authGoogle = document.querySelector("#authGoogle")


// SIGNIN

const signinForm = document.querySelector("#signin-form")

signinForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = document.querySelector('#signin-email').value
    const senha= document.querySelector('#signin-password').value

    firebase.auth()
            .signInWithEmailAndPassword(email, senha)
            .then(userCredential => {
                window.location.href = "agenda.html";
        })

})


authGoogle.addEventListener('click', function() {
  var provider = new firebase.auth.GoogleAuthProvider()
  authProvider(provider)
})



function authProvider(provider) {
    firebase.auth()
        .signInWithPopup(provider)
        .then(function (result) {
            console.log(result);
            window.location.href = "agenda.html";
        }).catch(function (error) {
            console.log(error);

        });
}
