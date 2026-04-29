let saldo = 0;
let pityCount = 0;
const PITY_LIMIT = 50;

// Setting Peluang
const RATE_S = 1.5; 
const RATE_A = 10;  

// --- FITUR BARU: RESET PITY SAAT GANTI HARGA ---
// Ini biar kalau user ganti harga, pity balik ke 0 otomatis
document.addEventListener('DOMContentLoaded', () => {
    const input1x = document.getElementById('harga1x');
    const input10x = document.getElementById('harga10x');

    const resetPity = () => {
        pityCount = 0;
        document.getElementById('displayBox').innerHTML = `Harga berubah! Pity direset.<br><span style="font-size:12px; color:#888;">Pity: 0/${PITY_LIMIT}</span>`;
    };

    if(input1x) input1x.addEventListener('input', resetPity);
    if(input10x) input10x.addEventListener('input', resetPity);
});
// ----------------------------------------------

function pasangSaldo() {
    const input = document.getElementById('inputSaldo');
    if (input.value <= 0) return alert("Masukkan saldo yang bener!");
    saldo = parseInt(input.value);
    updateTampilan();
}

function updateTampilan() {
    document.getElementById('saldoDisplay').innerHTML = `Saldo Saat Ini: ${saldo} DM`;
}

function gachaCustom(jumlah) {
    let harga = (jumlah === 1) ? parseInt(document.getElementById('harga1x').value) : parseInt(document.getElementById('harga10x').value);

    if (isNaN(harga) || harga <= 0) return alert("Isi harga dulu!");
    if (saldo < harga) return alert("Saldo gak cukup!");

    eksekusiGacha(harga, jumlah);
}

function eksekusiGacha(totalHarga, jumlahKocok) {
    const display = document.getElementById('displayBox');
    const history = document.getElementById('historyList');

    saldo -= totalHarga;
    updateTampilan();

    for (let i = 0; i < jumlahKocok; i++) {
        pityCount++;
        let peluang = Math.random() * 100;
        let itemDapet = "";
        let isHoki = false;

        // CEK PITY ATAU HOKI ALAMI
        if (pityCount >= PITY_LIMIT || peluang <= RATE_S) {
            if (pityCount >= PITY_LIMIT) {
                itemDapet = "SARA SEO (GUARANTEED S) 💎✨";
            } else {
                itemDapet = "SARA SEO (RANK S) 🔥";
            }
            isHoki = true;
            pityCount = 0; // RESET DISINI: Supaya pas dapet S, angka balik ke 0
        } 
        else if (peluang <= (RATE_S + RATE_A)) {
            itemDapet = "PEMAIN RANK A ✨";
        } 
        else {
            itemDapet = "Ampas (Rank B) 💀";
        }

        const listBaru = document.createElement('li');
        listBaru.innerHTML = itemDapet;
        if (isHoki) listBaru.className = "hoki";
        history.prepend(listBaru);
        
        display.innerHTML = (jumlahKocok === 1) ? 
            `${itemDapet}<br><span style="font-size:12px; color:#888;">Pity: ${pityCount}/${PITY_LIMIT}</span>` : 
            `Multi-Gacha 10x Selesai!<br><span style="font-size:12px; color:#888;">Pity: ${pityCount}/${PITY_LIMIT}</span>`;
    }
}

function hapusRiwayat() {
    document.getElementById('historyList').innerHTML = "";
}
