module.exports = {
    ci: {
        collect: {
            url: ['http://localhost:5001/'],
            startServerCommand: 'npm start',
        },
        collect: {
            staticDistDir: './client/build/',
        },
        upload: {
            target: 'temporary-public-storage',
        },
    },
};