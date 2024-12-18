import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const swagger_config = new DocumentBuilder()
    .setTitle('Task managment APIS')
    .setDescription('Rest full apis for task managment app')
    .addServer('http://localhost:5000')
    .setVersion('1.0').build()

const document = (app: INestApplication<any>) => {
    return SwaggerModule.createDocument(app, swagger_config)
}

const createSwaggerDucument = (app: INestApplication<any>) => {
    return SwaggerModule.setup('/api', app, document(app))
}


export { createSwaggerDucument }