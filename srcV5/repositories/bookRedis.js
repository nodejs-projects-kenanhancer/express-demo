const { getAsync, setexAsync } = require('../dataSources/redisDS');

module.exports = () => ({
    find: async (id) => await getAsync(id).then(res => JSON.parse(res)),
    exists: async (id) => await Promise.resolve(),
    update: async (id, data) => await Promise.resolve(),
    delete: async (id) => await Promise.resolve(),
    create: async (data) => {
        await setexAsync(data.id, 3600, JSON.stringify(data));

        return data;
    }
});