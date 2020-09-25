import messages from "./protogen/helloworld_pb";
import services from "./protogen/helloworld_grpc_pb";
import grpc from "grpc";

const client = new services.GreeterClient(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

function hey(): void {
  var request = new messages.HelloRequest();
  request.setFirstname("John");
  request.setLastname("Doe");

  client.sayHello(request, function (err, response) {
    console.log("Greeting:", response.getMessage());
  });
}

hey();
