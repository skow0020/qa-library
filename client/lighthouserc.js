module.exports = {
    ci: {
        collect: {
            url: ['http://localhost:5001/'],
            startServerCommand: 'npm start'
        },
        upload: {
            target: 'temporary-public-storage'
        }
    }
};