import { useState } from "react"; // Import React hook `useState` untuk mengelola state dalam komponen
import axios from "axios"; // Import Axios untuk membuat HTTP request ke API

function App() { // Fungsi utama komponen App
  const [file, setFile] = useState(null); // State untuk menyimpan file yang diunggah pengguna
  const [prediction, setPrediction] = useState(null); // State untuk menyimpan hasil prediksi dari API

  const handleFileChange = (event) => { // Fungsi untuk menangani perubahan input file
    setFile(event.target.files[0]); // Mengambil file yang dipilih pengguna dan menyimpannya ke state `file`
  };

  const handleSubmit = async (event) => { // Fungsi untuk menangani form submit
    event.preventDefault(); // Mencegah reload halaman default pada form submit
    const formData = new FormData(); // Membuat instance FormData untuk mengirim file
    formData.append("file", file); // Menambahkan file ke dalam FormData dengan field name "file"

    try {
      const response = await axios.post( // Mengirim POST request ke API menggunakan Axios
        "https://web-production-a5783.up.railway.app/predict", // URL endpoint API untuk prediksi
        formData, // Mengirimkan data file sebagai body request
        {
          headers: {
            "Content-Type": "multipart/form-data", // Menentukan header untuk file upload
          },
        }
      );
      setPrediction(response.data); // Menyimpan hasil prediksi yang diterima dari API ke state `prediction`
    } catch (error) {
      console.error("Error uploading file:", error); // Menampilkan error jika ada masalah saat mengunggah file
    }
  };

  return ( // Render elemen JSX
    <div className="container"> {/* Wrapper untuk seluruh konten aplikasi */}
      <h1 className="mt-5">Upload Gambar dan Dapatkan Prediksi</h1> {/* Header aplikasi */}
      <form onSubmit={handleSubmit}> {/* Form untuk unggah file */}
        <div className="form-group"> {/* Div untuk grup input form */}
          <label htmlFor="fileInput">Pilih Gambar</label> {/* Label untuk input file */}
          <input
            type="file" // Input untuk memilih file
            className="form-control" // Kelas Bootstrap untuk gaya input
            id="file" // ID untuk input file
            onChange={handleFileChange} // Event handler untuk perubahan file
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3"> {/* Tombol submit form */}
          Unggah
        </button>
      </form>
      {prediction && ( // Jika prediksi tersedia, tampilkan hasilnya
        <div className="mt-5"> {/* Wrapper untuk hasil prediksi */}
          <h3>Hasil Prediksi</h3> {/* Header untuk hasil prediksi */}
          <pre>{JSON.stringify(prediction, null, 2)}</pre> {/* Menampilkan hasil prediksi dalam format JSON yang terstruktur */}
        </div>
      )}
    </div>
  );
}

export default App; // Ekspor komponen App agar dapat digunakan di file lain
