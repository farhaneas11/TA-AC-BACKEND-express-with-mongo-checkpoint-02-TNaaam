var express = require('express');
var router = express.Router();
var Events = require('../models/event');
var Remark = require('../models/remark');

//Add new event handler
router.get('/new', (req,res) => {
  res.render('newevent');
});

//home page with Details
router.get('/',(req,res,next) => {
  var id = req.params.id;
  // res.send('events')
  Events.find({},(err,events)=>{
    if(err) return next(err);
    res.render('home',{events : events});
    // res.send(events)
  })
});

//Get the Event Details
router.get('/:id',(req,res,next)=>{
  var id = req.params.id;
  Events.findById(id,(err,events)=>{
    if(err) return next(err);
    res.render('eventdetail',{events})
  })
})

//Post the new Event into the Detail Page
router.post('/',(req,res,next)=>{
  req.body.event_category = req.body.event_category.trim().split(' ');
  Events.create(req.body,(err,events)=>{
    if(err) return next(err);
    res.redirect('/event/');
  })
});

//Delete Option Event
router.get('/:id/delete', function (req, res, next) {
  var id = req.params.id;
  Events.findByIdAndRemove(id, (err, events) => {
    console.log(events);
    Remark.findByIdAndUpdate(
      events.remark_id,
      { $pull: { remark_id: events._id } },
      (err, remarks) => {
        res.redirect('/books/');
      }
    );
  });
});

//like Increase
router.get('/:id/likes',(req,res,next)=>{
  var id = req.params.id;
  Events.findByIdAndUpdate(id,{$inc : {likes : 1}},(err,events)=>{
    if(err) return next(err);
    res.redirect('/event/' + id);
  })
} );



module.exports = router;
