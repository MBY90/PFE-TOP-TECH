const mongoose = require("mongoose");

const SensorSchema = new mongoose.Schema({
  user: { type: String, required: true},
  sensor_name: { type: String, required: true, unique: true },
  virbration: { type: Number,default:30 },
  temperature: { type: Number, default:40 },
  electromagnetic: { type: Number,default:2.5 }

});
module.exports = Sensor = mongoose.model("sensors", SensorSchema);