import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from './contacts/contacts.module';
import { WhatsappModule } from './whatsapp/whatsapp.module';
import { EmailModule } from './email/email.module';
import { ProjectsModule } from './projects/projects.module';
import { ServersModule } from './servers/servers.module';

@Module({
  imports: [ContactsModule, WhatsappModule, EmailModule, ProjectsModule, ServersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
