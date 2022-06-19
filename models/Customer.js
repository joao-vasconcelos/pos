/* * * * * */
/* MODEL: CUSTOMER */
/* * */

/* * */
/* IMPORTS */
import mongoose from 'mongoose';

/* * */
/* Schema for MongoDB ["Customer"] Object */
module.exports =
  mongoose.models.Customer ||
  mongoose.model(
    'Customer',
    new mongoose.Schema({
      first_name: {
        type: String,
        maxlength: 30,
      },
      last_name: {
        type: String,
        maxlength: 30,
      },
      email: {
        type: String,
        maxlength: 50,
        unique: true,
      },
      tax_country: {
        type: String,
        minlength: 2,
        maxlength: 2,
      },
      tax_number: {
        type: String,
        minlength: 9,
        maxlength: 9,
      },
      reference: {
        type: String,
        maxlength: 30,
      },
      birthday: {
        type: String,
        maxlength: 30,
      },
    })
  );
