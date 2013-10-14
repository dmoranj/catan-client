var config = {};

config.redis = {
    host: "localhost",
    port: "6379"
};

config.woodChopper = {
    period: 500,
    type: "Madera",
    url: "http://localhost:3003"
}

config.steelProducer = {
    url: "http://localhost",
    portHttp: "3005",
    portSocketIO: "3004",
    type: "Metal"
}

config.cementServer = {
    host: "localhost",
    type: "Cemento"
}

config.centralServer = {
    url: "http://localhost:3001"
}

config.merchant = {
    port: "4001"
}

config.mongo = {
    host: "localhost",
    db: 'catan-client',
    user: '',
    password: ''
};

config.local = {
    login: "dmj"
}

config.stock = {
    expected: 25
}

module.exports = config;