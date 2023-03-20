const form = document.getElementById('form');
const first = document.getElementById('first');
const last = document.getElementById('last');
const email = document.getElementById('email');
const pass = document.getElementById('pass');
const pass2 = document.getElementById('pass2');
const bdate = document.getElementById("bdate");
const box1 = document.getElementById("box1");
const box2 = document.getElementById("box2");

form.addEventListener('submit', e => {
    e.preventDefault();

    validate();
    isValidDate(dateString);
    isOldEnough(dateString);
});

const sendData = (firstValue, sRate, Count) => {
    if(sRate === Count){
        swal("Hello " + firstValue , "You are Registered", "success");
        form.reset();
    }

}

const SuccessMsg = (firstValue) => {
    let formContr = document.getElementsByClassName('form-control');
    var Count = formContr.length - 1;
    for(var i = 0; i < formContr.length; i++){
        if(formContr[i].className === "form-control success"){
            var sRate = 0 + i;
            console.log(sRate);
            sendData(firstValue, sRate, Count);
        
    } else{
            return false;
        }
    }
}

const setError = (element, message) => {
    const formControl = element.parentElement;
    const errorDisplay = formControl.querySelector('.error');
    formControl.className = "form-control error";

    errorDisplay.innerText = message;
    formControl.classList.add('error');
    formControl.classList.remove('success')
}

const setSuccess = element => {
    const formControl = element.parentElement;
    const errorDisplay = formControl.querySelector('.error');
    formControl.className = "form-control success";

    errorDisplay.innerText = '';
    formControl.classList.add('success');
    formControl.classList.remove('error');
};

const validEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validate = () => {
    const firstValue = first.value.trim();
    const lastValue = last.value.trim();
    const emailValue = email.value.trim();
    const pValue = pass.value.trim();
    const p2Value = pass2.value.trim();
    const bdateValue = bdate.value.trim();

    if(firstValue === '') {
        setError(first, 'Please enter your firstname');
    } else {
        setSuccess(first);
    }

    if(lastValue === '') {
        setError(last, 'Please enter your lastname');
    } else {
        setSuccess(last);
    }

    if(emailValue === '') {
        setError(email, 'Please enter you email');
    } else if (!validEmail(emailValue)) {
        setError(email, 'Please enter a valid email address');
    } else {
        setSuccess(email);
    }

    if(pValue === '') {
        setError(pass, 'Please enter your password');
    } else if (pValue.length < 8 ) {
        setError(pass, 'Password must be at least 8 character');
    } else {
        setSuccess(pass);
    }

    if(p2Value === '') {
        setError(pass2, 'Please confirm your password');
    } else if (p2Value !== pValue) {
        setError(pass2, "Passwords doesn't match");
    } else {
        setSuccess(pass2);
    }

    if (bdateValue === "") {
        setError(bdate, "Please enter your birthdate");
  } else if (!isValidDate(bdateValue)) {
        setError(bdate, "Please enter a valid birthdate in MM/DD/YYYY format");
  } else if (!isOldEnough(bdateValue)) {
        setError(bdate, "You must be 18 years or older to sign up");
  } else {
        setSuccess(bdate);
  }

    if (!box1.checked) {
        setError(box1,"Please check this field");
    } else {
        setSuccess(box1);
    }

    if (!box2.checked) {
        setError(box2,"Please check this field");
    } else {
        setSuccess(box2);
    } 
        SuccessMsg(firstValue);
    
};

const isValidDate = (dateString) => {
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
    return false;
  }
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
    return false;
  }
    const year = date.getFullYear();
    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear) {
    return false;
  }
     return true;
};

const isOldEnough = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
        age--;
  }

    return age >= 18;
};
