$(document).ready(function() {
// Gets an optional query string from our url (i.e. ?post_id=23)
var url = window.location.search;
  
// Getting jQuery references to the post body, title, form, and category select
let signUp= $("#signUp-form")
let firstNameInput = $("#firstName");
let lastNameInput= $("#lastName");
let emailInput = $("#email");
let password = $("password");
let rePassword = $("re-enterPassword")
let occupationSelection= $("#occupation");
// let gameOne = $("gameOne");
// let gameTwo = $("gameTwo");
// let gameThree = $("gameThree");

// Adding an event listener for when the form is submitted
signUp.on("submit", function handleFormSubmit(event) {
  event.preventDefault();
  // Wont submit the user if we are missing a body or a title
  
  if (!firstNameInput.val().trim() || !lastNameInput.val().trim() || !emailInput.val().trim() || !occupationSelection.val().trim() || !password.val().trim() || !rePassword.val().trim() || !gameOne.val() || !gameTwo.val() || !gameThree.val()) {
    return done({message: "All fields must be completed"});
  } else if (password !=rePassword){
      
      return done({message: "Passwords must match"})
  }

  // Constructing a newUser object to hand to the database
  let newUser = {
    firstName: firstNameInput,
    lastName: lastNameInput,
    email: emailInput,
    password: password,
    occupation : occupationSelection,
  };
console.log("This is the new User!" , newUser);
 
  signUpUser(newUser.firstName, newUser.lastName, newUser.email, newUser.occupation)
  
})

function signUpUser(firstName, lastName, email, password, occupation) {
    $.post("/api/signup", {
        firstName: firstName,
        lastNAme: lastName,
        email: email,
        password: password,
        occupation: occupation
    })
      .then(function(data) {

        console.log(data);
        window.location.replace("/members");

      })
      .catch(handleLoginErr);
  }
})


// script for the sign up form
var modal = document.getElementById('id01');

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }