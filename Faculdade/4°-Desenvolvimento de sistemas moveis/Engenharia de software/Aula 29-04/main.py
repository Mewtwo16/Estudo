from repository.usuario_repository import UsuarioRepository
from service.usuario_service import UsuarioService
from controller.usuario_controller import UsuarioController
from view.usuario_view import UsuarioView

def main():
    repository = UsuarioRepository()
    service = UsuarioService(repository)
    controller = UsuarioController(service)
    view = UsuarioView(controller)

    view.solicita_consulta()


if __name__ == "__main__":
    main()
