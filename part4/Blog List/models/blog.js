const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: { type: String, default: 'Untitled' },
  author: { type: String, default: 'Unknown' },
  url: { type: String, default: '' },
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  likes: { type: Number, default: 0 }
})


blogSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString()
    delete returnObject._id
    delete returnObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)
