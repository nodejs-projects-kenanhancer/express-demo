module.exports = () => ({
    find: async (id) => await Promise.resolve(),
    exists: async (id) => await Promise.resolve(),
    update: async (id, data) => await Promise.resolve(),
    delete: async (id) => await Promise.resolve(),
    create: async (data) => {

        return await Promise.resolve();
    }
});