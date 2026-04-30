from flask import Flask, jsonify, request


class UsuarioViewWeb:
    def __init__(self, controller):
        self.app = Flask(__name__)
        self.controller = controller
        self._configurar_rotas()

    def _configurar_rotas(self):
        @self.app.route("/usuarios/<int:usuario_id>", methods=["GET"])
        def consultar_usuario(usuario_id):
            resposta = self.controller.request_consulta(usuario_id)
            return jsonify(resposta)

    def run(self):
        self.app.run(debug=True)