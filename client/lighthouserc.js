module.exports = {
    ci: {
        collect: {
            staticDistDir: './client/build/',
        },
        upload: {
            target: 'temporary-public-storage',
        },
    },
};