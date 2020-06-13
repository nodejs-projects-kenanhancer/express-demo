const { model, Schema } = require('mongoose');

const BookSchema = new Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        year: { type: Number, required: true },
        pages: { type: Number, required: true, min: 1 },
        createdAt: { type: Date, default: Date.now }
    },
    {
        versionKey: false
    }
);

// Sets the createdAt parameter equal to the current time
BookSchema.pre("save", next => {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }

    next();
});

const BookModel = model('book', BookSchema);

module.exports = () => ({
    find: async ({ id }) => await BookModel.findOne({ Id: id, deleted: false }),
    exists: async ({ id }) => await BookModel.exists({ Id: id }),
    update: async ({ id, data }) => await BookModel.updateOne({ Id: id }, data),
    delete: async ({ id }) => await BookModel.deleteOne({ Id: id }),
    create: async ({ data }) => {
        const model = new BookModel(data);

        return await model.save();
    }
});