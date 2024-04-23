import { loadPackageDefinition, credentials } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';

const PROTO_PATH = 'src/redis.proto';
const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
};
var packageDefinition = loadSync(PROTO_PATH, options);
const RedisService = loadPackageDefinition(packageDefinition).LRedisService;

export const redisClient = new RedisService(
  'light-app-lredis-1:50051',
  credentials.createInsecure()
);
