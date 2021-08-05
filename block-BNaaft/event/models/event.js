var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    title:{type:String,required:true},
    summary:String,
    host:String,
    start_date:Date,
    end_date:Date,
    event_caregory:[String],
    location:String,
    likes:{type:Number,default:0},
    remark_id:{type:Schema.Types.ObjectId , ref : 'Remark'}
},{timestamps:true})

var Event = mongoose.model('Event',eventSchema);
module.exports = Event;