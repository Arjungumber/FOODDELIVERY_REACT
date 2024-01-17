// this file is  been used as an api for foods

import { Router } from "express";
import { FoodModel } from "../models//food.model.js";
import handler from "express-async-handler";

const router = Router();

router.get(
  "/",
  handler(async (req, res) => {
    const foods = await FoodModel.find({});
    res.send(foods);
  })
);

router.get(
  "/tags",
  handler(async (req, res) => {
    const tags = await FoodModel.aggregate([
      // everything which has $ sign infront of them is operator here.
      {
        $unwind: "$tags",
      },
      // making tags flat, making row for every single tag.
      {
        // grouping those tags with id of tags
        $group: {
          _id: "$tags",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: "$count",
        },
      },
    ]).sort({ count: -1 }); // sorting in descending order
    const all = {
      name: "All",
      count: await FoodModel.countDocuments(),
    };
    tags.unshift(all); // it will add allto the beggining
    res.send(tags);
  })
);

router.get(
  "/search/:searchTerm",
  handler(async (req, res) => {
    const { searchTerm } = req.params;
    const searchRegex = new RegExp(searchTerm,'i'); // i as second parameter means case insensitive
    const foods = await FoodModel.find({name:{$regex:searchRegex}});
    res.send(foods);
  })
);

router.get(
  "/tag/:tag",
  handler(async (req, res) => {
    const { tag } = req.params;
    const foods = await FoodModel.find({tags:tag});
    res.send(foods);
  })
);

router.get(
  "/:foodId",
  handler(async (req, res) => {
    const { foodId } = req.params;
    const food = await FoodModel.findById(foodId);
    res.send(food);
  })
);

export default router;
