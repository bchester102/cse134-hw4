const textareaRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/;
//Taken from https://stackoverflow.com/questions/64509631/is-there-a-regex-to-match-all-unicode-emojis

let form_errors = [];

document.addEventListener('DOMContentLoaded', () => {
    const nameField = document.querySelector('#name');
    const emailField = document.querySelector('#email');
    const commentField = document.querySelector('form textarea');
    const formErrorsField = document.querySelector('#form-errors');
    const form = document.querySelector('form');
    const errorOutput = document.querySelector('#error');
    const infoOutput = document.querySelector('#info');

    email.addEventListener('input', () => {
        if (emailField.validity.typeMismatch) {
            email.setCustomValidity("You entered an invalid email address!");
        } else {
            email.setCustomValidity("");
        }
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (form.checkValidity) {
            fetch("https://httpbin.org/post", {
                method: "POST",
                body: JSON.stringify({
                    name: nameField.value,
                    email: emailField.value,
                    comment: commentField.value,
                    possible_bot: "true",
                    "form-errors": form_errors.toString()
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then((response) => response.json())
                .then((json) => console.log(json));
        }
    });

    nameField.addEventListener('invalid', (event) => {
        form_errors.push(event.target);
        console.log(form_errors);
    });

    emailField.addEventListener('invalid', (event) => {
        form_errors.push(event.target);
        console.log(form_errors);
    });

    commentField.addEventListener('invalid', (event) => {
        form_errors.push(event.target);
        console.log(form_errors);
    });

    commentField.addEventListener('input', (event) => {
        if (textareaRegex.test(event.data)) {
            commentField.value = commentField.value.slice(0, -2);
            commentField.style.border = '3px dotted red';
            errorOutput.textContent = "No Emoji Allowed!";
            setTimeout(function () {
                errorOutput.textContent = "";
                commentField.style.border = '1px solid black';
            }, 3000);
        } else {
            let remainingCharCount = 1000 - commentField.value.length;
            infoOutput.textContent = "Characters left: " + remainingCharCount;
        }
    })

});