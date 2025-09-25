const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Impor semua pesan/menu Anda
const { hello } = require('./hello.js');
const { strukturData } = require('./StrukturData/strukturData.js');
const { strukturPerangkat } = require('./StrukturData/strukturPerangkat.js');
const { totalPenduduk } = require('./StrukturData/totalPenduduk.js');
const { layananAdmin } = require('./LayananAdmin/layananAdmin.js');
const { akteKelahiran } = require('./LayananAdmin/akteKelahiran.js');
const { kartuKeluarga } = require('./LayananAdmin/kartuKeluarga.js');
const { ahliWaris } = require('./LayananAdmin/ahliWaris.js');
const { bersihDiri } = require('./LayananAdmin/suratketerangan.js');
const { kelakuanBaik } = require('./LayananAdmin/kelakuanBaik.js');
const { kematian } = require('./LayananAdmin/kematian.js');
const { orangSama } = require('./LayananAdmin/SKT.js');
const { usaha } = require('./LayananAdmin/usaha.js');
const { pengantarNikah } = require('./LayananAdmin/pengantarNikah.js');
const { pindahanPenduduk } = require('./LayananAdmin/pindahanPenduduk.js');
const { rekomendasiIzin } = require('./LayananAdmin/rekomendasiIzin.js');
const { izinKeramain } = require('./LayananAdmin/izinKeramaian.js');
const { fasilitasDesa } = require('./FasilitasDesa/fasilitasDesa.js');

const client = new Client({
    authStrategy: new LocalAuth({
        clientId: 'mannx-bot',
    }),
    puppeteer: {
        headless: true, // Penting untuk server
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--no-zygote'
        ],
    },
});


const userSessions = new Map();

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('auth_failure', (msg) => {
    console.error('GAGAL AUTENTIKASI', msg);
});

client.on('disconnected', (reason) => {
    console.log('Client terputus', reason);
    client.destroy();
    client.initialize();
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});


client.on('message', async (message) => {
    const contactId = message.from;
    const body = message.body.trim();

    // Dapatkan sesi pengguna, atau buat sesi baru jika tidak ada
    if (!userSessions.has(contactId)) {
        userSessions.set(contactId, { step: 'initial' });
        await message.reply(hello);
        return; // Selesai proses untuk pesan ini
    }

    const session = userSessions.get(contactId);

    // Jika pengguna mengirim '0', reset state mereka ke menu utama
    if (body === '0') {
        session.step = 'initial';
        await message.reply(hello);
        return;
    }

    // Logika berdasarkan state pengguna
    switch (session.step) {
        case 'initial':
            if (body === '1') {
                session.step = 'menu_struktur_data';
                await message.reply(strukturData);
            } else if (body === '2') {
                session.step = 'menu_layanan_admin';
                await message.reply(layananAdmin);
            } else if (body === '3') {
                session.step = 'menu_fasilitas_desa';
                await message.reply(fasilitasDesa);
            } else {
                await message.reply(hello); // Jika input tidak valid, kirim menu utama lagi
            }
            break;

        case 'menu_struktur_data':
            if (body === '1') {
                await message.reply(strukturPerangkat);
            } else if (body === '2') {
                await message.reply(totalPenduduk);
            } else {
                await message.reply(
                    `Pilihan tidak valid. Kirim '0' untuk kembali ke menu utama.`
                );
            }
            break;

        case 'menu_layanan_admin':
            const layananReplies = {
                1: akteKelahiran,
                2: kartuKeluarga,
                3: ahliWaris,
                4: bersihDiri,
                5: kelakuanBaik,
                6: kematian,
                7: orangSama,
                8: usaha,
                9: pengantarNikah,
                10: pindahanPenduduk,
                11: rekomendasiIzin,
                12: izinKeramain,
            };
            if (layananReplies[body]) {
                await message.reply(layananReplies[body]);
            } else {
                await message.reply(
                    `Pilihan tidak valid. Kirim '0' untuk kembali ke menu utama.`
                );
            }
            break;

        case 'menu_fasilitas_desa':
            // Menu ini tidak memiliki submenu, jadi setiap input dianggap tidak valid
            await message.reply(
                `Pilihan tidak valid. Kirim '0' untuk kembali ke menu utama.`
            );
            break;

        default:
            // Jika state tidak terduga, reset ke awal
            session.step = 'initial';
            await message.reply(hello);
            break;
    }
});

client.initialize();
