const { model, Schema, Types: { ObjectId } } = require('mongoose');
const string = require('@hapi/joi/lib/types/string');

const BookSchema = new Schema(
    {
        id: { type: string, required: true, unique: true },
        title: { type: String, required: true },
        author: { type: String, required: true },
        year: { type: Number, required: true },
        pages: { type: Number, required: true, min: 1 },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        deleted: { type: Boolean, default: false }
    },
    {
        versionKey: false
    }
);

// Sets the createdAt parameter equal to the current time
// BookSchema.pre("save", function (next) {
//     let now = Date.now();

//     this.updatedAt = now;

//     // Set a value for createdAt only if it is null
//     if (!this.createdAt) {
//         this.createdAt = now;
//     }

//     next();
// });

const BookModel = model('book', BookSchema);

module.exports = () => ({
    find: async (id) => await BookModel.findById(id),
    exists: async (id) => await BookModel.exists({ id }),
    update: async (id, data) => await BookModel.updateOne({ id }, data),
    delete: async (id) => await BookModel.deleteOne({ id }),
    create: async (data) => {
        const model = new BookModel(data);

        return await model.save();
    }
});