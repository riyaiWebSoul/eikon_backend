const mongoose = require('mongoose');
const { Schema } = mongoose;

const aboutSchema = new Schema({
   
        title: String,
        description: String,
        mainContant:[{
                SubTile:String,
                descriptionSub0:String,
                descriptionSub1:String,
                descriptionSub2:String,
                descriptionSub3:String,
                Image:String
        }]
        
      

       
        

});

exports.about = mongoose.model('about', aboutSchema);
