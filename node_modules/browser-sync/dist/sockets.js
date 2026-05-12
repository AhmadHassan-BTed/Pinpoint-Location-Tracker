"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.plugin = void 0;
const socket_io_1 = require("socket.io");
const utils = require("./server/utils");
/**
 * Plugin interface
 * @returns {*|function(this:exports)}
 */
function plugin(server, clientEvents, bs) {
    return exports.init(server, clientEvents, bs);
}
exports.plugin = plugin;
/**
 * @param {http.Server} server
 * @param clientEvents
 * @param {BrowserSync} bs
 */
function init(server, clientEvents, bs) {
    var emitter = bs.events;
    var socketConfig = bs.options.get("socket").toJS();
    if (bs.options.get("mode") === "proxy" &&
        bs.options.getIn(["proxy", "ws"])) {
        server = utils.getServer(null, bs.options).server;
        server.listen(bs.options.getIn(["socket", "port"]));
        bs.registerCleanupTask(function () {
            server.close();
        });
    }
    var socketIoConfig = socketConfig.socketIoOptions;
    socketIoConfig.path = socketConfig.path;
    const io = new socket_io_1.Server();
    io.attach(server, Object.assign(Object.assign({}, socketIoConfig), { pingTimeout: socketConfig.clients.heartbeatTimeout, cors: {
            credentials: true,
            "origin": (origin, cb) => {
                return cb(null, origin);
            },
        } }));
    io.of(socketConfig.namespace).on('connection', (socket) => {
        handleConnection(socket);
    });
    /**
     * Handle each new connection
     * @param {Object} client
     */
    function handleConnection(client) {
        // set ghostmode callbacks
        if (bs.options.get("ghostMode")) {
            addGhostMode(client);
        }
        client.emit("connection", bs.options.toJS()); //todo - trim the amount of options sent to clients
        emitter.emit("client:connected", {
            ua: client.handshake.headers["user-agent"]
        });
    }
    /**
     * @param client
     */
    function addGhostMode(client) {
        clientEvents.forEach(addEvent);
        function addEvent(event) {
            client.on(event, data => {
                client.broadcast.emit(event, data);
            });
        }
    }
    // @ts-ignore
    io.sockets = io.of(socketConfig.namespace);
    return io;
}
exports.init = init;
//# sourceMappingURL=sockets.js.map