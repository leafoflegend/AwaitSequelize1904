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

const runApp = async () => {
  await db.sync({ force: true });

  const kevin = await Person.create({ name: 'Kevin Yu' });
  const wa6 = await Task.create({ title: 'Weekend Assignment 6', dueDate: Date.now() });

  // Alternatively, we could have used Promise.all();
  // const [kevin, wa6] = await Promise.all([
  //   Person.create({ name: 'Kevin Yu' }),
  //   Task.create({ title: 'Weekend Assignment 6', dueDate: Date.now() }),
  // ]);

  await kevin.addTask(wa6);

  const nowKevin = await Person.findOne({
    where: {
      name: 'Kevin Yu',
    },
    // This is a way to get the tasks without the additional method below.
    // include: [Task],
  });

  const kevinsTasks = await nowKevin.getTasks();

  kevinsTasks.forEach(task => {
    console.log(task.get());
  });
};

runApp();
