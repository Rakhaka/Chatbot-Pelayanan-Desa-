const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { hello } = require("./hello.js");
//import struktur data
const { strukturData } = require("./StrukturData/strukturData.js");
const { strukturPerangkat } = require("./StrukturData/strukturPerangkat.js");
const { totalPenduduk } = require("./StrukturData/totalPenduduk.js");
//import layanan admin
const { layananAdmin } = require("./LayananAdmin/layananAdmin.js");
const { akteKelahiran } = require("./LayananAdmin/akteKelahiran.js");
const { kartuKeluarga } = require("./LayananAdmin/kartuKeluarga.js");
// const { izinPerjalanan } = require("./LayananAdmin/izinPerjalanan.js");
const { ahliWaris } = require("./LayananAdmin/ahliWaris.js");
// const { belumMenikah } = require("./LayananAdmin/belumMenikah.js");
const { bersihDiri } = require("./LayananAdmin/suratketerangan.js");
// const { domisili } = require("./LayananAdmin/domisili.js");
// const { hibah } = require("./LayananAdmin/hibah.js");
// const { kehilangan } = require("./LayananAdmin/kehilangan.js");
const { kelakuanBaik } = require("./LayananAdmin/kelakuanBaik.js");
const { kematian } = require("./LayananAdmin/kematian.js");
const { orangSama } = require("./LayananAdmin/SKT.js");
// const { penyerahanTanah } = require("./LayananAdmin/penyerahanTanah.js");
// const { penghasilan } = require("./LayananAdmin/penghasilan.js");
// const { tidakMampu } = require("./LayananAdmin/tidakMampu.js");
const { usaha } = require("./LayananAdmin/usaha.js");
const { pengantarNikah } = require("./LayananAdmin/pengantarNikah.js");
const { pindahanPenduduk } = require("./LayananAdmin/pindahanPenduduk.js");
const { rekomendasiIzin } = require("./LayananAdmin/rekomendasiIzin.js");
const { izinKeramain } = require("./LayananAdmin/izinKeramaian.js");
//import fasilitas desa
const { fasilitasDesa } = require("./FasilitasDesa/fasilitasDesa.js");

const client = new Client({
  authStrategy: new LocalAuth({
    clientId: "mannx-bot",
  }),
});

const greetedContacts = new Set();
const userStates = {
  step: "initial",
};
const userStates1 = {
  step: "initial",
};
const userStates2 = {
  step: "initial",
};

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("message", (message) => {
  const contactId = message.from;

  // Menu Utama Start
  if (!greetedContacts.has(contactId)) {
    message.reply(hello);
    greetedContacts.add(contactId);
    // Menu Utama End

    //Struktur Data Administratif Desa start
  } else if (message.body === "1" && userStates.step === "initial") {
    message.reply(strukturData);
    userStates.step = "choose";
  } else if (message.body === "1" && userStates.step === "choose") {
    message.reply(strukturPerangkat);
  } else if (message.body === "2" && userStates.step === "choose") {
    message.reply(totalPenduduk);
  } else if (message.body === "0" && userStates.step === "choose") {
    message.reply(hello);
    userStates.step = "initial";
    //Struktur Data Administratif Desa End.

    //Data Layanan Administrasi Start
  } else if (message.body === "2" && userStates1.step === "initial") {
    message.reply(layananAdmin);
    userStates1.step = "choose";
    userStates.step = "";
  } else if (message.body === "1" && userStates1.step === "choose") {
    message.reply(akteKelahiran);
  } else if (message.body === "2" && userStates1.step === "choose") {
    message.reply(kartuKeluarga);
  // } else if (message.body === "3" && userStates1.step === "choose") {
  //   message.reply(izinPerjalanan);
  } else if (message.body === "3" && userStates1.step === "choose") {
    message.reply(ahliWaris);
  // } else if (message.body === "5" && userStates1.step === "choose") {
  //   message.reply(belumMenikah);
  } else if (message.body === "4" && userStates1.step === "choose") {
    message.reply(bersihDiri);
  // } else if (message.body === "7" && userStates1.step === "choose") {
  //   message.reply(domisili);
  // } else if (message.body === "8" && userStates1.step === "choose") {
  //   message.reply(hibah);
  // } else if (message.body === "9" && userStates1.step === "choose") {
  //   message.reply(kehilangan);
  } else if (message.body === "5" && userStates1.step === "choose") {
    message.reply(kelakuanBaik);
  } else if (message.body === "6" && userStates1.step === "choose") {
    message.reply(kematian);
  } else if (message.body === "7" && userStates1.step === "choose") {
    message.reply(orangSama);
  // } else if (message.body === "13" && userStates1.step === "choose") {
  //   message.reply(penyerahanTanah);
  // } else if (message.body === "14" && userStates1.step === "choose") {
  //   message.reply(penghasilan);
  // } else if (message.body === "15" && userStates1.step === "choose") {
  //   message.reply(tidakMampu);
  } else if (message.body === "8" && userStates1.step === "choose") {
    message.reply(usaha);
  } else if (message.body === "9" && userStates1.step === "choose") {
    message.reply(pengantarNikah);
  } else if (message.body === "10" && userStates1.step === "choose") {
    message.reply(pindahanPenduduk);
  } else if (message.body === "11" && userStates1.step === "choose") {
    message.reply(rekomendasiIzin);
  } else if (message.body === "12" && userStates1.step === "choose") {
    message.reply(izinKeramain);
  } else if (message.body === "0" && userStates1.step === "choose") {
    message.reply(hello);
    userStates.step = "initial";
    userStates1.step = "initial";
    // Data Layanan Administrasi end.

    // Fasilitas Desa Start
  } else if (message.body === "3" && userStates2.step === "initial") {
    message.reply(fasilitasDesa);
    userStates2.step = "choose";
  } else if (message.body === "0" && userStates2.step === "choose") {
    message.reply(hello);
    userStates.step = "initial";
    userStates1.step = "initial";
    userStates2.step = "initial";
    // Fasilitas Desa end.
  } else {
    message.reply(`${message.body} tidak ada dalam Menu !`);
  }
});

client.initialize();
