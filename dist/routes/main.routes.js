"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const main_controllers_1 = require("../controllers/main.controllers");
const router = (0, express_1.Router)();
router.get('/', main_controllers_1.index);
exports.default = router;
