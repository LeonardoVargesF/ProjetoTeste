using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjetoTeste.Application.Features.Cliente.Command.CreateCliente;
using ProjetoTeste.Application.Features.Cliente.Command.DeleteCliente;
using ProjetoTeste.Application.Features.Cliente.Command.UpdateCliente;
using ProjetoTeste.Application.Features.Cliente.Query.GetAllCliente;
using ProjetoTeste.Application.Features.Cliente.Query.GetAllClienteDetails;

namespace ProjetoTeste.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ClientesController(IMediator mediator)
        {
            this._mediator = mediator;
        }
        [HttpGet]
        public async Task<List<ClienteDto>> Get()
        {
            var produtos = await _mediator.Send(new GetClienteQuery());
            return produtos;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ClienteDetailsDto>> Get(int id)
        {
            var produto = await _mediator.Send(new GetClienteDetailsQuery(id));
            return Ok(produto);
        }
        [Authorize]
        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult> Post(CreateClienteCommand cliente)
        {
            var response = await _mediator.Send(cliente);
            return CreatedAtAction(nameof(Get), new { id = response });

        }
        [Authorize]
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult> Put(UpdateClienteCommand cliente)
        {
            await _mediator.Send(cliente);
            return NoContent();
        }
        [Authorize]
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult> Delete(int id)
        {
            var command = new DeleteClienteCommand { Id = id };
            await _mediator.Send(command);
            return NoContent();
        }
    }
}
