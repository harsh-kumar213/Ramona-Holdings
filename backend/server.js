import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { connectDB } from './db/connectToDB.js';
import authRoutes from './routes/auth.routes.js';
import ideaRoutes from './routes/idea.routes.js';
import dealRoutes from './routes/deals.routes.js';
import contactRoutes from './routes/network.route.js';
import thesesRoutes from './routes/theses.routes.js';
import companyRoutes from './routes/company.routes.js';

dotenv.config();

console.log(process.env.MONGO_URI);

const app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/auth',authRoutes);
app.use('/ideas',ideaRoutes);
app.use('/deals',dealRoutes);
app.use('/contacts',contactRoutes);
app.use('/theses',thesesRoutes);
app.use('/company',companyRoutes);


app.listen(5000,()=>{
    connectDB();
    console.log('server listening on 5000')
})