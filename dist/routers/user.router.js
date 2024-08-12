"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const express_rate_limit_1 = require("express-rate-limit");
const user_controller_1 = require("../controllers/user.controller");
const file_type_enum_1 = require("../enums/file-type.enum");
const tokenTypeList_enum_1 = require("../enums/tokenTypeList.enum");
const auth_check_1 = require("../middlewares/auth.check");
const file_check_1 = require("../middlewares/file.check");
const id_check_1 = require("../middlewares/id.check");
const user_check_1 = require("../middlewares/user.check");
const validate_1 = require("../middlewares/validate");
const pagination_validator_1 = require("../validators/pagination.validator");
const user_validator_1 = require("../validators/user.validator");
const userDeleteByParams_validator_1 = require("../validators/userDeleteByParams.validator");
const router = (0, express_1.Router)();
router.get("/", (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000,
    limit: 100,
}), auth_check_1.auth.tokenCheck(tokenTypeList_enum_1.TokenEnumList.access), user_check_1.userCheck.role(), (0, validate_1.validateQuery)(pagination_validator_1.validPagination.searchQueryUser), user_controller_1.userController.findAll);
router.get("/me", auth_check_1.auth.tokenCheck(tokenTypeList_enum_1.TokenEnumList.access), user_controller_1.userController.findMe);
router.get("/:id", auth_check_1.auth.tokenCheck(tokenTypeList_enum_1.TokenEnumList.access), (0, id_check_1.idCheck)(), user_check_1.userCheck.role(), user_controller_1.userController.findOne);
router.patch("/:id", auth_check_1.auth.tokenCheck(tokenTypeList_enum_1.TokenEnumList.access), (0, id_check_1.idCheck)(), user_check_1.userCheck.role(), (0, validate_1.validateBody)(user_validator_1.validUser.userUpdate), (0, file_check_1.fileCheck)(file_type_enum_1.FileTypeEnum.avatar), user_controller_1.userController.updateOne);
router.delete("/:id", auth_check_1.auth.tokenCheck(tokenTypeList_enum_1.TokenEnumList.access), (0, id_check_1.idCheck)(), user_check_1.userCheck.role(), user_controller_1.userController.deleteOne);
router.delete("/keys/:id", auth_check_1.auth.tokenCheck(tokenTypeList_enum_1.TokenEnumList.access), (0, id_check_1.idCheck)(), user_check_1.userCheck.role(), (0, validate_1.validateQuery)(userDeleteByParams_validator_1.validUserDelete.keysDelete), user_controller_1.userController.deleteKeysByParams);
exports.userRouter = router;
