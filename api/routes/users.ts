import { Router } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { CustomRequest, auth } from "../middleware/auth";

const router = Router();

router.post("/register", async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).send("Auth failed, email not found");
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(400).send("Wrong password");
    }

    const payload = {
      userId: user._id.toHexString(),
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({ user, accessToken });
  } catch (err) {
    next(err);
  }
});

router.get("/auth", auth, async (req: CustomRequest, res, next) => {
  return res.status(200).json({
    id: req.authUser._id,
    email: req.authUser.email,
  });
});

module.exports = router;
