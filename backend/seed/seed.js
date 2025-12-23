require('dotenv').config();
const { sequelize, User, Policy } = require('../models');

(async () => {
  try {
    // Sinkronizuj tabele (force: true briše i ponovo pravi)
    await sequelize.sync({ force: true });
    console.log('✅ Tabele sinhronizovane.');

    // Polise
    const policies = await Policy.bulkCreate([
      { name: 'Osiguranje automobila',  description: 'Osiguranje za lična vozila', monthlyRate: 2500.00 },
      { name: 'Osiguranje doma',        description: 'Osiguranje stana ili kuće', monthlyRate: 1500.00 },
      { name: 'Životno osiguranje',     description: 'Zdravstveno i životno osiguranje', monthlyRate: 3000.00 },
      { name: 'Osiguranje uređaja',     description: 'Osiguranje laptopa, telefona, itd.', monthlyRate: 500.00 },
      { name: 'Putno osiguranje',       description: 'Osiguranje za vreme putovanja', monthlyRate: 800.00 },
    ]);
    console.log(`✅ Ubacio ${policies.length} polisa.`);

    // Korisnici (bez avatar polja – hook će ga dodeliti)
    const users = await User.bulkCreate([
      { username: 'marko90', firstName: 'Marko', lastName: 'Petrović', birthDate: '1990-04-12', address: 'Bulevar Oslobođenja 15', phone: '064123456', email: 'marko.p@gmail.com', gender: 'male' },
      { username: 'ana85', firstName: 'Ana', lastName: 'Nikolić', birthDate: '1985-07-22', address: 'Kralja Milana 22', phone: '065987654', email: 'ana.n@gmail.com', gender: 'female' },
      { username: 'ivan92', firstName: 'Ivan', lastName: 'Jovanović', birthDate: '1992-11-03', address: 'Vojvode Stepe 45', phone: '063111222', email: 'ivan.j@gmail.com', gender: 'male' },
      { username: 'milica88', firstName: 'Milica', lastName: 'Ilić', birthDate: '1988-02-28', address: 'Njegoševa 7', phone: '064333444', email: 'milica.i@gmail.com', gender: 'female' },
      { username: 'stefan95', firstName: 'Stefan', lastName: 'Pavlović', birthDate: '1995-09-14', address: 'Bulevar Kralja Aleksandra 80', phone: '065555666', email: 'stefan.p@gmail.com', gender: 'male' },
      { username: 'jovana91', firstName: 'Jovana', lastName: 'Đorđević', birthDate: '1991-06-07', address: 'Cara Dušana 12', phone: '063777888', email: 'jovana.d@gmail.com', gender: 'female' },
      { username: 'nikola87', firstName: 'Nikola', lastName: 'Stanković', birthDate: '1987-12-25', address: 'Nemanjina 33', phone: '064999000', email: 'nikola.s@gmail.com', gender: 'male' },
      { username: 'tamara93', firstName: 'Tamara', lastName: 'Lukić', birthDate: '1993-03-18', address: 'Balkanska 5', phone: '065112233', email: 'tamara.l@gmail.com', gender: 'female' },
      { username: 'uros94', firstName: 'Uroš', lastName: 'Marković', birthDate: '1994-08-09', address: 'Bulevar Mihajla Pupina 10', phone: '063445566', email: 'uros.m@gmail.com', gender: 'male' },
      { username: 'marijana89', firstName: 'Marijana', lastName: 'Ristić', birthDate: '1989-01-30', address: 'Knez Mihailova 18', phone: '064778899', email: 'marijana.r@gmail.com', gender: 'female' },
    ], { individualHooks: true });

    console.log(`✅ Ubacio ${users.length} korisnika.`);
    console.log('🎉 Seed završen.');
    process.exit(0);

  } catch (err) {
    console.error('❌ Greška pri seed-u:', err);
    process.exit(1);
  }
})();
