var config = {};

config.redis = {
    host: "localhost",
    port: "6379"
};

config.woodChopper = {
    period: 5000,
    type: "Madera",
    url: "http://localhost:3003"
}

config.steelProducer = {
    url: "http://localhost",
    portHttp: "3005",
    portSocketIO: "3004",
    type: "Metal"
}

config.centralServer = {
    url: "http://localhost:3001"
}

config.local = {
    login: "dmj"
}

module.exports = config;