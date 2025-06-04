import mongoose from 'mongoose';
import 'dotenv/config';

const dbConnect = async () => {
    const uri = process.env.MONGO_URI;

    if (!uri) {
        console.error("❌ MongoDB URI not found in environment variables.");
        process.exit(1);
    }

    try {
        const conn = await mongoose.connect(uri, {
           
            tls: true, // ✅ use 'tls' instead of 'ssl'
            tlsAllowInvalidCertificates: false, // 🔒 Only set to true if you're testing with a self-signed cert
            serverSelectionTimeoutMS: 5000,
        });

        console.log(`✅ Database connected....!`);
    } catch (err) {
        console.error('❌ MongoDB connection failed.');
        console.error('🔍 Error name:', err.name);
        console.error('📄 Message:', err.message);
        console.error('📚 Stack:', err.stack);
        process.exit(1);
    }
};

export default dbConnect;
