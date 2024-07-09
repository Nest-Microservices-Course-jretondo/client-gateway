import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements RpcExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const rpcError = exception.getError();
    if (
      typeof rpcError === 'object' &&
      'status' in rpcError &&
      'message' in rpcError
    ) {
      return response.status(rpcError.status).json({
        status: rpcError.status,
        message: rpcError.message,
      });
    }
    return response.status(500).json({
      status: 500,
      message: 'Internal server error not handled by the service.',
    });
  }
}
