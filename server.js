const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth_routes');
const roomRoutes = require('./routes/room_routes');
const reservationRoutes = require('./routes/reservation_routes');
const eventRoutes = require('./routes/event_routes')

const areaRoutes = require('./routes/areas_routes')
const protectedRoutes = require('./routes/protected_routes');
const otherRoutes = require('./routes/other_routes');
const articlesRoutes = require('./routes/articles_routes');

const devisRoutes = require("./routes/devis_routes")
const activitiesRoutes = require("./routes/activity_routes")
const filesRoutes = require("./routes/files_routes")
const notificationRoutes = require("./routes/notification_routes")


const cors = require('cors')
//test commit
const app = express();
app.use(express.json())
app.use(cors());
app.use("/image", express.static("image"));
app.use('/api', protectedRoutes);
app.use('/api/area/', areaRoutes);
app.use('/api/room/', roomRoutes);
app.use('/api/reservation/', reservationRoutes);
app.use('/api/files', filesRoutes);
app.use('/api/',otherRoutes)
app.use('/api/auth', authRoutes);
app.use("/api/devis",devisRoutes)
app.use("/api/activities",activitiesRoutes)
app.use("/api/articles",articlesRoutes)
app.use("/api/notification",notificationRoutes)


app.use('/api', eventRoutes);

app.use

dotenv.config();

const mongoURI = 'mongodb://admin:cnsl20242024@5.135.79.201:27017/?directConnection=true&appName=mongosh+2.2.12';

mongoose.connect(mongoURI, {
 

  // Other options
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB server.');
});

app.listen(8001, () => {
  console.log(`Server running on port 1`);})
