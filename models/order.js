const { model, Schema } = require("mongoose");

const orderSchema = Schema(
  {
    user: {
      name: {
        type: String,
        required: true,
      },
      userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Users",
      },
    },
    products: [
      {
        product: {
          type: Object,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    total: {
      type: Number,
      required: true
    }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

module.exports = model("Order", orderSchema);
