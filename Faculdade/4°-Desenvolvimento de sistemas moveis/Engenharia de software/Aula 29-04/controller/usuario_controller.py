from service.usuario_service import UsuarioService

class UsuarioController:
    def __init__(self, service):
        self.service = service

    def request_consulta(self, usuario_id):
        try:
            usuario = self.service.consultar_usuario(usuario_id)
            return usuario
        except ValueError as erro:
            return {"erro": str(erro)}