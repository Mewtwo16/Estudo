class UsuarioRepository:
    def __init__(self):
        # simulando banco de dados
        self._usuarios = {
            1: {"id": 1, "nome": "Ana", "email": "ana@email.com"},
            2: {"id": 2, "nome": "Bruno", "email": "bruno@email.com"},
        }

    def buscar_por_id(self, usuario_id):
        return self._usuarios.get(usuario_id)