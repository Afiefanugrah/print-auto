import pkg from 'pdf-to-printer';
const { print } = pkg;

import { setTimeout } from 'timers/promises';

async function jalankanPrintOtomatis() {
    const printerName = "EPSON L120 Series";
    const file = "NAME_FIle.pdf";
    const jedaMenit = 25;

    // Pembagian batch sudah dihitung fix (Maksimal 25 halaman per batch, urutan mundur)
    const batchHalaman = [
        // "116-140",  // Batch 1
        "91-115",   // Batch 2
        "66-90",    // Batch 3
        "41-65",    // Batch 4~
        "1,18-40"   // Batch 5 (diakhiri cover/halaman 1)
    ];

    console.log(`[Windows Mode] Memulai Print Otomatis...`);
    console.log(`Printer: ${printerName}`);
    console.log(`Waktu Istirahat: ${jedaMenit} menit per batch\n`);

    for (let i = 0; i < batchHalaman.length; i++) {
        const rentang = batchHalaman[i];
        console.log(`[+] Mengirim antrean halaman: ${rentang}...`);

        try {
            await print(file, {
                printer: printerName,
                pages: rentang
            });
            console.log(`    Berhasil dikirim ke printer.`);
        } catch (error) {
            console.error(`❌ Gagal mencetak batch ${rentang}:`, error);
            return;
        }

        // Istirahat 15 menit jika ini bukan batch terakhir
        if (i < batchHalaman.length - 1) {
            console.log(`    ⏳ Printer istirahat ${jedaMenit} menit. Jangan matikan terminal...\n`);
            await setTimeout(jedaMenit * 60 * 1000);
        }
    }

    console.log("\n✅ Selesai! Skripsi berhasil dicetak semua dari bawah ke atas.");
}

jalankanPrintOtomatis();