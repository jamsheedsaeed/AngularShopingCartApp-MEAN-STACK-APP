var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CartSchema = new Schema({

	creator: {type:Schema.Types.ObjectId, ref: 'User'},
    pname: String,
    price: Number,
    url: String,
    create: { type:Date, default: Date.now  }
    
});

module.exports = mongoose.model('UserCart', CartSchema);