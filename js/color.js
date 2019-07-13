const _colors = {
    "aliceblue": "#f0f8ff",
    "antiquewhite": "#faebd7",
    "aqua": "#00ffff",
    "aquamarine": "#7fffd4",
    "azure": "#f0ffff",
    "beige": "#f5f5dc",
    "bisque": "#ffe4c4",
    "black": "#000000",
    "blanchedalmond": "#ffebcd",
    "blue": "#0000ff",
    "blueviolet": "#8a2be2",
    "brown": "#a52a2a",
    "burlywood": "#deb887",
    "cadetblue": "#5f9ea0",
    "chartreuse": "#7fff00",
    "chocolate": "#d2691e",
    "coral": "#ff7f50",
    "cornflowerblue": "#6495ed",
    "cornsilk": "#fff8dc",
    "crimson": "#dc143c",
    "cyan": "#00ffff",
    "darkblue": "#00008b",
    "darkcyan": "#008b8b",
    "darkgoldenrod": "#b8860b",
    "darkgray": "#a9a9a9",
    "darkgreen": "#006400",
    "darkgrey": "#a9a9a9",
    "darkkhaki": "#bdb76b",
    "darkmagenta": "#8b008b",
    "darkolivegreen": "#556b2f",
    "darkorange": "#ff8c00",
    "darkorchid": "#9932cc",
    "darkred": "#8b0000",
    "darksalmon": "#e9967a",
    "darkseagreen": "#8fbc8f",
    "darkslateblue": "#483d8b",
    "darkslategray": "#2f4f4f",
    "darkslategrey": "#2f4f4f",
    "darkturquoise": "#00ced1",
    "darkviolet": "#9400d3",
    "deeppink": "#ff1493",
    "deepskyblue": "#00bfff",
    "dimgray": "#696969",
    "dimgrey": "#696969",
    "dodgerblue": "#1e90ff",
    "firebrick": "#b22222",
    "floralwhite": "#fffaf0",
    "forestgreen": "#228b22",
    "fuchsia": "#ff00ff",
    "gainsboro": "#dcdcdc",
    "ghostwhite": "#f8f8ff",
    "gold": "#ffd700",
    "goldenrod": "#daa520",
    "gray": "#808080",
    "green": "#008000",
    "greenyellow": "#adff2f",
    "grey": "#808080",
    "honeydew": "#f0fff0",
    "hotpink": "#ff69b4",
    "indianred": "#cd5c5c",
    "indigo": "#4b0082",
    "ivory": "#fffff0",
    "khaki": "#f0e68c",
    "lavender": "#e6e6fa",
    "lavenderblush": "#fff0f5",
    "lawngreen": "#7cfc00",
    "lemonchiffon": "#fffacd",
    "lightblue": "#add8e6",
    "lightcoral": "#f08080",
    "lightcyan": "#e0ffff",
    "lightgoldenrodyellow": "#fafad2",
    "lightgray": "#d3d3d3",
    "lightgreen": "#90ee90",
    "lightgrey": "#d3d3d3",
    "lightpink": "#ffb6c1",
    "lightsalmon": "#ffa07a",
    "lightseagreen": "#20b2aa",
    "lightskyblue": "#87cefa",
    "lightslategray": "#778899",
    "lightslategrey": "#778899",
    "lightsteelblue": "#b0c4de",
    "lightyellow": "#ffffe0",
    "lime": "#00ff00",
    "limegreen": "#32cd32",
    "linen": "#faf0e6",
    "magenta": "#ff00ff",
    "maroon": "#800000",
    "mediumaquamarine": "#66cdaa",
    "mediumblue": "#0000cd",
    "mediumorchid": "#ba55d3",
    "mediumpurple": "#9370db",
    "mediumseagreen": "#3cb371",
    "mediumslateblue": "#7b68ee",
    "mediumspringgreen": "#00fa9a",
    "mediumturquoise": "#48d1cc",
    "mediumvioletred": "#c71585",
    "midnightblue": "#191970",
    "mintcream": "#f5fffa",
    "mistyrose": "#ffe4e1",
    "moccasin": "#ffe4b5",
    "navajowhite": "#ffdead",
    "navy": "#000080",
    "oldlace": "#fdf5e6",
    "olive": "#808000",
    "olivedrab": "#6b8e23",
    "orange": "#ffa500",
    "orangered": "#ff4500",
    "orchid": "#da70d6",
    "palegoldenrod": "#eee8aa",
    "palegreen": "#98fb98",
    "paleturquoise": "#afeeee",
    "palevioletred": "#db7093",
    "papayawhip": "#ffefd5",
    "peachpuff": "#ffdab9",
    "peru": "#cd853f",
    "pink": "#ffc0cb",
    "plum": "#dda0dd",
    "powderblue": "#b0e0e6",
    "purple": "#800080",
    "rebeccapurple": "#663399",
    "red": "#ff0000",
    "rosybrown": "#bc8f8f",
    "royalblue": "#4169e1",
    "saddlebrown": "#8b4513",
    "salmon": "#fa8072",
    "sandybrown": "#f4a460",
    "seagreen": "#2e8b57",
    "seashell": "#fff5ee",
    "sienna": "#a0522d",
    "silver": "#c0c0c0",
    "skyblue": "#87ceeb",
    "slateblue": "#6a5acd",
    "slategray": "#708090",
    "slategrey": "#708090",
    "snow": "#fffafa",
    "springgreen": "#00ff7f",
    "steelblue": "#4682b4",
    "tan": "#d2b48c",
    "teal": "#008080",
    "thistle": "#d8bfd8",
    "tomato": "#ff6347",
    "turquoise": "#40e0d0",
    "violet": "#ee82ee",
    "wheat": "#f5deb3",
    "white": "#ffffff",
    "whitesmoke": "#f5f5f5",
    "yellow": "#ffff00",
    "yellowgreen": "#9acd32"
}

