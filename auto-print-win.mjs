import 'dotenv/config';
import pkg from 'pdf-to-printer';
const { print } = pkg;
import { setTimeout } from 'timers/promises';

async function jalankanPrintOtomatis() {
    // 1. Mengambil data dari file .env
    const printerName = process.env.NAMA_PRINTER;
    const file = process.env.NAMA_FILE;
    const jedaMenit = parseInt(process.env.WAKTU_ISTIRAHAT);

    // 2. Memecah rentang halaman menjadi urutan antrean
    const batchHalaman = process.env.BATCH_HALAMAN.split(';').map(item => item.trim());

    // 3. Tampilan Awal di Terminal
    console.log(`\n===================================================`);
    console.log(`           SISTEM PRINT OTOMATIS AKTIF             `);
    console.log(`===================================================`);
    console.log(` 🖨️  Printer   : ${printerName}`);
    console.log(` 📄  File      : ${file}`);
    console.log(` ⏱️  Istirahat : ${jedaMenit} menit per antrean`);
    console.log(`===================================================\n`);

    // 4. Proses Looping Print
    for (let i = 0; i < batchHalaman.length; i++) {
        const rentang = batchHalaman[i];
        console.log(`[+] Memproses halaman: ${rentang}...`);

        try {
            await print(file, {
                printer: printerName,
                pages: rentang
            });
            console.log(`    -> Sukses dikirim ke Spooler Windows.`);
        } catch (error) {
            console.log(`\n===================================================`);
            console.error(` ❌ ERROR: Gagal mencetak halaman ${rentang}!`);
            console.error(`    Pesan Sistem: ${error.message || error}`);
            console.log(`\n 👉 SOLUSI: Cek kembali ejaan NAMA_PRINTER dan NAMA_FILE di file .env`);
            console.log(`===================================================\n`);
            return; // Menghentikan program jika terjadi error
        }

        // 5. Waktu Istirahat (Jika bukan antrean terakhir)
        if (i < batchHalaman.length - 1) {
            console.log(`    ⏳ Printer istirahat ${jedaMenit} menit. (Jangan tutup layar ini)...\n`);
            await setTimeout(jedaMenit * 60 * 1000);
        }
    }

    // 6. Tampilan Selesai
    console.log(`\n===================================================`);
    console.log(` ✅ SELESAI! Semua halaman berhasil diproses.`);
    console.log(`===================================================\n`);
}

jalankanPrintOtomatis();