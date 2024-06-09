const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://lockinjce:QbOfsKS3Jahe15Kt@cluster0.go6anse.mongodb.net/Coastdb?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/CoastToCoast', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

module.exports = mongoose.connection;