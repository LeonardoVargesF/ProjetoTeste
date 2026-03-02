using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ProjetoTeste.Application.Interfaces.Email;
using ProjetoTeste.Application.Interfaces.Logging;
using ProjetoTeste.Application.Models.Email;
using ProjetoTeste.Infrastructure.EmailService;
using ProjetoTeste.Infrastructure.Logging;

namespace ProjetoTeste.Infrastructure
{
    public static class InsfrastructureServicesRegistration
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection
            services, IConfiguration configuration)
        {
            services.Configure<EmailSettings>(configuration.GetSection("EmailSettings"));
            services.AddTransient<IEmailSender, EmailSender>();
            services.AddScoped(typeof(IAppLogger<>), typeof(LoggerAdaptor<>));
            return services;
        }
    }
}
