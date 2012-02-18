/** Encryption dependencies. */
var crypto = require('crypto');

module.exports = function(mongoose, app) {
  var Schema = mongoose.Schema;
  var ObjectId = Schema.ObjectId;

  /** A user. */
  UserSchema = new Schema({
    username: {
      type: String,
      required: true,
      index: {
        unique: true
      }
    },
    name: {
      type: String,
      required: true
    },
    hashed_password: {
      type: String,
      required: true
    }
  });

  /** Password conversion. */
  UserSchema.virtual('password').set(function(password) {
    this.salt = randomToken();
    this.hashed_password = this.encryptPassword(password);
  });
  /** Password authentication. */
  UserSchema.method('authenticate', function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  });
  /** Password encryption. */
  UserSchema.method('encryptPassword', function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
  });
  mongoose.model('User', UserSchema);

  User = mongoose.model('User');
  User.GUEST = new User({
    username: 'Guest',
    name: "Guest"
  });
}
