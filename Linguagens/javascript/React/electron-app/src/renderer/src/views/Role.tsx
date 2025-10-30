export function role(){
  return (
    <>
    <link rel="stylesheet" href="../assets/css/role.css" />
      <main>
        <form className="form" id="form_cargo">
          <h2 className="form-title">Cargos</h2>
          <div>
            <label htmlFor="id">
              Cod:
              <input className="id" id="id" />
            </label>
            <label htmlFor="Cargo">
              Cargo:
              <input className="Cargo" id="cargo" />
            </label>
            <label htmlFor="descricao">
              Descrição:
              <input className="descricao" id="descricao" />
            </label>
          </div>
          <button type="submit">Cadastrar</button>
        </form>
      </main>
    </>
  )
}
