document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let  password = document.getElementById('password').value;
    let message = document.getElementById('message');

    if (username.length < 5) {
        message.textContent = 'يجب أن يكون اسم المستخدم أكثر من 5 حروف.';
        return;
    }

    if (!validateEmail(email)) {
        message.textContent = 'يرجى إدخال بريد إلكتروني صالح.';
        return;
    }

    if (password.length < 8) {
        message.textContent = 'يجب أن تكون كلمة السر أكثر من 8 أرقام.';
        return;
    }

    fetch("https://6657373e9f970b3b36c869ed.mockapi.io/api-database", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        localStorage.setItem('username', data.username);
        window.location.href = 'home.html';
    })
    .catch(error => {
        console.error('Error:', error);
        message.textContent = 'حدث خطأ أثناء التسجيل.';
    });
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let loginUsername = document.getElementById('loginUsername').value;
    let loginPassword = document.getElementById('loginPassword').value;
    let loginMessage = document.getElementById('loginMessage');

    fetch("https://6657373e9f970b3b36c869ed.mockapi.io/api-database")
    .then(response => response.json())
    .then(data => {
        const user = data.find(user => user.username === loginUsername && user.password === loginPassword);
        if (user) {
            localStorage.setItem('username', user.username);
            window.location.href = 'home.html';
        } else {
            loginMessage.textContent = 'اسم المستخدم أو كلمة السر غير صحيحة.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        loginMessage.textContent = 'حدث خطأ أثناء تسجيل الدخول.';
    });
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

