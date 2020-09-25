import messages from "./protogen/helloworld_pb";
import services, { IGreeterServer } from "./protogen/helloworld_grpc_pb";
import grpc from "grpc";

function main() {
  const server = new grpc.Server();
  server.addService<IGreeterServer>(services.GreeterService, {
    sayHello: (call, callback) => {
      const reply = new messages.HelloReply();
      const message = `Hello ${call.request.getFirstname()} ${call.request.getLastname()}`;
      reply.setMessage(message);
      callback(null, reply);
    },
  });
  server.bind("0.0.0.0:50051", grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
