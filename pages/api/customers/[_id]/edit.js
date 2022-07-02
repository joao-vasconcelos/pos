import database from '../../../../services/database';
import Customer from '../../../../models/Customer';

/* * */
/* EDIT CUSTOMER */
/* Explanation needed. */
/* * */

export default async function editCustomer(req, res) {
  //

  // 0. Refuse request if not PUT
  if (req.method != 'PUT') {
    await res.setHeader('Allow', ['PUT']);
    await res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    return;
  }

  // 1. Try to parse req.body into JSON
  try {
    req.body = await JSON.parse(req.body);
  } catch (err) {
    console.log(err);
    await res.status(500).json({ message: 'JSON parse error.' });
    return;
  }

  // 2. Try to connect to the database
  try {
    await database.connect();
  } catch (err) {
    console.log(err);
    await res.status(500).json({ message: 'Database connection error.' });
    return;
  }

  // 3. Check for uniqueness
  try {
    // The only value that needs to, and can be, unique is 'reference'.
    // Reasons: For 'contact_email', there can be two customers with different name but same email,
    // like a company that has several employees and needs to receive the invoices
    // in the same accounting email. For NIF, the same happens: there can be two people
    // that want to share the same NIF, but receive invoices in different emails.
    // This might be expanded in the future, if emails are necessary for account creation.
    if (req.body.reference) {
      const foundReference = await Customer.findOne({ reference: req.body.reference });
      if (foundReference._id != req.query._id) throw new Error('Já existe um cliente com a mesma referência');
    }
  } catch (err) {
    console.log(err);
    await res.status(409).json({ message: err.message });
    return;
  }

  // 4. Try to update the document with req.body
  try {
    const editedCustomer = await Customer.findOneAndUpdate({ _id: req.query._id }, req.body, {
      new: true, // Return the updated document
    });
    await res.status(200).json(editedCustomer);
    return;
  } catch (err) {
    console.log(err);
    await res.status(500).json({ message: 'Could not edit Customer.' });
    return;
  }
}
