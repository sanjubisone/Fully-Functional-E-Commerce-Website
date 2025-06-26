const Address = require('../../models/address');

const addAddress = async (req, res) => {
  try {
    const { fullName, phoneNumber, addressLine1, addressLine2, city, state, postalCode, country, isDefault ,userId } = req.body;
    // const userId = req.user._id; // assuming you have auth middleware
    console.log('userid ',userId)

    const address = new Address({
      fullName,
      phoneNumber,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      isDefault,
      userId
    });

    await address.save();
    res.status(201).json({ success: true, message: "Address added successfully", address });
  } catch (error) {
    console.log('error ',error)
    res.status(500).json({ success: false, message: "Error adding address", error });
  }
};


const editAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    const userId = req.user._id; // assuming you have auth middleware

    const updatedAddress = await Address.findOneAndUpdate(
      { _id: addressId, userId },
      req.body,
      { new: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({ success: false, message: "Address not found or unauthorized" });
    }

    res.status(200).json({ success: true, message: "Address updated successfully", address: updatedAddress });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating address", error });
  }
};


const deleteAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    const userId = req.user._id; // assuming you have auth middleware

    const deleted = await Address.findOneAndDelete({ _id: addressId, userId });

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Address not found or unauthorized" });
    }

    res.status(200).json({ success: true, message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting address", error });
  }
};



const getAllAddresses = async (req, res) => {
  try {
    const {userId} = req.params
    const addresses = await Address.find({ userId });
    res.status(200).json({ success: true, addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching addresses", error });
  }
};

module.exports = {addAddress ,editAddress ,deleteAddress ,getAllAddresses}
