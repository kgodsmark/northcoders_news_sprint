module.exports = {
    getAllArticles: require('./articles').getAllArticles,
    getArticlebyID: require('./articles').getArticlebyID,
    getAllCommentsByArticle:  require('./comments').getAllCommentsByArticle,
    addCommentToArticle: require('./comments').addCommentToArticle,
    changeArticleVotes: require('./articles').changeArticleVotes,
    changeCommentVotes:require('./comments').changeCommentVotes,
    deleteComment: require('./comments').deleteComment,
    getUserProfile: require('./users').getUserProfile,
    getUserPublicRepos: require('./articles').getUserPublicRepos,
    getAllTopics:  require('./topics').getAllTopics,
    getAllArticlesByTopic:  require('./articles').getAllArticlesByTopic
};
