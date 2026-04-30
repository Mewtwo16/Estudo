from repository.usuario_repository import UsuarioRepository
from service.usuario_service import UsuarioService
from controller.usuario_controller import UsuarioController
from view.usuario_view_web import UsuarioViewWeb


def main():
    repository = UsuarioRepository()
    service = UsuarioService(repository)
    controller = UsuarioController(service)
    view_web = UsuarioViewWeb(controller)

    view_web.run()


if __name__ == "__main__":
    main()