module.exports = function(app) {
  var Movie = app.models.Movie;
  var Actor = app.models.Actor;
 
  app.dataSources.db.automigrate('Movie', function(err) {
    if (err) throw err;
 
    var movies = [
      {name: 'The Big Lebowski', description: "the room that fell apart when the rug went missing", runtime:5000},
      {name: 'Wall-E', description: "tiny robot, giant heart", runtime:4000},
      {name: 'The Day the Earth Stood Still', description: "see title", runtime:8000},
      {name: 'Princess Bride', description: "aaaaas yoouuuuuu wishhhhhh", runtime:5000},
      
      ];
    
    var i = 0;
    for(; i < movies.length; i++){
       Movie.create(movies[i], function(err, instance) {
        if (err) return console.error(err);
        console.log('Movie created: ', instance);
      });
    }


    var actors = [
       {name: 'Dame Judi Dench', dateofbirth:new Date("October 13, 2014 11:13:00"), bio:"Long time dench, more recently a dame too"},
       {name: 'Tadi Mason', dateofbirth:new Date("January 12, 1912 11:13:00"), bio:"good friend to call"},
       {name: 'Judy Garland', dateofbirth:new Date("October 13, 2014 11:13:00"), bio:"neither dame nor dench"},
    ];

    i=0;
    for(; i < actors.length; i++){
      Actor.create(actors[i], function(err, instance){
        if (err) return console.error(err);
        console.log('Actor created: ', instance);

       
            instance.movies.add(movies[1], function(error){
            if (err) return console.error(err);
            });
       
      });
    }


  });
};