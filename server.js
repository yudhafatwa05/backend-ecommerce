const app = require('./index');
const { sequelize } = require('./models'); // Koneksi ke database

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate(); // Test koneksi ke database
    console.log('✅ Database connected successfully');

    // Sinkronisasi database jika diperlukan (gunakan dengan hati-hati)
    // await sequelize.sync({ force: false }); 

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
    process.exit(1); // Keluar dari proses jika database gagal koneksi
  }
};

startServer();
