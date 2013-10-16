var config = {},
    remoteHost = "localhost";

config.redis = {
    host: "localhost",
    port: "6379"
};

config.woodChopper = {
    period: 500,
    type: "Madera",
    url: "http://" + remoteHost + ":3003"
}

config.steelProducer = {
    url: "http://" + remoteHost + "",
    portHttp: "3005",
    portSocketIO: "3004",
    type: "Metal",
    period: 1000
}

config.cementServer = {
    host: "" + remoteHost + "",
    type: "Cemento"
}

config.centralServer = {
    url: "http://" + remoteHost + ":3001"
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
