export function login(){
  return (
    <>
      <>
        <link rel="stylesheet" href="../assets/css/login.css" />
        <link rel="shortcut icon" href="../assets/img/logo.png" type="image/x-icon" />
        <div className="container">
          <div className="coluna-info">
            <div className="box-titulo">
              <h1 className="titulo-login">RH-OS</h1>
              <p className="subtitulo-login">Recursos Humanos - Operating System</p>
            </div>
            <div className="logo-login">
              <img src="../assets/img/logo.png" alt="Logo" width={150} height={150} />
            </div>
            <div className="slogan">
              <p>
                Making life easy. <br />
                Caring lives easier. <br />
              </p>
            </div>
          </div>
          <div className="formulario">
            <p className="texto-login">
              <strong>Faça seu login</strong>
            </p>
            <form>
              <div className="input-box">
                <input id="usuario" placeholder="Usuario" type="text" />
                <i className="bx bxs-user" />
              </div>
              <div className="input-box">
                <input id="senha" placeholder="senha" type="password" />
                <i className="bx bxs-lock-alt" />
              </div>
              <button id="btn-login" type="submit" className="login">
                Login
              </button>
            </form>
            <p id="mensagem-erro" className="mensagem-erro" />
          </div>
        </div>
      </>
    </>
  )
}

