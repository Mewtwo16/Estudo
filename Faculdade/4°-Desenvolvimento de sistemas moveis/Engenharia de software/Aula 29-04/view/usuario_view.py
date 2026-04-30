class UsuarioView:
    def __init__(self, controller):
        self.controller = controller

    def solicita_consulta(self):
        usuario_id = int(input("Digite o ID do usuário: "))
        resposta = self.controller.request_consulta(usuario_id)
        self.exibe_dados(resposta)

    def exibe_dados(self, resposta):
        if "erro" in resposta:
            print("Erro:", resposta["erro"])
        else:
            print("ID:", resposta["id"])
            print("Nome:", resposta["nome"])
            print("Email:", resposta["email"])