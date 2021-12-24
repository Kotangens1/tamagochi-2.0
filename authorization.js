console.log ("Авторизация подключена");

const API_URL = 'http://localhost:5000';

const submitBtn = document.querySelector(".submit");
const formTitle = document.querySelector(".reg_txt");
const errorMessage = document.querySelector(".error-message");
const toggleAuthButton = document.querySelector(".toggle-auth");
const usernameInput = document.getElementById('reg-username');
const passwordInput = document.getElementById('reg-password');

let isSignUpType = false;

const hasAccount = 'У вас уже есть аккаунт?';
const notYetAccount = 'Еще нет аккаунта?';
const authorizationTitle = 'Авторизация';
const registrationTitle = 'Регистрация';
const signInButtonText = 'Войти';
const signUpButtonText = 'Зарегистрироваться';

const setLocation = (page) => {
    const separatedByRoute = window.location.href.split('/');
    window.location.href = separatedByRoute[separatedByRoute.length - 1] = page;
}

const setAuth = (token) => {
    localStorage.setItem('token', token);
    setLocation('index.html');
};

const setSubmitError = (error) => {
    errorMessage.textContent = error;
};

const deleteSubmitError = () => {
    errorMessage.textContent = '';
};

const getHeaders = () => ({ 'Content-Type': 'application/json' });

const registration = async (params) => {
    const response = await fetch(`${API_URL}/auth/registration`, {
        method: 'POST',
        body: JSON.stringify(params),
        cache: 'no-cache',
        headers: getHeaders(),
    });

    return await response.json();
};

const login = async (params) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify(params),
        cache: 'no-cache',
        headers: getHeaders(),
    });

    return await response.json();
};

const handleSubmit = async (submitType) => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const params = { username, password };

    if (submitType) {
        registration(params).then(({ message, token }) => {
            if (message === 'Пользователь с таким именем уже существует') {
                throw new Error(message);
            }
            if (token) {
                setAuth(token);
            }
        }).catch((error) => {
            setSubmitError(error);
        });
    } else {
        login(params).then(({ message, token }) => {
            if (message?.substr(message.length - 9) === 'не найден') {
                throw new Error(message);
            }
            if (message === 'Введен неверный пароль') {
                throw new Error(message);
            }
            setAuth(token);
        }).catch((error) => {
            setSubmitError(error);
        });
    }
};

submitBtn.addEventListener('click', async ()=> {
    await handleSubmit(isSignUpType);
})

const changeSignType = (type) => {
    isSignUpType = type;
};

toggleAuthButton.addEventListener('click', () => { ///Взаимодействие с кнопкой
    if (isSignUpType) {
        submitBtn.textContent = signInButtonText;
        formTitle.textContent = authorizationTitle;
        toggleAuthButton.textContent = notYetAccount;
        setTimeout(() => changeSignType(false), 0)
    }
    if (!isSignUpType) {
        submitBtn.textContent = signUpButtonText;
        formTitle.textContent = registrationTitle;
        toggleAuthButton.textContent = hasAccount;
        setTimeout(() => changeSignType(true), 0)
    }
})

usernameInput.addEventListener('focus', () => {
    deleteSubmitError();
});

passwordInput.addEventListener('focus', () => {
    deleteSubmitError();
});




