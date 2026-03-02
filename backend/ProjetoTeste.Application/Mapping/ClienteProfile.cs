using AutoMapper;
using ProjetoTeste.Application.Features.Cliente.Command.CreateCliente;
using ProjetoTeste.Application.Features.Cliente.Command.UpdateCliente;
using ProjetoTeste.Application.Features.Cliente.Query.GetAllCliente;
using ProjetoTeste.Application.Features.Cliente.Query.GetAllClienteDetails;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Teste.Domain;

namespace ProjetoTeste.Application.Mapping
{
    public class ClienteProfile : Profile
    {
        public ClienteProfile()
        {
            CreateMap<Cliente, ClienteDto>().ReverseMap();
            CreateMap<Cliente, ClienteDetailsDto>();
            CreateMap<CreateClienteCommand, Cliente>();
            CreateMap<UpdateClienteCommand, Cliente>();
        }
    }
}
