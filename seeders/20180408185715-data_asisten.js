'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Asistens', [
        {codename: 'KNA', fullname: 'Khania Putri Kusuma Dewi', labId: 1},
        {codename: 'KEN', fullname: 'Niken Febriani Kusumawati', labId: 1},
        {codename: 'NCP', fullname: 'Nur Cahyadi Perdana', labId: 1},
        {codename: 'ZAK', fullname: 'Mohammad Reza Effendy', labId: 1},
        {codename: 'BAY', fullname: 'Bayu Ariantika Irsan', labId: 1},
        {codename: 'RFT', fullname: 'Siti Raftiana Putri', labId: 1},
        {codename: 'AUL', fullname: 'Siti Aulia Noor', labId: 1},
        {codename: 'VNY', fullname: 'Veny Amilia Fitri', labId: 1},
        {codename: 'NUB', fullname: 'Ghuniyu Fattah Rozaq', labId: 1},
        {codename: 'IGO', fullname: 'Yudanto Anas Nugroho', labId: 1},
        {codename: 'SAN', fullname: 'Muhamad Ikhsan Laisa', labId: 1},
        {codename: 'DNN', fullname: 'Filhan Dennis', labId: 1},
        {codename: 'AHA', fullname: 'Amri Hanif', labId: 1},
        {codename: 'GWD', fullname: 'Ginanjar Widya Pamungkas', labId: 1},
        {codename: 'HAM', fullname: 'Muhammad Ilham', labId: 1},
        {codename: 'OJI', fullname: 'Aji Nur Laksono', labId: 1},
        {codename: 'TFD', fullname: 'Taufan Fadhilah Iskandar', labId: 1},
        {codename: 'MAA', fullname: 'Moh. Akbar Anshory', labId: 1}
      ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
