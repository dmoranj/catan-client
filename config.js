var config = {};

config.redis = {
    host: "localhost",
    port: "6379"
};

config.woodChopper = {
    period: 8000,
    type: "Piedra",
    url: "http://localhost:3004"
}

config.steelProducer = {
    url: "http://localhost",
    portHttp: "3005",
    portSocketIO: "3004",
    type: "steel"
}

config.centralServer = {
    url: "http://localhost:3001"
}

config.local = {
    login: "dmj"
}

module.exports = config;