using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjetoTeste.Application.Features.Produto.Commands.CreateProduto;
using ProjetoTeste.Application.Features.Produto.Commands.DeleteProduto;
using ProjetoTeste.Application.Features.Produto.Commands.UpdateProduto;
using ProjetoTeste.Application.Features.Produto.Queries.GetAllProduto;
using ProjetoTeste.Application.Features.Produto.Queries.GetProdutoDetails;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProjetoTeste.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutosController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ProdutosController(IMediator mediator)
        {
            this._mediator = mediator;
        }

        [HttpGet]
        public async Task<List<ProdutoDto>> Get()
        {
            var produtos = await _mediator.Send(new GetProdutoQuery());
            return produtos;    
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<ProdutoDetailsDto>> Get(int id)
        {
            var produto = await _mediator.Send(new GetProdutoDetailsQuery(id));
            return Ok(produto);
        }

        [Authorize]
        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult> Post(CreateProdutoCommand produto)
        {
            var response = await _mediator.Send(produto);
            return CreatedAtAction(nameof(Get), new { id = response });

        }

        [Authorize]
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult> Put(UpdateProdutoCommand produto)
        {
            await _mediator.Send(produto);
            return NoContent();
        }

        [Authorize]
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult> Delete(int id)
        {
            var command = new DeleteProdutoCommand { Id = id };
            await _mediator.Send(command);
            return NoContent();
        }
    }
}
