import express from 'express'
import adminUserRoutes from './routes/AdminUser.route'
import adminRoutes from './routes/adminRoutes'
import categoryRoutes from './routes/Category.route'
import subcategoryRoutes from './routes/Subcategory.routes'

const app = express();

app.use(express.json({strict: false}));

app.use('/api/admin', adminUserRoutes);

app.use('/admin', adminRoutes);

app.use('/api/categories', categoryRoutes);

app.use('/api/subcategories', subcategoryRoutes);

app.get("/", (req, res) => {
    res.send("Admin Backend is running!");
});

export default app;