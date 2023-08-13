import { AppModule } from '@app';
import { Bootstrap } from '@bootstrap';

const main = async () => {
  (await Bootstrap.of(AppModule)).listen();
};

main();
