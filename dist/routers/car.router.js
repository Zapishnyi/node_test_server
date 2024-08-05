"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carRouter = void 0;
const express_1 = require("express");
const car_controller_1 = require("../controllers/car.controller");
const tokenTypeList_enum_1 = require("../enums/tokenTypeList.enum");
const auth_check_1 = require("../middlewares/auth.check");
const car_check_1 = require("../middlewares/car.check");
const id_check_1 = require("../middlewares/id.check");
const validate_1 = require("../middlewares/validate");
const car_validator_1 = require("../validators/car.validator");
const router = (0, express_1.Router)();
router.get("/", car_controller_1.carController.findAll);
router.post("/", auth_check_1.auth.tokenCheck(tokenTypeList_enum_1.TokenEnumList.access), (0, validate_1.validate)(car_validator_1.validCar.create), car_controller_1.carController.addOne);
router.get("/:id", auth_check_1.auth.tokenCheck(tokenTypeList_enum_1.TokenEnumList.access), car_controller_1.carController.findOne);
router.patch("/:id", auth_check_1.auth.tokenCheck(tokenTypeList_enum_1.TokenEnumList.access), (0, id_check_1.idCheck)(), (0, validate_1.validate)(car_validator_1.validCar.update), car_check_1.carCheck.role(), car_controller_1.carController.updateOne);
router.put("/:id", auth_check_1.auth.tokenCheck(tokenTypeList_enum_1.TokenEnumList.access), (0, id_check_1.idCheck)(), (0, validate_1.validate)(car_validator_1.validCar.update), car_check_1.carCheck.role(), car_controller_1.carController.replaceOne);
router.delete("/:id", auth_check_1.auth.tokenCheck(tokenTypeList_enum_1.TokenEnumList.access), (0, id_check_1.idCheck)(), car_check_1.carCheck.role(), car_controller_1.carController.deleteOne);
exports.carRouter = router;