class Color {
    constructor(name, g, b, a = 1) {
        //css name or hex value 
        if (typeof name === "string") {
            if (name[0] === "#") {
                if (name.length === 4)
                    name = "#" + name.split("#")[1].split("").map(value => value.repeat(2)).join("");
                if (name.length === 7)
                    this._makeFromHex(name.afterShift());
                else
                    throw ("Bad hex value");
            }
            else if (_colors[name] !== undefined)
                this._makeFromHex(_colors[name].afterShift());
            else
                throw ("Bad string");
        }
        //hex value or rgb/rgba value
        else if (typeof name === "number") {
            if (g === undefined || b === undefined) {
                if (name.toString(16).length < 7)
                    this._makeFromHex(name.toString(16).padStart(6, "0"));
                else
                    throw ("Bad hex number");
            }
            else if (g !== undefined && b !== undefined) {
                if (a !== undefined)
                    this.a = a;
                this._makeFromRgb(name, g, b);
            }
            else
                throw ("Bad parameters");
        }
        else
            throw ("Bad parameter type");
    }

    _makeFromRgb(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;

        this._make();

        return this;
    }

    _makeFromHex(hexString) {
        this.r = parseInt(hexString[0] + hexString[1], 16);
        this.g = parseInt(hexString[2] + hexString[3], 16);
        this.b = parseInt(hexString[4] + hexString[5], 16);

        this._make();

        return this;
    }

    _makeFromCmyk(c, m, y, k) {
        this.r = 255 * (1 - c) * (1 - k);
        this.g = 255 * (1 - m) * (1 - k);
        this.b = 255 * (1 - y) * (1 - k);
        
        this._make();

        return this;
    }

    _makeFromHsl(h, s, l) {
        let c = (1 - Math.abs(2 * l - 1)) * s;
        let x = c * (1 - Math.abs((h / 60) % 2 - 1));
        let m = l - c / 2;
        let _r, _g, _b;
        if(h >= 360)
            h %= 360;
        if(h < 60){
            _r = c;
            _g = x;
            _b = 0;
        }
        else if(h < 120) {
            _r = x;
            _g = c;
            _b = 0;
        }
        else if(h < 180) {
            _r = 0;
            _g = c;
            _b = x;
        }
        else if(h < 240) {
            _r = 0;
            _g = x;
            _b = c;
        }
        else if(h < 300) {
            _r = x;
            _g = 0;
            _b = c;
        }
        else if(h < 360) {
            _r = c;
            _g = 0;
            _b = x;
        }

        this.r = parseInt((_r + m) * 255);
        this.g = parseInt((_g + m) * 255);
        this.b = parseInt((_b + m) * 255);

        this._make();
        return this;
    }

