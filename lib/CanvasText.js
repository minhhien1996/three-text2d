"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = require("three");
var utils_1 = require("./utils");
var CanvasText = /** @class */ (function () {
    function CanvasText() {
        this.textWidth = null;
        this.textHeight = null;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
    }
    Object.defineProperty(CanvasText.prototype, "width", {
        get: function () { return this.canvas.width; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasText.prototype, "height", {
        get: function () { return this.canvas.height; },
        enumerable: true,
        configurable: true
    });
    CanvasText.prototype.drawText = function (text, ctxOptions) {
        var _this = this;
        this.ctx.font = ctxOptions.font;
        var lineHeight = utils_1.getFontHeight(ctxOptions.font);
        var lines = (text || "").toString().split("\n");
        this.textWidth = Math.max.apply(null, lines.map(function (line) { return Math.ceil(_this.ctx.measureText(line).width); }));
        this.textHeight = lineHeight + lineHeight * ctxOptions.lineHeight * (lines.length - 1);
        // 2 = prevent canvas being 0 size when using empty / null text
        if (ctxOptions.ceilPowerOfTwo) {
            this.canvas.width = Math.max(2, THREE.Math.ceilPowerOfTwo(this.textWidth + (2 * ctxOptions.horizontalPadding)));
            this.canvas.height = Math.max(2, THREE.Math.ceilPowerOfTwo(this.textHeight + (2 * ctxOptions.verticalPadding)));
        }
        else {
            this.canvas.width = Math.max(2, this.textWidth + (2 * ctxOptions.horizontalPadding));
            this.canvas.height = Math.max(2, this.textHeight + (2 * ctxOptions.verticalPadding));
        }
        this.ctx.font = ctxOptions.font;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (ctxOptions.backgroundColor) {
            this.ctx.fillStyle = ctxOptions.backgroundColor;
            this.ctx.fillRect(0, 0, this.textWidth + (2 * ctxOptions.horizontalPadding), this.textHeight + (2 * ctxOptions.verticalPadding));
        }
        this.ctx.fillStyle = ctxOptions.fillStyle;
        if (ctxOptions.align.x === 1)
            this.ctx.textAlign = 'left';
        else if (ctxOptions.align.x === 0)
            this.ctx.textAlign = 'center';
        else
            this.ctx.textAlign = 'right';
        this.ctx.textBaseline = 'top';
        this.ctx.shadowColor = ctxOptions.shadowColor;
        this.ctx.shadowBlur = ctxOptions.shadowBlur;
        this.ctx.shadowOffsetX = ctxOptions.shadowOffsetX;
        this.ctx.shadowOffsetY = ctxOptions.shadowOffsetY;
        var x = this.textWidth * (0.5 - ctxOptions.align.x * 0.5);
        var y = 0.5 * ((lineHeight * ctxOptions.lineHeight) - lineHeight);
        for (var i = 0; i < lines.length; i++) {
            this.ctx.fillText(lines[i], x + ctxOptions.horizontalPadding, (lineHeight * ctxOptions.lineHeight * i) + ctxOptions.verticalPadding + y);
        }
        return this.canvas;
    };
    return CanvasText;
}());
exports.CanvasText = CanvasText;
