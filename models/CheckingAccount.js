/* * * * * */
/* MODEL: CHECKING ACCOUNT */
/* * */

/* * */
/* IMPORTS */
import mongoose from 'mongoose';

/* * */
/* Schema for MongoDB ["CheckingAccount"] Object */
module.exports =
  mongoose.models.CheckingAccount ||
  mongoose.model(
    'CheckingAccount',
    new mongoose.Schema({
      title: {
        type: String,
        maxlength: 30,
        required: true,
      },
      client: {
        name: {
          type: String,
        },
        tax: {
          country: {
            type: String,
            minlength: 2,
            maxlength: 2,
            default: 'PT',
          },
          number: {
            type: String,
            minlength: 9,
            maxlength: 9,
          },
        },
      },
    })
  );