    _make() {
        this.rgb = this._makeRgb(this.r, this.g, this.b);
        this.rgba = this._makeRgba(this.r, this.g, this.b, this.a);        
        this.hex = this._makeHex(this.r, this.g, this.b);
        this.cmyk = this._makeCmyk(this.r, this.g, this.b);
        this.hsl = this._makeHsl(this.r, this.g, this.b);        
        this.num = parseInt("0x" +  this.r.toString(16).padStart(2, 0) + 
                                    this.g.toString(16).padStart(2, 0) + 
                                    this.b.toString(16).padStart(2, 0));
    }

    _makeRgb(r, g, b) {
        return `rgb(${r}, ${g}, ${b})`;
    }

    _makeRgba(r, g, b, a) {
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    _makeHex(r, g, b) {
        let _r = r.toString(16).padStart(2, 0);
        let _g = g.toString(16).padStart(2, 0);
        let _b = b.toString(16).padStart(2, 0);

        return `#${_r}${_g}${_b}`;
    }

    _makeCmyk(r, g, b) {
        let _r = r / 255;
        let _g = g / 255;
        let _b = b / 255;

        let k = 1 - Math.max(_r, _g, _b);
        let c = (1 - _r - k) / (1 - k);
        let m = (1 - _g - k) / (1 - k);
        let y = (1 - _b - k) / (1 - k);

        c = Math.round(c * 100) + "%";
        m = Math.round(m * 100) + "%";
        y = Math.round(y * 100) + "%";
        k = Math.round(k * 100) + "%";

        return `cmyk(${c}, ${m}, ${y}, ${k})`;
    }

    _makeHsl(r, g, b) {
        let _r = r / 255;
        let _g = g / 255;
        let _b = b / 255;
        let cmax = Math.max(_r, _g, _b);
        let cmin = Math.min(_r, _g, _b);
        let delta = cmax - cmin;
        let h;
        let s;
        let l = (cmax + cmin) / 2;

        if (delta > 0) {
            if (cmax === _r)
                h = 60 * (((_g - _b) / delta) % 60);
            else if (cmax === _g)
                h = 60 * (((_b - _r) / delta) + 2);
            else if (cmax === _b)
                h = 60 * (((_r - _g) / delta) + 4);
        }
        else if (delta === 0)
            h = 0;
        if(h < 0) {
            h += 360; 
        }

        s = delta / (1 - Math.abs(2 * l - 1));
        h = Math.round(h);
        s = Math.round(s * 100) + "%";
        l = Math.round(l * 100) + "%";

        this.h = h;
        this.s = s;
        this.l = l;

        return `hsl(${h}, ${s}, ${l})`;
    }

    rainbowify(offset) {
        let hsl = this.hsl;
        let raw = hsl.match(/\(([^)]+)\)/)[1].split(",");
        let h = parseInt(raw[0]) + offset;
        let s = parseInt(raw[1]) / 100;
        let l = parseInt(raw[2]) / 100;
        let color = new Color(0x0);
        color._makeFromHsl(h, s, l);
        return color;
    }

    blur(offset) {
        let rgba = this.rgba;
        let raw = rgba.match(/\(([^)]+)\)/)[1].split(",");
        let r = parseInt(raw[0]);
        let g = parseInt(raw[1]);
        let b = parseInt(raw[2]);
        let a = 1 - offset / 100;
        let color = new Color(r, g, b, a);
        return color;
    }
}

function rgb(r, g, b) {
    return new Color(r, g, b);
}

function rgba(r, g, b, a) {
    return new Color(r, g, b);
}

function hsl(h, s, l) {
    return new Color(0x0)._makeFromHsl(h, s, l);
}

String.prototype.afterShift = function () {
    let tmp = this.split("")
    tmp.shift();
    return tmp.join("");
}

String.prototype.afterPop = function () {
    let tmp = this.split("")
    tmp.pop();
    return tmp.join("");
}

Number.prototype.isBetween = function(left, right) {
    return this > left && this < right
}