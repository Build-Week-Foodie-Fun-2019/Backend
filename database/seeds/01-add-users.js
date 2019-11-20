exports.seed = function(knex) {
  return knex("users").insert([
    {
     
      user_username: "josh_armantrout",
      user_password: "p4$$w0rd",
      user_email: "josh.armantrout@email.com",
      user_location: "Richmond, Virginia, US"
    },
    {
     
      user_username: "iffy_oak",
      user_password: "c00l_pa$$word",
      user_email: "ifiok@email.com",
      user_location: "Calabar, Cross River State, NG"
    },
    {
   
      user_username: "oluwajoba_bello",
      user_password: "be11o_p4$$w0rd",
      user_email: "oluwajoba@email.com",
      user_location: "London, UK"
    }
  ]);
};
