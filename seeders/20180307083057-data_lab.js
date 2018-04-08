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
    return queryInterface.bulkInsert('Labs',[
      {id:1, nickname:'EAD', nama: 'Enterprise Application Development', description: '', location:'C223'},
      {id:2, nickname:'DASPRO', nama: 'Dasar Pemograman', description: '', location:'C201'},
      {id:3, nickname:'SISJAR', nama: 'Sistem Operasi & Jaringan', description: '', location:'C203'},
      {id:4, nickname:'ERP', nama: 'Enterprise Resource Planning', description: '', location:'C222'},
      {id:5, nickname:'BPAD', nama: 'Business Planning Architecture Development', description: '', location:'C220'},
      {id:6, nickname:'ITG-RC', nama: 'IT Lay', description: '', location:'C215'}
    ], {});
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
