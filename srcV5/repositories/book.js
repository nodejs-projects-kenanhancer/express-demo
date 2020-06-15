const { v4: uuidv4 } = require('uuid');

module.exports = ({ dataSource = require('./bookMongodb') }) => {
    const actions = dataSource();

    return {
        find: async (id) => await actions.find(id),
        exists: async (id) => await actions.exists(id),
        update: async (id, data) => {
            data.updatedAt = Date.now();

            await actions.update(id, data);
        },
        delete: async (id) => await actions.delete(id),
        create: async (data) => {
            data.id = uuidv4();

            data.updatedAt = Date.now();

            // Set a value for createdAt only if it is null
            if (!data.createdAt) {
                data.createdAt = data.updatedAt;
            }

            await actions.create(data);

            return data;
        }
    };
};