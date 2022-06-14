/* * * * * */
/* MODEL: TRANSACTION */
/* * */

/* * */
/* IMPORTS */
import mongoose from 'mongoose';

/* * */
/* Schema for MongoDB ["Transaction"] Object */
module.exports =
  mongoose.models.Transaction ||
  mongoose.model(
    'Transaction',
    new mongoose.Schema({
      timestamp: {
        type: String,
        maxlength: 30,
      },
      location: {
        title: {
          type: String,
          maxlength: 30,
        },
        apicbase: {
          outlet_id: {
            type: String,
            maxlength: 30,
          },
        },
      },
      customer: {
        customer_id: {
          type: String,
          maxlength: 30,
        },
        name: {
          first: {
            type: String,
            maxlength: 30,
          },
          last: {
            type: String,
            maxlength: 30,
          },
        },
        reference: {
          type: String,
          maxlength: 30,
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
      items: [
        {
          product_id: {
            type: String,
            maxlength: 30,
          },
          product_image: {
            type: String,
            maxlength: 30,
          },
          product_title: {
            type: String,
            maxlength: 30,
          },
          variation_id: {
            type: String,
            maxlength: 30,
          },
          variation_title: {
            type: String,
            maxlength: 50,
          },
          price: {
            type: Number,
          },
          vat_id: {
            type: String,
            maxlength: 3, // NOR, INT, RED
          },
          vat_percentage: {
            type: Number,
          },
          qty: {
            type: Number,
          },
          apicbase: {
            recipe_id: {
              type: String,
              maxlength: 30,
            },
          },
        },
      ],
      discounts: [
        {
          title: {
            type: String,
            maxlength: 30,
          },
          subtitle: {
            type: String,
            maxlength: 50,
          },
          amount: {
            type: Number,
          },
        },
      ],
      payment: {
        is_paid: {
          type: Boolean,
        },
        method: {
          type: String,
        },
      },
      invoice: {
        id: {
          type: String,
        },
        type: {
          type: String,
        },
        number: {
          type: String,
        },
        date: {
          type: String,
        },
        system_time: {
          type: String,
        },
        local_time: {
          type: String,
        },
        amount_gross: {
          type: String,
        },
        amount_net: {
          type: String,
        },
        hash: {
          type: String,
        },
      },
    })
  );
