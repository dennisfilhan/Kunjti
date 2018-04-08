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
    return queryInterface.bulkInsert('Praktikums',[
      {lab:2, nama:'Algoritma Pemograman', periode:'2017-2017', angkatan:2016, jumlah_modul:6, description:'Algoritma Pemograman - Daspro'},
      {lab:2, nama:'Struktur Data', periode:'2017-2017', angkatan:2016, jumlah_modul:5, description:'STUKDAT - DASPRO'},
      {lab:1, nama:'Object Oriented Programming', periode:'2017-2017', angkatan:2016, jumlah_modul:6, description:'OOP - EAD'},
      {lab:1, nama:'Basis Data', periode:'2018-2018', angkatan:2016, jumlah_modul:6, description:'BASDAT - EAD'},
      {lab:3, nama:'Desain Jaringan', periode:'2018-2018', angkatan:2016, jumlah_modul:5, description:''},
      {lab:3, nama:'Manajemen Jaringan Komputer', periode:'2018-2018', angkatan:2016, jumlah_modul:5, description:''},
      {lab:4, nama:'SCM100', periode:'2018-2018', angkatan:2016, jumlah_modul:3, description:''},
      {lab:4, nama:'SCM300', periode:'2018-2018', angkatan:2016, jumlah_modul:3, description:''},
      {lab:5, nama:'Analisis Perancangan Aplikasi', periode:'2018-2018', angkatan:2016, jumlah_modul:5, description:''},
      {lab:5, nama:'Rekayasa Proses Bisnis', periode:'2018-2018', angkatan:2016, jumlah_modul:6, description:''},
      {lab:6, nama:'Manajemen Layanan', periode:'2018-2018', angkatan:2016, jumlah_modul:4, description:''}
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    queryInterface.bulkDelete('Praktikums', null, {});
  }
};
