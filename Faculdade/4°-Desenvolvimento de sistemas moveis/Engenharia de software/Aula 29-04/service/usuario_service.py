class UsuarioService:
    def __init__(self, repository):
        self.repository = repository

    def consultar_usuario(self, usuario_id):
        usuario = self.repository.buscar_por_id(usuario_id)

        if usuario is None:
            raise ValueError("Usuário não encontrado")

        # aqui poderiam existir regras de negócio
        return usuario