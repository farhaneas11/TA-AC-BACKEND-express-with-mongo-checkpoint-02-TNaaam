var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var remarkSchema = new Schema({
    remark_title:{type:String,required:true},
    remark_author:String,
    remark_like:{type:Number , default:0},
    event_id:{type:Schema.Types.ObjectId , ref : 'Event'}
},{timestamps:true})

var Remark = mongoose.model('Remark',remarkSchema);
module.exports = Remark;