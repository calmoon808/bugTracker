exports.seed = function(knex) {
  return knex('comments').del()
  .then(function () {
    return knex('comments').insert([
      {
        comment: "Yes it is very difficult, and very hard to manage. Will continue to try and succeed. WISH ME LUCK@@!!!!!!!!!!!!!!!!!!",
        poster_id: 4,
        bug_id: 12
      },
      {
        comment: "Yup this looks really hard, I'm out!!!! SORRY!",
        poster_id: 45,
        bug_id: 12
      },
      {
        comment: "best of luck. lol",
        poster_id: 44,
        bug_id: 12
      },
      {
        comment: "haha. thanks guys",
        poster_id: 4,
        bug_id: 12
      },
      {
        comment: "What exactly is wrong again?",
        poster_id: 4,
        bug_id: 13
      },
      {
        comment: "While playing for the first couple of hours everything works fine, but afterwards it randomly gets really rough",
        poster_id: 38,
        bug_id: 13
      },
      {
        comment: "OK cool, I'll look into it.",
        poster_id: 4,
        bug_id: 13
      },
      {
        comment: "ITS...................EVERY...............WHERE",
        poster_id: 40,
        bug_id: 14 
      },
      {
        comment: "it smells really bad too",
        poster_id: 42,
        bug_id: 14 
      },
      {
        comment: "seriously....wth is going on.....",
        poster_id: 45,
        bug_id: 14 
      },
      {
        comment: "Currently talking with new supplier, will fill you in on details soon.",
        poster_id: 43,
        bug_id: 14 
      },
      {
        comment: "haha. glad I waited to test it out.",
        poster_id: 44,
        bug_id: 14 
      },
      {
        comment: "I'd advise to proceed with precaution",
        poster_id: 42,
        bug_id: 15
      },
      {
        comment: "This might be related to another bug related with the pain receptors",
        poster_id: 4,
        bug_id: 15 
      },
      {
        comment: "I'm reloading the videos now",
        poster_id: 44,
        bug_id: 16 
      },
      {
        comment: "Talking with some local devs there.",
        poster_id: 4,
        bug_id: 17
      },
      {
        comment: "Things are coming along nicely.",
        poster_id: 4,
        bug_id: 17 
      },
      {
        comment: "Please nerf Gold Face!!!!!!",
        poster_id: 50,
        bug_id: 18 
      },
      {
        comment: "git gud.",
        poster_id: 4,
        bug_id: 18 
      },
      {
        comment: "haha jk. I've been getting a lot of feedback on the last boss as well. idk whether or not I want to nerf the boss or buff Dwight instead",
        poster_id: 4,
        bug_id: 18
      },
    ]);
  });
};
