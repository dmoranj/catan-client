var config = {};

config.redis = {
    host: "localhost",
    port: "6379"
};

config.woodChopper = {
    period: 5000,
    type: "Piedra",
    url: "http://localhost:3003"
}

config.centralServer = {
    url: "http://localhost:3001"
}

config.local = {
    login: "dmj"
}

module.exports = config;