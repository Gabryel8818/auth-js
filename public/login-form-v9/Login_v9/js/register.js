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






// SIGNUP
const signupForm = document.querySelector("#signup-form")

signupForm.addEventListener('submit',(e) => {
    e.preventDefault()

    const email = document.querySelector('#signup-email').value
    const senha= document.querySelector('#signup-password').value
  
    auth
        .createUserWithEmailAndPassword(email, senha)
        .then(userCredential => {
            console.log('sign-up')
            alert ("Usuário Cadastrado com Sucesso")
            window.location.href = "index.html";

        })

})

