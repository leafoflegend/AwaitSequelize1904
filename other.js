const Sequelize = require('sequelize');
const db = new Sequelize('postgres://eszwajkowski@localhost:5432/await_sequelize', {
  logging: false,
});

const Person = db.define('person', {
  name: Sequelize.STRING,
});

const Task = db.define('task', {
  title: Sequelize.STRING,
  dueDate: Sequelize.DATE,
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  }
});

Person.hasMany(Task);
Task.belongsTo(Person);

// Just to prove youre wrong...
const runApp = async () => {
  await db.sync({ force: true });

  const kevin = await Person.create({ name: 'Kevin Yu' });
  const wa6 = await Task.create({ title: 'Weekend Assignment 6', dueDate: Date.now(), personId: kevin.id });

  console.log(wa6.personId);
};

runApp();
