using _01_api.Context;
using _01_api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace _01_api.Controller;

[ApiController]
[Route("[Controller]")]
    public class ProdutosController : ControllerBase {

    private readonly AppDbContext _context;

    public ProdutosController(AppDbContext context) {
        _context = context;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Produto>> Get() {
        var produtos = _context.Produtos.ToList();
        if (produtos is null) return NotFound("Produtos não encontrados...");
        return produtos;
    }

    // Define que o metodo get precisa conter um id do tipo inteiro e o minimo inicial é 1
    [HttpGet("{id:int:min(1)}", Name="ObterProduto")] 
    public ActionResult<Produto> Get(int id) {
        var produto = _context.Produtos.FirstOrDefault(p => p.ProdutoId == id);
        if (produto is null)
            return NotFound("Produto não encontrado...");
        return produto;
    }
    [HttpPost]
    public ActionResult Post(Produto produto) {

        if (produto is null)
            return BadRequest();

        _context.Produtos.Add(produto); // Adiciona os dados a produtos
        _context.SaveChanges(); // Persiste os dados na tabela

        return new CreatedAtRouteResult("ObterProduto", new { id = produto.ProdutoId }, produto);
    }

    [HttpPut("{id:int}")] // Atualiza um produto
    public ActionResult Put(int id, Produto produto) { // Tem a desvantagem de precisar enviar todos os dados do produto

        if(id != produto.ProdutoId) {
            return BadRequest();
        }
        _context.Entry(produto).State = EntityState.Modified;
        _context.SaveChanges();

        return Ok(produto);
    }

    [HttpDelete("{id:int}")]
    public ActionResult Delete(int id) {
        var produto = _context.Produtos.FirstOrDefault(p => p.ProdutoId == id);
        if (produto is null)
            return NotFound("Produto não localizado...");
        _context.Produtos.Remove(produto);
        _context.SaveChanges();

        return Ok(produto);
    }
}

