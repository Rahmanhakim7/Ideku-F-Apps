const hostUrl = "https://be-semarang-g-1-production.up.railway.app";
const token = localStorage.getItem('token');
const username = localStorage.getItem('username');

function submitLogin(event) {
    event.preventDefault();
  
    const loginData = {
        usernameLogin: document.getElementById('usernameLogin').value,
        emailLogin: document.getElementById('emailLogin').value,
        passwordLogin: document.getElementById('passwordLogin').value,
    };
  
    // Kirim permintaan POST ke server
    fetch(`${hostUrl}/api/login`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
    })
        .then((response) => response.json())
        .then((data) => {
        if (data.success) {
            const token = data.token; //token from server
            const username = data.username; // Nama pengguna dari server
            localStorage.setItem('token', token); // save to local storage
            localStorage.setItem('username', username);
            window.location.href = 'https://kampus-merdeka-software-engineering.github.io/FE-Semarang-1/admin/data.html';
        } else {
            alert('Login gagal. Periksa kembali username, email, dan password Anda.');
        }
        })
        .catch((error) => {
        console.error('Error during login:', error);
        });
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem('token'); // token from Local storage
    const currentUrl = window.location.href;

    if (!token && currentUrl !== 'https://kampus-merdeka-software-engineering.github.io/FE-Semarang-1/admin/login.html') {
        // Token not found and not on the login page, balik ke halaman login
        window.location.href = 'https://kampus-merdeka-software-engineering.github.io/FE-Semarang-1/admin/login.html';
    } else {
        // Kirim permintaan GET ke server dengan token
        fetch(`${hostUrl}/api/admin/data`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${token}` // Kirim token dalam header "Authorization"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }
});
