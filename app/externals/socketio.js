const SocketIO = () => {

/*! Socket.IO.js build:0.9.0, development. Copyright(c) 2011 LearnBoost <dev@learnboost.com> MIT Licensed */
(function(n, t) {
    var i = n;
    i.version = "0.9.0", i.protocol = 1, i.transports = [], i.j = [], i.sockets = {}, i.connect = function(n, r) {
        var u = i.util.parseUri(n),
            o, f, e;
        return t && t.location && (u.protocol = u.protocol || t.location.protocol.slice(0, -1), u.host = u.host || (t.document ? t.document.domain : t.location.hostname), u.port = u.port || t.location.port), o = i.util.uniqueUri(u), e = {
            host: u.host,
            secure: "https" == u.protocol,
            port: u.port || ("https" == u.protocol ? 443 : 80),
            query: u.query || ""
        }, i.util.merge(e, r), (e["force new connection"] || !i.sockets[o]) && (f = new i.Socket(e)), !e["force new connection"] && f && (i.sockets[o] = f), f = f || i.sockets[o], f.of(u.path.length > 1 ? u.path : "")
    }
})("object" == typeof module ? module.exports : this.io = {}, this), (function(n, t) {
    var i = n.util = {},
        f = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
        u = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
        r;
    i.parseUri = function(n) {
        var r = f.exec(n || ""),
            i = {},
            t = 14;
        while (t--) i[u[t]] = r[t] || "";
        return i
    }, i.uniqueUri = function(n) {
        var u = n.protocol,
            i = n.host,
            r = n.port;
        return "document" in t ? (i = i || document.domain, r = r || (u == "https" && document.location.protocol !== "https:" ? 443 : document.location.port)) : (i = i || "localhost", r || u != "https" || (r = 443)), (u || "http") + "://" + i + ":" + (r || 80)
    }, i.query = function(n, t) {
        var u = i.chunkQuery(n || ""),
            f = [],
            r;
        i.merge(u, i.chunkQuery(t || ""));
        for (r in u) u.hasOwnProperty(r) && f.push(r + "=" + u[r]);
        return f.length ? "?" + f.join("&") : ""
    }, i.chunkQuery = function(n) {
        for (var u = {}, r = n.split("&"), i = 0, f = r.length, t; i < f; ++i) t = r[i].split("="), t[0] && (u[t[0]] = t[1]);
        return u
    }, r = !1, i.load = function(n) {
        if ("document" in t && document.readyState === "complete" || r) return n();
        i.on(t, "load", n, !1)
    }, i.on = function(n, t, i, r) {
        n.attachEvent ? n.attachEvent("on" + t, i) : n.addEventListener && n.addEventListener(t, i, r)
    }, i.request = function(n) {
        if (n && "undefined" != typeof XDomainRequest) return new XDomainRequest;
        if ("undefined" != typeof XMLHttpRequest && (!n || i.ua.hasCORS)) return new XMLHttpRequest;
        if (!n) try {
            return new ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {}
        return null
    }, "undefined" != typeof window && i.load(function() {
        r = !0
    }), i.defer = function(n) {
        if (!i.ua.webkit || "undefined" != typeof importScripts) return n();
        i.load(function() {
            setTimeout(n, 100)
        })
    }, i.merge = function(n, t, r, u) {
        var e = u || [],
            o = typeof r == "undefined" ? 2 : r,
            f;
        for (f in t) t.hasOwnProperty(f) && i.indexOf(e, f) < 0 && (typeof n[f] == "object" && o ? i.merge(n[f], t[f], o - 1, e) : (n[f] = t[f], e.push(t[f])));
        return n
    }, i.mixin = function(n, t) {
        i.merge(n.prototype, t.prototype)
    }, i.inherit = function(n, t) {
        function i() {}
        i.prototype = t.prototype, n.prototype = new i
    }, i.isArray = Array.isArray || function(n) {
        return Object.prototype.toString.call(n) === "[object Array]"
    }, i.intersect = function(n, t) {
        for (var f = [], o = n.length > t.length ? n : t, u = n.length > t.length ? t : n, r = 0, e = u.length; r < e; r++) ~i.indexOf(o, u[r]) && f.push(u[r]);
        return f
    }, i.indexOf = function(n, t, i) {
        for (var r = n.length, i = i < 0 ? i + r < 0 ? 0 : i + r : i || 0; i < r && n[i] !== t; i++);
        return r <= i ? -1 : i
    }, i.toArray = function(n) {
        for (var r = [], t = 0, i = n.length; t < i; t++) r.push(n[t]);
        return r
    }, i.ua = {}, i.ua.hasCORS = "undefined" != typeof XMLHttpRequest && function() {
        try {
            var n = new XMLHttpRequest
        } catch (t) {
            return !1
        }
        return n.withCredentials != undefined
    }(), i.ua.webkit = "undefined" != typeof navigator && /webkit/i.test(navigator.userAgent)
})("undefined" != typeof io ? io : module.exports, this), (function(n, t) {
    function i() {}
    n.EventEmitter = i, i.prototype.on = function(n, i) {
        return this.$events || (this.$events = {}), this.$events[n] ? t.util.isArray(this.$events[n]) ? this.$events[n].push(i) : this.$events[n] = [this.$events[n], i] : this.$events[n] = i, this
    }, i.prototype.addListener = i.prototype.on, i.prototype.once = function(n, t) {
        function i() {
            r.removeListener(n, i), t.apply(this, arguments)
        }
        var r = this;
        i.listener = t;
        this.on(n, i);
        return this
    }, i.prototype.removeListener = function(n, i) {
        var r, f, u, e;
        if (this.$events && this.$events[n]) {
            r = this.$events[n];
            if (t.util.isArray(r)) {
                for (f = -1, u = 0, e = r.length; u < e; u++)
                    if (r[u] === i || r[u].listener && r[u].listener === i) {
                        f = u;
                        break
                    }
                if (f < 0) return this;
                r.splice(f, 1), r.length || delete this.$events[n]
            } else(r === i || r.listener && r.listener === i) && delete this.$events[n]
        }
        return this
    }, i.prototype.removeAllListeners = function(n) {
        return this.$events && this.$events[n] && (this.$events[n] = null), this
    }, i.prototype.listeners = function(n) {
        return this.$events || (this.$events = {}), this.$events[n] || (this.$events[n] = []), t.util.isArray(this.$events[n]) || (this.$events[n] = [this.$events[n]]), this.$events[n]
    }, i.prototype.emit = function(n) {
        var i, f, u, r, e;
        if (!this.$events) return !1;
        i = this.$events[n];
        if (!i) return !1;
        f = Array.prototype.slice.call(arguments, 1);
        if ("function" == typeof i) i.apply(this, f);
        else if (t.util.isArray(i))
            for (u = i.slice(), r = 0, e = u.length; r < e; r++) u[r].apply(this, f);
        else return !1;
        return !0
    }
})("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), (function(n, t) {
    "use strict";

    function u(n) {
        return n < 10 ? "0" + n : n
    }

    function a(n) {
        return isFinite(n.valueOf()) ? n.getUTCFullYear() + "-" + u(n.getUTCMonth() + 1) + "-" + u(n.getUTCDate()) + "T" + u(n.getUTCHours()) + ":" + u(n.getUTCMinutes()) + ":" + u(n.getUTCSeconds()) + "Z" : null
    }

    function s(n) {
        return h.lastIndex = 0, h.test(n) ? '"' + n.replace(h, function(n) {
            var t = l[n];
            return typeof t == "string" ? t : "\\u" + ("0000" + n.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + n + '"'
    }

    function e(n, t) {
        var h, l, c, v, y = i,
            o, u = t[n];
        u instanceof Date && (u = a(n)), typeof r == "function" && (u = r.call(t, n, u));
        switch (typeof u) {
            case "string":
                return s(u);
            case "number":
                return isFinite(u) ? String(u) : "null";
            case "boolean":
            case "null":
                return String(u);
            case "object":
                if (!u) return "null";
                i += f, o = [];
                if (Object.prototype.toString.apply(u) === "[object Array]") {
                    for (v = u.length, h = 0; h < v; h += 1) o[h] = e(h, u) || "null";
                    return c = o.length === 0 ? "[]" : i ? "[\n" + i + o.join(",\n" + i) + "\n" + y + "]" : "[" + o.join(",") + "]", i = y, c
                }
                if (r && typeof r == "object")
                    for (v = r.length, h = 0; h < v; h += 1) typeof r[h] == "string" && (l = r[h], c = e(l, u), c && o.push(s(l) + (i ? ": " : ":") + c));
                else
                    for (l in u) Object.prototype.hasOwnProperty.call(u, l) && (c = e(l, u), c && o.push(s(l) + (i ? ": " : ":") + c));
                return c = o.length === 0 ? "{}" : i ? "{\n" + i + o.join(",\n" + i) + "\n" + y + "}" : "{" + o.join(",") + "}", i = y, c
        }
    }
    var o;
    if (t && t.parse) return n.JSON = {
        parse: t.parse,
        stringify: t.stringify
    };
    o = n.JSON = {};
    var c = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        h = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        i, f, l = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        },
        r;
    o.stringify = function(n, t, u) {
        var o;
        i = "", f = "";
        if (typeof u == "number")
            for (o = 0; o < u; o += 1) f += " ";
        else typeof u == "string" && (f = u);
        r = t;
        if (t && typeof t != "function" && (typeof t != "object" || typeof t.length != "number")) throw new Error("JSON.stringify");
        return e("", {
            "": n
        })
    }, o.parse = function(n, t) {
        function r(n, i) {
            var f, e, u = n[i];
            if (u && typeof u == "object")
                for (f in u) Object.prototype.hasOwnProperty.call(u, f) && (e = r(u, f), e !== undefined ? u[f] = e : delete u[f]);
            return t.call(n, i, u)
        }
        var i;
        n = String(n), c.lastIndex = 0, c.test(n) && (n = n.replace(c, function(n) {
            return "\\u" + ("0000" + n.charCodeAt(0).toString(16)).slice(-4)
        }));
        if (/^[\],:{}\s]*$/.test(n.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return i = eval("(" + n + ")"), typeof t == "function" ? r({
            "": i
        }, "") : i;
        throw new SyntaxError("JSON.parse");
    }
})("undefined" != typeof io ? io : module.exports, typeof JSON != "undefined" ? JSON : undefined), (function(n, t) {
    var i = n.parser = {},
        e = i.packets = ["disconnect", "connect", "heartbeat", "message", "json", "event", "ack", "error", "noop"],
        o = i.reasons = ["transport not supported", "client not handshaken", "unauthorized"],
        s = i.advice = ["reconnect"],
        r = t.JSON,
        u = t.util.indexOf,
        f;
    i.encodePacket = function(n) {
        var l = u(e, n.type),
            y = n.id || "",
            v = n.endpoint || "",
            a = n.ack,
            t = null,
            h, i, f, c;
        switch (n.type) {
            case "error":
                h = n.reason ? u(o, n.reason) : "", i = n.advice ? u(s, n.advice) : "", (h !== "" || i !== "") && (t = h + (i !== "" ? "+" + i : ""));
                break;
            case "message":
                n.data !== "" && (t = n.data);
                break;
            case "event":
                f = {
                    name: n.name
                }, n.args && n.args.length && (f.args = n.args), t = r.stringify(f);
                break;
            case "json":
                t = r.stringify(n.data);
                break;
            case "connect":
                n.qs && (t = n.qs);
                break;
            case "ack":
                t = n.ackId + (n.args && n.args.length ? "+" + r.stringify(n.args) : "")
        }
        return c = [l, y + (a == "data" ? "+" : ""), v], t !== null && t !== undefined && c.push(t), c.join(":")
    }, i.encodePayload = function(n) {
        var u = "",
            t, r, i;
        if (n.length == 1) return n[0];
        for (t = 0, r = n.length; t < r; t++) i = n[t], u += "\ufffd" + i.length + "\ufffd" + n[t];
        return u
    }, f = /([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/, i.decodePacket = function(n) {
        var i = n.match(f),
            u;
        if (!i) return {};
        var h = i[2] || "",
            n = i[5] || "",
            t = {
                type: e[i[1]],
                endpoint: i[4] || ""
            };
        h && (t.id = h, t.ack = i[3] ? "data" : !0);
        switch (t.type) {
            case "error":
                i = n.split("+"), t.reason = o[i[0]] || "", t.advice = s[i[1]] || "";
                break;
            case "message":
                t.data = n || "";
                break;
            case "event":
                try {
                    u = r.parse(n), t.name = u.name, t.args = u.args
                } catch (c) {}
                t.args = t.args || [];
                break;
            case "json":
                try {
                    t.data = r.parse(n)
                } catch (c) {}
                break;
            case "connect":
                t.qs = n || "";
                break;
            case "ack":
                i = n.match(/^([0-9]+)(\+)?(.*)/);
                if (i) {
                    t.ackId = i[1], t.args = [];
                    if (i[3]) try {
                        t.args = i[3] ? r.parse(i[3]) : []
                    } catch (c) {}
                }
        }
        return t
    }, i.decodePayload = function(n) {
        var u, t, r;
        if (n.charAt(0) == "\ufffd") {
            for (u = [], t = 1, r = ""; t < n.length; t++) n.charAt(t) == "\ufffd" ? (u.push(i.decodePacket(n.substr(t + 1).substr(0, r))), t += Number(r) + 1, r = "") : r += n.charAt(t);
            return u
        }
        return [i.decodePacket(n)]
    }
})("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), (function(n, t) {
    function i(n, t) {
        this.socket = n, this.sessid = t
    }
    n.Transport = i, t.util.mixin(i, t.EventEmitter), i.prototype.onData = function(n) {
        var i, r, u;
        this.clearCloseTimeout(), (this.socket.connected || this.socket.connecting || this.socket.reconnecting) && this.setCloseTimeout();
        if (n !== "") {
            i = t.parser.decodePayload(n);
            if (i && i.length)
                for (r = 0, u = i.length; r < u; r++) this.onPacket(i[r])
        }
        return this
    }, i.prototype.onPacket = function(n) {
        if (n.type == "heartbeat") return this.onHeartbeat();
        n.type == "connect" && n.endpoint == "" && this.onConnect();
        this.socket.onPacket(n);
        return this
    }

})
}

export default SocketIO