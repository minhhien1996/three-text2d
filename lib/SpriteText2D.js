"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = require("three");
var Text2D_1 = require("./Text2D");
var SpriteText2D = /** @class */ (function (_super) {
    __extends(SpriteText2D, _super);
    function SpriteText2D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpriteText2D.prototype.raycast = function () {
        return this.sprite.raycast.apply(this.sprite, arguments);
    };
    SpriteText2D.prototype.updateText = function () {
        this.canvas.drawText(this._text, {
            font: this._font,
            fillStyle: this._fillStyle,
            shadowBlur: this._shadowBlur,
            shadowColor: this._shadowColor,
            shadowOffsetX: this._shadowOffsetX,
            shadowOffsetY: this._shadowOffsetY,
            lineHeight: this._lineHeight,
            align: this.align,
            backgroundColor: this._backgroundColor,
            horizontalPadding: this._horizontalPadding,
            verticalPadding: this._verticalPadding,
            ceilPowerOfTwo: this._ceilPowerOfTwo
        });
        // cleanup previous texture
        this.cleanUp();
        this.texture = new THREE.Texture(this.canvas.canvas);
        // texture size is not required to be power of two if minFilter is THREE.LinearFilter
        if (!this._ceilPowerOfTwo) {
            this.texture.minFilter = THREE.LinearFilter;
        }
        this.texture.needsUpdate = true;
        this.applyAntiAlias();
        if (!this.material) {
            this.material = new THREE.SpriteMaterial({ map: this.texture });
        }
        else {
            this.material.map = this.texture;
        }
        if (!this.sprite) {
            this.sprite = new THREE.Sprite(this.material);
            this.add(this.sprite);
        }
        this.sprite.scale.set(this.canvas.width, this.canvas.height, 1);
        this.updateAlign();
    };
    SpriteText2D.prototype.updateAlign = function () {
        if (this.sprite) {
            this.sprite.center.x = (0.5 - this._align.x * 0.5) * this.canvas.textWidth / this.canvas.width;
            this.sprite.center.y = 1 - (this._align.y * 0.5 + 0.5) * this.canvas.textHeight / this.canvas.height;
        }
    };
    Object.defineProperty(SpriteText2D.prototype, "align", {
        get: function () {
            return this._align;
        },
        set: function (value) {
            this._align.copy(value);
            this.updateAlign();
        },
        enumerable: true,
        configurable: true
    });
    return SpriteText2D;
}(Text2D_1.Text2D));
exports.SpriteText2D = SpriteText2D;
