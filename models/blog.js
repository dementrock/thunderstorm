module.exports = function(mongoose, app) {
  var Schema = mongoose.Schema;
  var ObjectId = Schema.ObjectId;

  /** A user. */
  BlogSchema = new Schema({
    user : {
      type: ObjectId,
      ref: 'User'
    },
    title: {
      type: String,
      required: true
    },
    body: {
      type: String
    },
    date: {
      type: Date
    }
  });

  mongoose.model('Blog', BlogSchema);
  
  Blog = mongoose.model('Blog');
}
