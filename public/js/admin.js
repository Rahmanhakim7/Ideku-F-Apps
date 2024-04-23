const hostUrl = "https://be-semarang-g-1-production.up.railway.app";
const token = localStorage.getItem('token')

document.addEventListener('DOMContentLoaded', function() {
  const tableBody = document.getElementById('table-body-data');
  if (!token) {
        // Token not found, balik ke halaman login
        window.location.href = 'https://kampus-merdeka-software-engineering.github.io/FE-Semarang-1/admin/login.html';
    } else {
    fetch(`${hostUrl}/api/admin/data/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        const username = localStorage.getItem('username');
        const welcomeMessage = document.getElementById('welcome-message');
        welcomeMessage.textContent = `Hello, ${username}`;

        const messages = data.messages;

        messages.forEach((message) => {
          const newRow = document.createElement('tr');
          const dataElement = `
            <td style="text-align: center;">${message.data_id}</td>
            <td>${message.name}</td>
            <td>${message.email}</td>
            <td>${message.message}</td>
            <td>${message.review}</td>
            <td>
              <center>
                <button onclick="editButtonClick('${message.data_id}')" style="width: 47%; height: 20px; border: 1px solid; background: #28a745; border-radius: 5px; color: #e9f4fb; font-weight: 500; cursor: pointer; outline: none;">
                  Edit
                </button>
                <button onclick="deleteButtonClick('${message.data_id}')" style="width: 47%; height: 20px; border: 1px solid; background: #dc3545; border-radius: 5px; color: #e9f4fb; font-weight: 500; cursor: pointer; outline: none;">
                  Delete
                </button>
              </center>
            </td>
          `;
          newRow.innerHTML = dataElement;
          tableBody.append(newRow);
        });
      } else {
        console.error('Error fetching data:', data.error);
      }
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }    
});

document.addEventListener('DOMContentLoaded', function() {
  const logoutButton = document.getElementById('logout-button');

  logoutButton.addEventListener('click', function() {
    const confirmLogout = window.confirm('Anda yakin ingin logout?');
    if (confirmLogout) {
      // Hapus token dari local storage
      localStorage.removeItem('token'); 

      // Redirect ke halaman login
      window.location.href = 'https://kampus-merdeka-software-engineering.github.io/FE-Semarang-1/admin/login.html';
    }
  });
});

function editButtonClick(postId) {
  // Get modal
  var modal = document.getElementById("myModal");
  
  // Get elemen <span> untuk menutup modal
  var span = document.getElementsByClassName("close")[0];
  
  // Saat user klik button, modal muncul 
  modal.style.display = "block";
  
  // User klik <span> (x) untuk menutup modal
  span.onclick = function() {
    modal.style.display = "none";
  }
  
  // Modal tertutup saat user klik di luar modal
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}
  // Kirim permintaan untuk mengambil data dari server yang ditampilkan di form
  fetch(`${hostUrl}/api/admin/data/${postId}`, {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
    },
  })
    .then((response) => response.json())
    .then((data) => {
      
        document.getElementById("input_edit_data_id").value = data[0].data_id;
        document.getElementById("input_edit_name").value = data[0].name;
        document.getElementById("input_edit_email").value = data[0].email;
        document.getElementById("input_edit_message").innerText = data[0].message;
        document.getElementById("input_edit_review").value = data[0].review;
  
      // Menampilkan modal
      modal.style.display = "block";
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
  
function submitEditButtonClick(postId, event) {
    event.preventDefault();
    const updatedData = {
        name: document.getElementById('input_edit_name').value,
        email: document.getElementById('input_edit_email').value,
        message: document.getElementById('input_edit_message').value,
        review: document.getElementById('input_edit_review').value,
        postId: postId,
    };
    fetch(`${hostUrl}/api/admin/data/${postId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedData),
    })
        .then((response) => response.json())
        .then((data) => {
        // Navigate ke seluruh data setelah berhasil update
        window.location.href = 'https://kampus-merdeka-software-engineering.github.io/FE-Semarang-1/admin/data.html';
        })
        .catch((error) => {
        console.error('Error updating data:', error);
        });
    }

function deleteButtonClick(postId) {
    const confirmDelete = confirm("Apakah Anda yakin ingin menghapus data ini?");
    if (confirmDelete) {
    fetch(`${hostUrl}/api/admin/data/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
      },
    })
        .then((response) => response.json())
        .then((data) => {
        // Navigate ke /admin/data
        window.location.href = 'https://kampus-merdeka-software-engineering.github.io/FE-Semarang-1/admin/data.html';
        alert('Data berhasil dihapus');
        })
        .catch((error) => {
        console.error('Error deleting data:', error);
        });
    }
}


