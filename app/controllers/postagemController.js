module.exports = function(app) {
    // Caminho para nosso modelo em mongoose
    var Post = app.models.postagem;
    // Criando o nosso array de objetos que ter? as a??es da controller
    var controller = {};

    // A??o para postar
    // req = requisition => Aqui pegamos tudo que for enviado pela requisi??o
    // res = response => Aqui ? a resposta do nosso servidor, tudo que enviaremos ficar? aqui
    controller.postar = function(req, res) {
        
        // req.body pois estamos lidando com uma requisi??o POST que envia par?metros no corpo
        // da requisi??o
        var idPost = req.body._id;
        var titulo = req.body.titulo;
        var texto = req.body.texto;
        var autor = req.body.autor;
        
        // Criando o Objeto que usar? os m?todos do mongoose
        var newPost = new Post({
            titulo: titulo,
            texto: texto,
            autor: autor
        });

        postagemExistente = idPost != undefined;
        if(postagemExistente) {
            newPost._id = idPost;
            newPost.isNew = false;
        }

        // Salvando/Atualizando no banco de dados
        newPost.save(function(err) {
            if(err) {
                console.log(err);
                res.status(500).json({"msg":"Erro ao postar"});

            } else {

                res.status(200).json({"msg": "Sucesso"});
            }
        })
    }

    controller.getPosts = function(req, res) {
        // M?todo que traz todos os objetos dentro do banco de dados
        Post.find(function(err, data) {
            if(err)
                json.status(500).json(err);
            res.status(200).json(data);
        })
    }

    controller.deletaPost = function(req, res) {

        var idPost = req.body._id;

        Post.remove({"_id": idPost}, function(err) {
            if(err) {
                res.status(500).json({"msg":"Erro ao deletar"});
            } else {
                res.status(200).json({"msg":"Deletado com sucesso"});
            }
        })
    }

    return controller;

}