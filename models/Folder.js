/* * * * * */
/* MODEL: FOLDER */
/* * */

/* * */
/* IMPORTS */
import mongoose from 'mongoose';

/* * */
/* Schema for MongoDB ["Folder"] Object */
module.exports =
  mongoose.models.Folder ||
  mongoose.model(
    'Folder',
    new mongoose.Schema({
      title: {
        type: String,
        maxlength: 30,
        default: 'Untitled',
      },
      position: {
        type: Number,
      },
      slots: [
        {
          position: { type: Number },
          product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        },
      ],
    })
  );
