const userSchema = require('../schemas/userSchema');

let users = [];

exports.insertUser = (req, res) => {
    const { error } = userSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = {
        id: users.length + 1,
        ...req.body
    };
    users.push(user);
    res.send(user);
};

exports.getAllUsers = (req, res) => {
    res.send(users);
};

exports.deleteUser = (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found.');

    const index = users.indexOf(user);
    users.splice(index, 1);

    res.send(user);
};


exports.updateUser = (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found.');

    const { error } = userSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    user.name = req.body.name;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.image = req.body.image;
    user.status = req.body.status;
    user.updated_date = new Date().toISOString();

    res.send(user);
};

exports.searchUsers = (req, res) => {
    const { query } = req.query;
    const results = users.filter(user => {
        return user.name.includes(query) || user.email.includes(query) || user.phone.includes(query);
    });
    res.send(results);
};

exports.paginateUsers = (req, res) => {
    const pageSize = 10;
    const page = parseInt(req.params.page);
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;

    const results = users.slice(startIndex, endIndex);
    res.send(results);
};

exports.deleteMultipleUsers = (req, res) => {
    const { ids } = req.body;
    const deletedUsers = [];

    ids.forEach(id => {
        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex !== -1) {
            deletedUsers.push(users[userIndex]);
            users.splice(userIndex, 1);
        }
    });

    res.send(deletedUsers);
};
