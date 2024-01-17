import { Router } from "express";
import handler from "express-async-handler";
import auth from "../middleware/auth.mid.js";
import { BAD_REQUEST, UNAUTHORIZED } from "../constants/httpStatus.js";
import { OrderModel } from "../models/order.model.js";
import { OrderStatus } from "../constants/orderStatus.js";
import { UserModel } from "../models/user.model.js";

const router = Router();
router.use(auth);

// here we created an api of method post
router.post(
  "/create",
  handler(async (req, res) => {
    const order = req.body;

    if (order.items.length <= 0) res.status(BAD_REQUEST).send("Cart Is Empty!");

    await OrderModel.deleteOne({
      user: req.user.id,
      status: OrderStatus.NEW,
    });

    const newOrder = new OrderModel({ ...order, user: req.user.id });
    await newOrder.save();
    res.send(newOrder);
  })
);

// we normally use put method to update existing thing inside the db
router.put(
  "/pay",
  handler(async (req, res) => {
    const { paymentId } = req.body;
    const order = await getNewOrderForCurrentUser(req);
    if (!order) {
      res.status(BAD_REQUEST).send("Order Not Found!");
      return;
    }

    order.paymentId = paymentId;
    order.status = OrderStatus.PAYED;
    await order.save();

    res.send(order._id);
  })
);

router.get(
  "/track/:orderId",
  handler(async (req, res) => {
    const { orderId } = req.params;
    const user = await UserModel.findById(req.user.id);

    const filter = {
      _id: orderId,
    };
    if (!user.isAdmin) {
      filter.user = user._id;
    }
    const order = await OrderModel.findOne(filter);

    if (!order) return res.send(UNAUTHORIZED);
    // else send the order
    return res.send(order);
  })
);

router.get(
  "/newOrderForCurrentUser",
  handler(async (req, res) => {
    const order = await getNewOrderForCurrentUser(req);
    if (order) res.send(order);
    else res.status(BAD_REQUEST).send();
  })
);

//this is a opitional parameter, wherebif we go not put any parameter it will show all order
router.get(
  "/:status?",
  handler(async (req, res) => {
    const status = req.params.status;
    const user = await UserModel.findById(req.user.id);
    const filter = {};

    if (!user.isAdmin) filter.user = user._id;
    // admin will be able to see all persons orders.
    if (status) filter.status = status;

    // minus (-) is for
    //descending i.e it will show the latest order
    const orders = await OrderModel.find(filter).sort("-createdAt");
    res.send(orders);
  })
);

const getNewOrderForCurrentUser = async (req) => {
  await OrderModel.findOne({ user: req.user.id, status: OrderStatus.NEW });
};

export default router;
