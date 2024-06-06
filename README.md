# Service User
Service user adalah bagian dari sebuah microservice yang dibangun untuk membuat API aplikasi crowdfunding, pada service ini digunakan untuk menghandle segala sesuatu tentang user dan token.

## Daftar Isi
1. [Prasyarat](#prasyarat)
2. [Teknologi yang Digunakan](#teknologi-yang-digunakan)
3. [Fitur-fitur](#fitur---fitur)
4. [Pemasangan](#pemasangan)

## Prasyarat
- [GIT](https://www.git-scm.com/downloads)
- [Node 20.14](https://nodejs.org/en/download/package-manager/current)
- [MySQL 8.0](https://dev.mysql.com/downloads/installer/)

## Teknologi yang Digunakan
- Express 4
- Express Validator
- Mysql2
- Sequelize
- Cors
- Dotenv
- Axios
- Bcrypt

## Fitur - fitur
1. **Autentikasi Pengguna:**
    - Register dan login pengguna.

2. **Manajemen User:**
    - Menampilkan data users.
    - Update data user.

3. **Manajemen Token:**
    - Membuat token baru.
    - Check token.

## Pemasangan
Langkah-langkah untuk menginstall proyek ini.

Clone proyek
```bash
git clone https://github.com/DimasPondra/service-user.git
```

Masuk ke dalam folder proyek
```bash
cd service-user
```

Install depedencies
```bash
npm install
```

Buat konfigurasi file
```bash
cp .env-example .env
```

Rubah `.env` untuk konfigurasi sesuai variabel
- `DB_HOST` - Hostname atau alamat IP server MySQL.
- `DB_DATABASE` - Database yang dibuat untuk aplikasi, default adalah laravel.
- `DB_USERNAME` - Username untuk mengakses database.
- `DB_PASSWORD` - Password untuk mengakses database.

- `URL_SERVICE_MEDIA` - Url untuk mengakses service media.

Migrasi database tabel awal
```bash
npx sequelize-cli db:migrate
```

Jalankan seeder
```bash
npx sequelize-cli db:seed:all
```

Mulai server
```bash
npm run start
```

Dengan mengikuti langkah-langkah di atas, Anda akan dapat menjalankan Service user dimana service tersebut bagian dari crowdfunding microservice.
