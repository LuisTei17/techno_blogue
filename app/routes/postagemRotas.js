module.exports = function(app) {
    // Procurando a nossa controller a partir do diret?rio ra?z
    var postagem = app.controllers.postagemController;
    
    // Colocando as rotas que utilizaremos e os verbos HTTP
    // :id significa que o Id ? um par?metro, pegamos ele atrav?s de req.params.id
    app.route("/v1/postar").post(postagem.postar).delete(postagem.deletaPost);

    app.route("/v1/posts").get(postagem.getPosts);
}