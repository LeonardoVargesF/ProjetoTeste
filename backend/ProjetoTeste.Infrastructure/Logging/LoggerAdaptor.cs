using Microsoft.Extensions.Logging;
using ProjetoTeste.Application.Interfaces.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoTeste.Infrastructure.Logging
{
    internal class LoggerAdaptor<T> : IAppLogger<T>
    {
        private readonly ILogger<T> _logger;
        public LoggerAdaptor(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<T>();
        }
        public void LogInformation(string message, params object[] args)
        {
            _logger.LogWarning(message, args);
        }

        public void LogWarning(string message, params object[] args)
        {
            _logger.LogWarning(message, args);
        }
    }
}
