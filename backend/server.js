import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

import { connectDB } from './db/connectToDB.js';
import authRoutes from './routes/auth.routes.js';
import ideaRoutes from './routes/idea.routes.js';
import dealRoutes from './routes/deals.routes.js';
import contactRoutes from './routes/network.route.js';
import thesesRoutes from './routes/theses.routes.js';
import companyRoutes from './routes/company.routes.js';
import taskRoutes from './routes/tasks.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



dotenv.config();


const app = express();
const PORT = 5000|| process.env.PORT;
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth',authRoutes);
app.use('/api/home/tasks',taskRoutes);
app.use('/api/ideas',ideaRoutes);
app.use('/api/deals',dealRoutes);
app.use('/api/contacts',contactRoutes);
app.use('/api/theses',thesesRoutes);
app.use('/api/company',companyRoutes);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/dist","index.html"));
})
app.listen(PORT,()=>{
    connectDB();
    console.log(`server listening on ${PORT}`)
})