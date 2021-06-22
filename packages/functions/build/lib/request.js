"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestPost = void 0;
const node_fetch_1 = require("node-fetch");
exports.requestPost = async (url, params) => {
    const result = await node_fetch_1.default({
        url,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    });
};
//# sourceMappingURL=request.js.map