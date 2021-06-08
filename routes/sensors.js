  
const express = require("express");
const router = express.Router();
const Sensor =require("../models/Sensor");
const auth = require('../middelware/auth');



router.post("/newSensor", auth,(req, res) => {
    const {user,sensor_name, virbration, temperature, electromagnetic} = req.body;
    if (!sensor_name) 
    {return res.status(400).json({msg:'Please enter sensor name'});}
    const newSensor = new Sensor({ user,sensor_name, virbration, temperature, electromagnetic});
    newSensor
      .save()
      .then((sensors) => res.send(sensors))
      .catch((err) => {res.send(err)
}
      );
              
    
  });



  router.get("/updatedsensor/:user",(req,res)=>
  {
      const { user } = req.params;
      Sensor.find({ user })
       .then((sensors) =>
       
       {
         if(!sensors) return res.status(400).json({msg:'no sensors for this user '});
        res.send(sensors)

       }
      )
        .catch((err) =>   res.status(400).json({ msg: err.message })
        
        );

  }
  
  );

  router.put("/put/:sensor_name",auth, (req, res) => {
    const { sensor_name } = req.params;

    const {virbration, temperature, electromagnetic } = req.body;
    Sensor.findOneAndUpdate({ sensor_name },
     { $set: {virbration, temperature, electromagnetic } })
      .then((sensors) => {
            if (!sensors) return res.status(400).json({msg:'Sensor does not exist'});

        res.send(sensors) 
      }
      
      )
      .catch((err) => res.status(400).json({ msg: err.message }));
  });

  router.delete("/delete/:sensor_name",auth, (req, res) => {
    const { sensor_name } = req.params;
    Sensor.findOneAndDelete({ sensor_name })
      .then((sensors) =>
   {    if (!sensors) return res.status(400).json({msg:'Sensor does not exist'});
      res.send(sensors)
  }
      )
      .catch((err) => res.status(400).json({ msg: err.message }));
  });
  module.exports = router;