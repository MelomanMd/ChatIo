const init = () => {
	return {
        db: {
            username: 'main',
            password: 'main',
            host: 'cluster0.q6tys.mongodb.net',
            name: 'myFirstDatabase'
        },
        sessionSecret: 'e1b7d95adf22394595212b3f81235a86c5430d0a',
        redis: {
            host: '127.0.0.1',
            port: 6379,
            password: ''
        }
    }
}

module.exports = init();